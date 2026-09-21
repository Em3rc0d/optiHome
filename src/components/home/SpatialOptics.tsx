"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Orbit, Sparkles } from "lucide-react";
import { useMotionCapability } from "@/lib/motion/capabilities";
import { motionTokens } from "@/lib/motion/tokens";

const THREE_URL = "https://cdn.jsdelivr.net/npm/three@0.186.0/build/three.module.min.js";
const THREE_READY_EVENT = "optihome-three-ready";

type ThreeWindow = Window &
  typeof globalThis & {
    __optiThree?: any;
    __optiThreePromise?: Promise<any>;
  };

function loadThree() {
  const runtime = window as ThreeWindow;
  if (runtime.__optiThree) return Promise.resolve(runtime.__optiThree);
  if (runtime.__optiThreePromise) return runtime.__optiThreePromise;

  runtime.__optiThreePromise = new Promise((resolve, reject) => {
    const onReady = () => {
      window.removeEventListener(THREE_READY_EVENT, onReady);
      if (runtime.__optiThree) resolve(runtime.__optiThree);
      else reject(new Error("El motor visual no quedó disponible."));
    };

    window.addEventListener(THREE_READY_EVENT, onReady, { once: true });

    if (!document.getElementById("optihome-three-runtime")) {
      const script = document.createElement("script");
      script.id = "optihome-three-runtime";
      script.type = "module";
      script.textContent = `import * as THREE from "${THREE_URL}"; window.__optiThree = THREE; window.dispatchEvent(new Event("${THREE_READY_EVENT}"));`;
      script.addEventListener(
        "error",
        () => reject(new Error("No se pudo cargar la experiencia visual.")),
        { once: true }
      );
      document.head.appendChild(script);
    }

    window.setTimeout(() => {
      if (!runtime.__optiThree) reject(new Error("La experiencia visual excedió el tiempo de carga."));
    }, 8000);
  });

  return runtime.__optiThreePromise;
}

function supportsWebGL() {
  const canvas = document.createElement("canvas");
  return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
}

export function SpatialOptics() {
  const hostRef = useRef<HTMLDivElement>(null);
  const capability = useMotionCapability();
  const reduceMotion = useReducedMotion();
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || reduceMotion || capability === "low" || !supportsWebGL()) return;

    let cancelled = false;
    let animationFrame = 0;
    let visible = true;
    let pointerX = 0;
    let pointerY = 0;
    let renderer: any = null;
    let resizeObserver: ResizeObserver | null = null;
    let intersectionObserver: IntersectionObserver | null = null;
    const cleanups: Array<() => void> = [];

    void loadThree()
      .then((THREE) => {
        if (cancelled || !hostRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
        camera.position.set(0, 0.1, 7.2);

        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: capability === "high",
          powerPreference: capability === "high" ? "high-performance" : "low-power",
        });
        renderer.setPixelRatio(
          Math.min(window.devicePixelRatio || 1, capability === "high" ? 1.5 : 1)
        );
        renderer.setClearColor(0x000000, 0);
        if (THREE.SRGBColorSpace) renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.domElement.setAttribute("aria-hidden", "true");
        renderer.domElement.className = "h-full w-full";
        host.appendChild(renderer.domElement);

        const group = new THREE.Group();
        scene.add(group);

        const frameMaterial = new THREE.MeshPhysicalMaterial({
          color: 0x147d91,
          roughness: 0.22,
          metalness: 0.18,
          clearcoat: 1,
          clearcoatRoughness: 0.12,
        });
        const lensMaterial = new THREE.MeshPhysicalMaterial({
          color: 0xbceee0,
          transparent: true,
          opacity: 0.18,
          roughness: 0.05,
          metalness: 0,
          transmission: 0.68,
          side: THREE.DoubleSide,
        });

        const ringGeometry = new THREE.TorusGeometry(1.12, 0.11, 20, 72);
        const lensGeometry = new THREE.CircleGeometry(1.02, 64);
        const bridgeGeometry = new THREE.BoxGeometry(0.75, 0.1, 0.12);
        const templeGeometry = new THREE.BoxGeometry(1.9, 0.08, 0.08);

        const addLens = (x: number) => {
          const ring = new THREE.Mesh(ringGeometry, frameMaterial);
          ring.position.x = x;
          ring.scale.y = 0.68;
          group.add(ring);

          const lens = new THREE.Mesh(lensGeometry, lensMaterial);
          lens.position.set(x, 0, -0.03);
          lens.scale.set(1, 0.68, 1);
          group.add(lens);
        };

        addLens(-1.28);
        addLens(1.28);

        const bridge = new THREE.Mesh(bridgeGeometry, frameMaterial);
        bridge.position.z = 0.02;
        group.add(bridge);

        const leftTemple = new THREE.Mesh(templeGeometry, frameMaterial);
        leftTemple.position.set(-2.25, 0.03, -0.12);
        leftTemple.rotation.y = -0.28;
        leftTemple.rotation.z = -0.02;
        group.add(leftTemple);

        const rightTemple = new THREE.Mesh(templeGeometry, frameMaterial);
        rightTemple.position.set(2.25, 0.03, -0.12);
        rightTemple.rotation.y = 0.28;
        rightTemple.rotation.z = 0.02;
        group.add(rightTemple);

        const particleCount = capability === "high" ? 120 : 54;
        const positions = new Float32Array(particleCount * 3);
        for (let index = 0; index < particleCount; index += 1) {
          positions[index * 3] = (Math.random() - 0.5) * 8;
          positions[index * 3 + 1] = (Math.random() - 0.5) * 5.5;
          positions[index * 3 + 2] = (Math.random() - 0.5) * 4 - 1.5;
        }
        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const particleMaterial = new THREE.PointsMaterial({
          color: 0x75d8bd,
          size: capability === "high" ? 0.035 : 0.025,
          transparent: true,
          opacity: 0.55,
        });
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        scene.add(new THREE.AmbientLight(0xffffff, 1.6));
        const keyLight = new THREE.PointLight(0x75d8bd, 36, 18);
        keyLight.position.set(3.5, 2.8, 4.5);
        scene.add(keyLight);
        const rimLight = new THREE.PointLight(0x46a9d2, 24, 16);
        rimLight.position.set(-4, -1.5, 3);
        scene.add(rimLight);

        const resize = () => {
          const width = host.clientWidth;
          const height = host.clientHeight;
          if (!width || !height) return;
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        };
        resize();
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(host);

        const onPointerMove = (event: PointerEvent) => {
          const rect = host.getBoundingClientRect();
          pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
          pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
        };
        const onPointerLeave = () => {
          pointerX = 0;
          pointerY = 0;
        };
        host.addEventListener("pointermove", onPointerMove);
        host.addEventListener("pointerleave", onPointerLeave);
        cleanups.push(() => host.removeEventListener("pointermove", onPointerMove));
        cleanups.push(() => host.removeEventListener("pointerleave", onPointerLeave));

        intersectionObserver = new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
          },
          { rootMargin: "120px" }
        );
        intersectionObserver.observe(host);

        const startedAt = performance.now();
        const animate = (time: number) => {
          if (cancelled) return;
          if (visible && !document.hidden) {
            const elapsed = (time - startedAt) / 1000;
            group.rotation.y += (pointerX * 0.2 - group.rotation.y) * 0.045;
            group.rotation.x += (-pointerY * 0.12 - group.rotation.x) * 0.045;
            group.rotation.z = Math.sin(elapsed * 0.5) * 0.018;
            group.position.y = Math.sin(elapsed * 0.75) * 0.08;
            particles.rotation.y = elapsed * 0.025;
            particles.rotation.x = Math.sin(elapsed * 0.2) * 0.04;
            renderer.render(scene, camera);
          }
          animationFrame = requestAnimationFrame(animate);
        };
        animationFrame = requestAnimationFrame(animate);
        setEnhanced(true);

        cleanups.push(() => {
          ringGeometry.dispose();
          lensGeometry.dispose();
          bridgeGeometry.dispose();
          templeGeometry.dispose();
          particleGeometry.dispose();
          frameMaterial.dispose();
          lensMaterial.dispose();
          particleMaterial.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        });
      })
      .catch(() => {
        setEnhanced(false);
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(animationFrame);
      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [capability, reduceMotion]);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#07181f_0%,#0d2932_48%,#0b2028_100%)] text-white">
      <span className="sr-only">Spatial optics</span>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_35%,rgba(91,195,165,.16),transparent_34%),radial-gradient(circle_at_20%_70%,rgba(70,169,210,.10),transparent_30%)]" />
      <div className="content-shell relative grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[.82fr_1.18fr] lg:gap-16 lg:py-24">
        <motion.div
          initial={reduceMotion ? false : { y: 18 }}
          whileInView={reduceMotion ? undefined : { y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: motionTokens.duration.slow, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent backdrop-blur">
            <Orbit className="size-4" aria-hidden="true" />
            Explora en detalle
          </div>
          <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            Mira cada montura con más detalle.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/68 sm:text-lg sm:leading-8">
            Compara formas, proporciones y acabados para encontrar una montura que encaje con tu estilo.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {[
              ["Detalle", "Observa formas y proporciones"],
              ["Acabados", "Compara materiales y estilo"],
              ["Tu estilo", "Encuentra la montura que va contigo"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur">
                <p className="text-2xl font-semibold text-white">{value}</p>
                <p className="mt-1 text-xs leading-5 text-white/55">{label}</p>
              </div>
            ))}
          </div>

          <Link
            href="/products"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-ink transition-[transform,background-color] hover:bg-accent-soft motion-safe:active:scale-[0.99]"
          >
            Explorar monturas
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { scale: 0.96 }}
          whileInView={reduceMotion ? undefined : { scale: 1 }}
          viewport={{ once: true, amount: 0.32 }}
          transition={{ duration: motionTokens.duration.slow, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[24rem] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-[0_30px_100px_rgba(0,0,0,.24)] sm:min-h-[30rem] lg:min-h-[36rem]"
        >
          <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />
          {!enhanced && (
            <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
              <div className="relative h-32 w-72 opacity-80 sm:h-40 sm:w-96">
                <div className="absolute left-0 top-1/2 h-24 w-32 -translate-y-1/2 rounded-[46%] border-[10px] border-brand sm:h-28 sm:w-40" />
                <div className="absolute right-0 top-1/2 h-24 w-32 -translate-y-1/2 rounded-[46%] border-[10px] border-brand sm:h-28 sm:w-40" />
                <div className="absolute left-1/2 top-1/2 h-2 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand" />
              </div>
            </div>
          )}
          <div className="pointer-events-none absolute inset-x-5 top-5 flex items-center justify-between gap-3">
            <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70 backdrop-blur">
              {enhanced ? "Vista interactiva" : "Vista del producto"}
            </div>
            <Sparkles className="size-5 text-accent" aria-hidden="true" />
          </div>
          <div className="pointer-events-none absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur">
            <p className="text-sm font-semibold text-white">Explora una vista interactiva de la montura.</p>
            <p className="mt-1 text-xs leading-5 text-white/55">En móvil, la experiencia se adapta automáticamente para mantenerse fluida.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
