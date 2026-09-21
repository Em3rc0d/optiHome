import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
const read = (file) => readFileSync(file, "utf8");
test("Internal try-on implementation and datasets are preserved byte for byte", () => {
  const baseline = "8bf33df537248f6ebdcaaa76db8575e91e9222d9";
  for (const folder of ["src/components/try-on", "src/lib/try-on"])
    for (const name of readdirSync(folder)) {
      const file = path.join(folder, name);
      assert.deepEqual(
        readFileSync(file),
        execFileSync("git", ["show", `${baseline}:${file}`]),
      );
    }
  for (const file of ["src/content/frames.ts", "src/types/frame.ts"])
    assert.deepEqual(
      readFileSync(file),
      execFileSync("git", ["show", `${baseline}:${file}`]),
    );
});
test("Public import graph excludes experimental and motion engines", () => {
  const visited = new Set();
  function visit(file) {
    if (visited.has(file)) return;
    visited.add(file);
    const source = read(file);
    assert.doesNotMatch(
      source,
      /from\s*["'](?:framer-motion|@tensorflow|@mediapipe|three)|SpatialOptics|VirtualTryOn|generated-angle-assets|useSearchParams|searchParams/,
    );
    for (const match of source.matchAll(/from\s*["'](@\/[^"']+)["']/g)) {
      const base = match[1].replace("@/", "src/");
      for (const ext of [".ts", ".tsx"])
        try {
          readFileSync(base + ext);
          visit(base + ext);
          break;
        } catch (error) {
          if (error.code !== "ENOENT") throw error;
        }
    }
  }
  for (const file of [
    "src/app/page.tsx",
    "src/app/products/page.tsx",
    "src/app/privacy/page.tsx",
    "src/app/layout.tsx",
    "src/app/not-found.tsx",
  ])
    visit(file);
  assert.ok(visited.size > 8);
});
test("Commercial references cannot be mistaken for confirmed stock or material", () => {
  const source = read("src/content/catalog.ts");
  assert.equal((source.match(/authority: "REFERENCE"/g) || []).length, 9);
  assert.doesNotMatch(source, /\bprice:|\bstock:|\bmaterial:/);
  assert.match(source, /Imágenes referenciales/);
});
test("WhatsApp number and appointment confirmation semantics stay intact", () => {
  assert.match(read("src/content/site.ts"), /51933075200/);
  assert.match(
    read("src/components/home/CommercialHome.tsx"),
    /La cita queda confirmada cuando acordamos/,
  );
  assert.match(
    read("src/components/commerce/WhatsappLink.tsx"),
    /buildWhatsappUrl\(message\)/,
  );
});
