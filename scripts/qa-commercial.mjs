import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { spawn } from "node:child_process";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
import { gzipSync } from "node:zlib";
const root = process.cwd();
const output = path.resolve(process.env.QA_OUTPUT || "qa-results");
const port = process.env.QA_PORT || "3310";
const base = `http://127.0.0.1:${port}`;
await mkdir(output, { recursive: true });
const server = spawn(
  process.execPath,
  [
    path.join(root, "node_modules/next/dist/bin/next"),
    "start",
    "-H",
    "127.0.0.1",
    "-p",
    port,
  ],
  { cwd: root, stdio: ["ignore", "pipe", "pipe"] },
);
let serverLog = "";
server.stdout.on("data", (d) => (serverLog += d));
server.stderr.on("data", (d) => (serverLog += d));
const report = {
  routes: [],
  accessibility: [],
  interactions: [],
  performance: [],
  errors: [],
  assets: [],
  links: [],
  bundle: {},
};
let browser;
try {
  let ready = false;
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(base, { signal: AbortSignal.timeout(1000) })).ok) {
        ready = true;
        break;
      }
    } catch {}
    await new Promise((r) => setTimeout(r, 300));
  }
  assert.ok(ready, "Server starts");
  const executable = process.env.QA_CHROMIUM;
  browser = await chromium.launch(
    executable
      ? {
          executablePath: executable,
          args: [
            "--no-sandbox",
            "--no-zygote",
            "--single-process",
            "--in-process-gpu",
            "--use-gl=angle",
            "--use-angle=swiftshader",
            "--enable-unsafe-swiftshader",
          ],
        }
      : { headless: true },
  );
  const context = await browser.newContext();
  const page = await context.newPage();
  page.on("pageerror", (error) => report.errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error" && !message.text().includes("404"))
      report.errors.push(message.text());
  });
  await page.addInitScript(() => {
    window.__qaMetrics = { cls: 0, lcp: 0 };
    new PerformanceObserver((list) => {
      for (const e of list.getEntries())
        if (!e.hadRecentInput) window.__qaMetrics.cls += e.value;
    }).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) window.__qaMetrics.lcp = e.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });
  });
  for (const width of [360, 390, 430, 1440]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    for (const route of ["/", "/products", "/privacy", "/missing"]) {
      console.log("QA", width, route);
      const response = await page.goto(base + route, {
        waitUntil: "networkidle",
      });
      assert.equal(response.status(), route === "/missing" ? 404 : 200);
      await page.evaluate(() => document.fonts.ready);
      const before = await page.evaluate(() => ({ ...window.__qaMetrics }));
      report.performance.push({ width, route, ...before });
      await page.screenshot({
        path: path.join(
          output,
          `${route === "/" ? "home" : route.slice(1)}-${width}-viewport.png`,
        ),
      });
      const height = await page.evaluate(() => document.body.scrollHeight);
      for (let y = 0; y < height; y += 700) {
        await page.evaluate((y) => window.scrollTo(0, y), y);
        await page.waitForTimeout(60);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForLoadState("networkidle");
      const result = await page.evaluate(() => ({
        h1: document.querySelectorAll("h1").length,
        overflow: document.documentElement.scrollWidth > innerWidth,
        broken: [...document.images]
          .filter((i) => !i.complete || i.naturalWidth === 0)
          .map((i) => i.getAttribute("src")),
        canvas: document.querySelectorAll("canvas,video,input[type=file]")
          .length,
        text: document.body.innerText,
        resources: performance.getEntriesByType("resource").map((r) => r.name),
      }));
      assert.equal(result.h1, 1, `${route}: one H1`);
      assert.equal(result.overflow, false, `${route}: no overflow at ${width}`);
      assert.deepEqual(result.broken, [], `${route}: no broken images`);
      assert.equal(result.canvas, 0, "No public capture or canvas");
      assert.doesNotMatch(
        result.text,
        /try.?on|virtual|tracking|cámara|three\.js|spatial|showroom|GPU|360°|placeholder|lorem ipsum/i,
      );
      assert.ok(
        !result.resources.some((r) =>
          /tensorflow|mediapipe|three\.module|jsdelivr/.test(r),
        ),
        "No heavy external engines",
      );
      report.routes.push({
        width,
        route,
        status: response.status(),
        h1: result.h1,
        overflow: result.overflow,
        broken: result.broken.length,
      });
      await page.screenshot({
        path: path.join(
          output,
          `${route === "/" ? "home" : route.slice(1)}-${width}.png`,
        ),
        fullPage: true,
      });
      if (width === 390 || width === 1440) {
        const axe = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        report.accessibility.push({ width, route, violations: axe.violations });
        assert.deepEqual(axe.violations, [], `${route}: axe AA`);
      }
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base, { waitUntil: "networkidle" });
  const menu = page.getByRole("button", { name: "Abrir menú" });
  await menu.click();
  assert.equal(
    await page
      .getByRole("navigation", { name: "Navegación móvil" })
      .isVisible(),
    true,
  );
  await page.keyboard.press("Escape");
  assert.equal(await menu.getAttribute("aria-expanded"), "false");
  assert.equal(await menu.evaluate((e) => e === document.activeElement), true);
  await menu.click();
  await page
    .getByRole("navigation", { name: "Navegación móvil" })
    .getByRole("link", { name: "Monturas", exact: true })
    .click();
  await page.waitForURL("**/products");
  assert.equal(
    await page
      .getByRole("button", { name: "Abrir menú" })
      .getAttribute("aria-expanded"),
    "false",
  );
  report.interactions.push("mobile menu, Escape, focus return, navigation");
  await page.getByRole("button", { name: "De sol", exact: true }).click();
  assert.equal(await page.locator(".frame-card").count(), 3);
  await page.getByLabel("Color", { exact: true }).selectOption("Carey");
  assert.equal(await page.locator(".frame-card").count(), 0);
  await page
    .getByRole("button", { name: "Ver todos los estilos", exact: true })
    .click();
  assert.equal(await page.locator(".frame-card").count(), 8);
  report.interactions.push("category + color + empty state + reset");
  const wa = await page
    .locator('a[href^="https://wa.me/"]')
    .evaluateAll((links) =>
      links.map((a) => ({ href: a.href, rel: a.rel, target: a.target })),
    );
  for (const link of wa) {
    const url = new URL(link.href);
    assert.equal(url.pathname, "/51992206266");
    assert.ok(url.searchParams.get("text").length > 10);
    assert.ok(link.rel.includes("noopener"));
    assert.equal(link.target, "_blank");
  }
  assert.equal(
    wa.filter((x) => decodeURIComponent(x.href).includes("Urban Acetate"))
      .length,
    2,
  );
  report.interactions.push(
    `${wa.length} WhatsApp destinations + contextual frame message (no message sent)`,
  );
  await page.goto(base);
  await page.locator("summary").first().focus();
  await page.keyboard.press("Enter");
  assert.equal(await page.locator("details").first().getAttribute("open"), "");
  report.interactions.push("FAQ keyboard/native disclosure");
  await page.keyboard.press("Control+Home");
  await page.keyboard.press("Tab"); // Focus checks also covered by axe and menu flow.
  for (const suffix of [
    "/?tryon=1",
    "/?tryOn=true",
    "/products?tryon=1",
    "/products?tryOn=true",
    "/products?camera=true",
    "/try-on",
    "/virtual-try-on",
    "/prueba-virtual",
  ]) {
    const response = await page.goto(base + suffix);
    assert.equal(response.status(), suffix.includes("?") ? 200 : 404);
    assert.equal(
      await page.locator("video,canvas,input[type=file]").count(),
      0,
    );
    assert.doesNotMatch(
      await page.locator("body").innerText(),
      /virtual|try.?on|cámara|tracking/i,
    );
  }
  report.interactions.push(
    "public paths and query parameters cannot activate try-on",
  );
  for (const [route, target] of [
    ["/contact", "/#solicitar-evaluacion"],
    ["/finalCTA", "/#solicitar-evaluacion"],
    ["/services", "/#proceso"],
    ["/testimonials", "/"],
    ["/us", "/"],
  ]) {
    await page.goto(base + route);
    assert.equal(
      new URL(page.url()).pathname + new URL(page.url()).hash,
      target,
    );
    report.links.push({ route, target, pass: true });
  }
  const hrefs = new Set();
  for (const route of ["/", "/products", "/privacy"]) {
    await page.goto(base + route);
    for (const href of await page
      .locator("a[href]")
      .evaluateAll((a) => a.map((e) => e.getAttribute("href"))))
      if (href.startsWith("/") || href.startsWith("#"))
        hrefs.add(href.startsWith("#") ? route + href : href);
  }
  for (const href of hrefs) {
    const url = new URL(href, base);
    await page.goto(url.href);
    assert.ok((await page.locator("h1").innerText()).length);
    if (url.hash)
      assert.equal(
        await page.locator(`[id="${url.hash.slice(1)}"]`).count(),
        1,
      );
    report.links.push({ href, pass: true });
  }
  for (const route of ["/", "/products", "/privacy"]) {
    await page.goto(base + route);
    assert.equal(
      await page.locator("link[rel=canonical]").getAttribute("href"),
      "https://optihome-v1.vercel.app" + (route === "/" ? "" : route),
    );
    assert.ok(
      await page.locator("meta[name=description]").getAttribute("content"),
    );
  }
  for (const route of [
    "/robots.txt",
    "/sitemap.xml",
    "/icon.svg",
    "/opengraph-image",
  ]) {
    const r = await fetch(base + route);
    assert.equal(r.status, 200);
    report.assets.push({
      route,
      status: r.status,
      type: r.headers.get("content-type"),
    });
  }
  const html = await readFile(".next/server/app/index.html", "utf8");
  const files = [
    ...new Set([...html.matchAll(/src="([^" ]+\.js)"/g)].map((m) => m[1])),
  ];
  let total = 0,
    gzip = 0;
  for (const file of files) {
    const bytes = await readFile(".next" + file.replace("/_next", ""));
    total += bytes.length;
    gzip += gzipSync(bytes).length;
  }
  report.bundle = { route: "/", files, total, gzip };
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(base);
  assert.equal(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
    "auto",
  );
  report.interactions.push("reduced motion");
  assert.deepEqual(report.errors, [], "Browser console and page errors");
  report.result = "PASS";
} catch (error) {
  report.result = "FAIL";
  report.failure = error.stack;
  throw error;
} finally {
  await writeFile(
    path.join(output, "report.json"),
    JSON.stringify(report, null, 2),
  );
  await writeFile(path.join(output, "server.log"), serverLog);
  if (browser) await browser.close();
  server.kill();
  console.log("QA:", report.result, "Evidence:", output);
}
