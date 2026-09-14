"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  ImagePlus,
  Minus,
  Plus,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { MultiAngleFrameOverlay } from "@/components/try-on/MultiAngleFrameOverlay";
import {
  estimateYaw,
  normalizeYaw,
  type FacePoint,
} from "@/lib/try-on/face-pose";
import { smoothYaw } from "@/lib/try-on/smoothing";
import type { Frame } from "@/types/frame";

type DetectedFace = { keypoints?: FacePoint[]; landmarks?: FacePoint[] };
type FaceDetector = {
  estimateFaces: (
    input: CanvasImageSource,
    config?: Record<string, unknown>
  ) => Promise<DetectedFace[]>;
  initialize?: () => Promise<void>;
  reset?: () => void;
};
type TfRuntime = {
  setBackend: (name: string) => Promise<boolean> | boolean;
  ready: () => Promise<void>;
};
type FaceLandmarksRuntime = {
  SupportedModels: { MediaPipeFaceMesh: unknown };
  createDetector: (
    model: unknown,
    config: Record<string, unknown>
  ) => Promise<FaceDetector>;
};
type RuntimeWindow = Window &
  typeof globalThis & {
    tf?: TfRuntime;
    faceLandmarksDetection?: FaceLandmarksRuntime;
  };
type FaceData = {
  x: number;
  y: number;
  width: number;
  rotation: number;
  yaw: number;
};
type FitMode = "cover" | "contain";

let detectorCache: FaceDetector | null = null;
let detectorPromise: Promise<FaceDetector> | null = null;

const TF_URL = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js";
const FACE_URL =
  "https://cdn.jsdelivr.net/npm/@tensorflow-models/face-landmarks-detection@1.0.6/dist/face-landmarks-detection.min.js";
const TRACKING_MAX_WIDTH = 480;
const TRACKING_CONSTRAINED_WIDTH = 384;
const STALE_TRACKING_MS = 420;
const MAX_FRAME_ROTATION_DEG = 5;
const ROTATION_DEAD_ZONE_DEG = 1.1;

function loadScript(src: string, ready: () => boolean) {
  return new Promise<void>((resolve, reject) => {
    if (ready()) {
      resolve();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) {
      const onLoad = () => resolve();
      const onError = () => reject(new Error(`No se pudo cargar ${src}`));
      existing.addEventListener("load", onLoad, { once: true });
      existing.addEventListener("error", onError, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener(
      "error",
      () => reject(new Error(`No se pudo cargar ${src}`)),
      { once: true }
    );
    document.body.appendChild(script);
  });
}

async function loadFaceDetector() {
  if (detectorCache) return detectorCache;
  if (detectorPromise) return detectorPromise;

  detectorPromise = (async () => {
    const runtime = window as RuntimeWindow;

    await loadScript(TF_URL, () => Boolean(runtime.tf));
    await loadScript(FACE_URL, () => Boolean(runtime.faceLandmarksDetection));

    if (!runtime.tf || !runtime.faceLandmarksDetection) {
      throw new Error("El motor de seguimiento no quedó disponible.");
    }

    await runtime.tf.setBackend("webgl");
    await runtime.tf.ready();

    const nextDetector = await runtime.faceLandmarksDetection.createDetector(
      runtime.faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
      {
        runtime: "tfjs",
        refineLandmarks: false,
        maxFaces: 1,
      }
    );

    if (nextDetector.initialize) await nextDetector.initialize();
    detectorCache = nextDetector;
    return nextDetector;
  })();

  try {
    return await detectorPromise;
  } catch (error) {
    detectorPromise = null;
    throw error;
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function normalizeEyeLineRotation(angle: number) {
  const normalized = ((((angle + 90) % 180) + 180) % 180) - 90;
  if (Math.abs(normalized) < ROTATION_DEAD_ZONE_DEG) return 0;
  return clamp(normalized, -MAX_FRAME_ROTATION_DEG, MAX_FRAME_ROTATION_DEG);
}

function faceGeometry({
  points,
  sourceWidth,
  sourceHeight,
  stageWidth,
  stageHeight,
  fit,
}: {
  points: FacePoint[];
  sourceWidth: number;
  sourceHeight: number;
  stageWidth: number;
  stageHeight: number;
  fit: FitMode;
}): FaceData | null {
  if (!sourceWidth || !sourceHeight || !stageWidth || !stageHeight) return null;

  const validPoint = (point?: FacePoint) =>
    Boolean(point && Number.isFinite(point.x) && Number.isFinite(point.y));
  const midpoint = (a?: FacePoint, b?: FacePoint): FacePoint | null => {
    if (!validPoint(a) || !validPoint(b) || !a || !b) return null;
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  };

  const rightEye = midpoint(points[33], points[133]);
  const leftEye = midpoint(points[362], points[263]);
  if (!leftEye || !rightEye) return null;

  const renderScale =
    fit === "cover"
      ? Math.max(stageWidth / sourceWidth, stageHeight / sourceHeight)
      : Math.min(stageWidth / sourceWidth, stageHeight / sourceHeight);
  const renderedWidth = sourceWidth * renderScale;
  const renderedHeight = sourceHeight * renderScale;
  const offsetX = (stageWidth - renderedWidth) / 2;
  const offsetY = (stageHeight - renderedHeight) / 2;

  const midX = (leftEye.x + rightEye.x) / 2;
  const midY = (leftEye.y + rightEye.y) / 2;
  const eyeDistance = Math.hypot(
    rightEye.x - leftEye.x,
    rightEye.y - leftEye.y
  );
  const displayedEyeDistance = eyeDistance * renderScale;
  const eyeLineAngle =
    Math.atan2(leftEye.y - rightEye.y, leftEye.x - rightEye.x) *
    (180 / Math.PI);

  return {
    x: offsetX + midX * renderScale,
    y: offsetY + midY * renderScale,
    width: clamp(displayedEyeDistance * 2.2, 116, stageWidth * 0.82),
    rotation: normalizeEyeLineRotation(eyeLineAngle),
    yaw: normalizeYaw(estimateYaw(points)),
  };
}

function adaptiveSmooth(previous: FaceData | null, next: FaceData): FaceData {
  if (!previous) return next;

  const distance = Math.hypot(next.x - previous.x, next.y - previous.y);
  const movementRatio = distance / Math.max(next.width, 1);
  const scaleRatio = Math.abs(next.width - previous.width) / Math.max(next.width, 1);
  const rotationDelta = Math.abs(next.rotation - previous.rotation);

  const positionWeight =
    movementRatio > 0.16
      ? 0.97
      : movementRatio > 0.07
        ? 0.82
        : movementRatio > 0.03
          ? 0.64
          : 0.46;
  const scaleWeight = scaleRatio > 0.1 ? 0.82 : scaleRatio > 0.04 ? 0.62 : 0.42;
  const rotationWeight = rotationDelta > 2.2 ? 0.72 : 0.42;

  return {
    x: previous.x + (next.x - previous.x) * positionWeight,
    y: previous.y + (next.y - previous.y) * positionWeight,
    width: previous.width + (next.width - previous.width) * scaleWeight,
    rotation: normalizeEyeLineRotation(
      previous.rotation + (next.rotation - previous.rotation) * rotationWeight
    ),
    yaw: normalizeYaw(smoothYaw(previous.yaw, next.yaw)),
  };
}

function trackingWidth() {
  const constrained =
    (navigator.hardwareConcurrency ?? 8) <= 4 ||
    window.matchMedia("(pointer: coarse)").matches;
  return constrained ? TRACKING_CONSTRAINED_WIDTH : TRACKING_MAX_WIDTH;
}

export function VirtualTryOnFast({
  open,
  onOpenChange,
  initialFrame,
  frames,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialFrame: Frame;
  frames: Frame[];
}) {
  const initialIndex = Math.max(
    0,
    frames.findIndex((frame) => frame.id === initialFrame.id)
  );
  const [frameIndex, setFrameIndex] = useState(initialIndex);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [detector, setDetector] = useState<FaceDetector | null>(null);
  const [faceData, setFaceData] = useState<FaceData | null>(null);
  const [manualScale, setManualScale] = useState(1);
  const [status, setStatus] = useState(
    "Activa la cámara o sube una foto para comenzar."
  );
  const [busy, setBusy] = useState(false);

  const currentFrame = frames[frameIndex] ?? initialFrame;
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cameraFrameRef = useRef<HTMLCanvasElement | null>(null);
  const mountedRef = useRef(true);
  const cameraRequestRef = useRef(0);
  const latestFaceRef = useRef<FaceData | null>(null);
  const lastFaceSeenAtRef = useRef(0);
  const statusRef = useRef(status);

  const canPrevious = frameIndex > 0;
  const canNext = frameIndex < frames.length - 1;

  const setTrackingStatus = useCallback((nextStatus: string) => {
    if (statusRef.current === nextStatus) return;
    statusRef.current = nextStatus;
    setStatus(nextStatus);
  }, []);

  const stopCamera = () => {
    cameraRequestRef.current += 1;
    setStream((activeStream) => {
      activeStream?.getTracks().forEach((track) => track.stop());
      return null;
    });
    setDetector(null);
    setFaceData(null);
    latestFaceRef.current = null;
    lastFaceSeenAtRef.current = 0;
    cameraFrameRef.current = null;
  };

  const closeTryOn = () => {
    stopCamera();
    setBusy(false);
    onOpenChange(false);
  };

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      cameraRequestRef.current += 1;
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && stream) videoRef.current.srcObject = stream;
    return () => stream?.getTracks().forEach((track) => track.stop());
  }, [stream]);

  useEffect(() => {
    if (!stream || !detector || photo) return;

    let animationFrame = 0;
    let cancelled = false;
    let detecting = false;

    const detect = async () => {
      const video = videoRef.current;
      const stage = stageRef.current;
      if (
        cancelled ||
        detecting ||
        !video ||
        !stage ||
        video.readyState < 2 ||
        !video.videoWidth ||
        !video.videoHeight
      ) {
        if (!cancelled) animationFrame = requestAnimationFrame(detect);
        return;
      }

      detecting = true;
      try {
        const maxWidth = trackingWidth();
        const scale = Math.min(1, maxWidth / video.videoWidth);
        const nextWidth = Math.max(1, Math.round(video.videoWidth * scale));
        const nextHeight = Math.max(1, Math.round(video.videoHeight * scale));
        const cameraFrame = cameraFrameRef.current ?? document.createElement("canvas");
        cameraFrameRef.current = cameraFrame;

        if (cameraFrame.width !== nextWidth) cameraFrame.width = nextWidth;
        if (cameraFrame.height !== nextHeight) cameraFrame.height = nextHeight;

        const cameraContext = cameraFrame.getContext("2d", {
          alpha: false,
          desynchronized: true,
        });
        if (!cameraContext) throw new Error("No se pudo preparar el frame de cámara.");

        cameraContext.drawImage(video, 0, 0, nextWidth, nextHeight);
        const faces = await detector.estimateFaces(cameraFrame, { flipHorizontal: true });
        const points = faces[0]?.keypoints ?? faces[0]?.landmarks ?? [];
        const nextFace = faceGeometry({
          points,
          sourceWidth: nextWidth,
          sourceHeight: nextHeight,
          stageWidth: stage.clientWidth,
          stageHeight: stage.clientHeight,
          fit: "cover",
        });

        if (faces[0] && !nextFace) detector.reset?.();

        if (nextFace) {
          const responsiveFace = adaptiveSmooth(latestFaceRef.current, nextFace);
          latestFaceRef.current = responsiveFace;
          lastFaceSeenAtRef.current = performance.now();
          setFaceData(responsiveFace);
          setTrackingStatus("Montura ajustada. Muévete con naturalidad para verla desde distintos ángulos.");
        } else {
          const lastSeen = lastFaceSeenAtRef.current;
          const stale = !lastSeen || performance.now() - lastSeen > STALE_TRACKING_MS;
          if (stale) {
            latestFaceRef.current = null;
            setFaceData(null);
            setTrackingStatus("Buscando tu rostro… mira de frente y mejora la iluminación.");
          }
        }
      } catch {
        setTrackingStatus("El seguimiento se interrumpió. Puedes reintentar o usar una foto.");
      } finally {
        detecting = false;
      }

      if (!cancelled) animationFrame = requestAnimationFrame(detect);
    };

    animationFrame = requestAnimationFrame(detect);
    return () => {
      cancelled = true;
      cancelAnimationFrame(animationFrame);
    };
  }, [stream, detector, photo, setTrackingStatus]);

  useEffect(() => {
    if (!photo) return;

    let cancelled = false;
    const detectPhoto = async () => {
      const image = photoRef.current;
      const stage = stageRef.current;
      if (!image || !stage || !image.complete || !image.naturalWidth) return;

      setBusy(true);
      setTrackingStatus("Ajustando la montura a tu foto…");
      try {
        const nextDetector = await loadFaceDetector();
        if (cancelled || !mountedRef.current) return;
        const faces = await nextDetector.estimateFaces(image, { flipHorizontal: false });
        const points = faces[0]?.keypoints ?? faces[0]?.landmarks ?? [];
        const nextFace = faceGeometry({
          points,
          sourceWidth: image.naturalWidth,
          sourceHeight: image.naturalHeight,
          stageWidth: stage.clientWidth,
          stageHeight: stage.clientHeight,
          fit: "contain",
        });

        if (nextFace) {
          latestFaceRef.current = nextFace;
          setFaceData(nextFace);
          setTrackingStatus("Foto ajustada. Puedes afinar el tamaño si lo necesitas.");
        } else {
          latestFaceRef.current = null;
          setFaceData(null);
          setTrackingStatus("No detectamos el rostro con claridad; usa el ajuste manual.");
        }
      } catch {
        latestFaceRef.current = null;
        setFaceData(null);
        setTrackingStatus("No pudimos detectar el rostro en la foto; usa el ajuste manual.");
      } finally {
        if (!cancelled && mountedRef.current) setBusy(false);
      }
    };

    const image = photoRef.current;
    if (image?.complete) void detectPhoto();
    else image?.addEventListener("load", detectPhoto, { once: true });

    return () => {
      cancelled = true;
      image?.removeEventListener("load", detectPhoto);
    };
  }, [photo, setTrackingStatus]);

  const activateCamera = async () => {
    if (!window.isSecureContext && window.location.hostname !== "localhost") {
      setTrackingStatus("La cámara requiere HTTPS. Puedes usar una foto como alternativa.");
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      setTrackingStatus("Este navegador no ofrece acceso a cámara. Puedes usar una foto.");
      return;
    }

    stopCamera();
    const requestId = cameraRequestRef.current + 1;
    cameraRequestRef.current = requestId;
    setBusy(true);
    setPhoto(null);
    setTrackingStatus("Solicitando permiso de cámara…");

    let nextStream: MediaStream | null = null;
    try {
      nextStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 960, max: 1280 },
          height: { ideal: 540, max: 720 },
          frameRate: { ideal: 30, max: 30 },
        },
        audio: false,
      });

      if (!mountedRef.current || requestId !== cameraRequestRef.current) {
        nextStream.getTracks().forEach((track) => track.stop());
        return;
      }

      setStream(nextStream);
      setTrackingStatus("Preparando la prueba virtual…");
      const nextDetector = await loadFaceDetector();

      if (!mountedRef.current || requestId !== cameraRequestRef.current) {
        nextStream.getTracks().forEach((track) => track.stop());
        return;
      }

      setDetector(nextDetector);
      setTrackingStatus("Buscando tu rostro…");
    } catch {
      nextStream?.getTracks().forEach((track) => track.stop());
      if (mountedRef.current && requestId === cameraRequestRef.current) {
        setStream(null);
        setDetector(null);
        setFaceData(null);
        setTrackingStatus("No se pudo activar la cámara. Puedes reintentar o usar una foto.");
      }
    } finally {
      if (mountedRef.current && requestId === cameraRequestRef.current) setBusy(false);
    }
  };

  const handlePhoto = (file?: File) => {
    if (!file) return;
    stopCamera();
    setBusy(false);
    setFaceData(null);
    latestFaceRef.current = null;

    const reader = new FileReader();
    reader.onload = () => {
      if (!mountedRef.current) return;
      setPhoto(typeof reader.result === "string" ? reader.result : null);
      setTrackingStatus("Preparando tu foto…");
    };
    reader.readAsDataURL(file);
  };

  const overlayStyle = faceData
    ? {
        left: `${faceData.x}px`,
        top: `${faceData.y}px`,
        width: `${faceData.width * manualScale}px`,
        transform: `translate(-50%, -50%) rotate(${faceData.rotation}deg)`,
        willChange: "left, top, width, transform",
      }
    : {
        left: "50%",
        top: "48%",
        width: `clamp(160px, ${58 * manualScale}vw, ${320 * manualScale}px)`,
        transform: "translate(-50%, -50%)",
        willChange: "left, top, width, transform",
      };

  const previousFrame = () => setFrameIndex((index) => Math.max(0, index - 1));
  const nextFrame = () =>
    setFrameIndex((index) => Math.min(frames.length - 1, index + 1));

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) closeTryOn();
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="h-[calc(100svh-0.75rem)] w-[calc(100vw-0.75rem)] max-w-none overflow-hidden rounded-2xl border-white/10 bg-black p-0 text-white sm:h-[calc(100svh-1rem)] sm:w-[calc(100vw-1rem)] sm:max-w-none sm:rounded-3xl"
      >
        <DialogTitle className="sr-only">Prueba virtual de monturas</DialogTitle>
        <DialogDescription className="sr-only">
          Herramienta visual para orientar estilo y proporción. No realiza diagnóstico visual.
        </DialogDescription>

        <div ref={stageRef} className="relative h-full w-full overflow-hidden bg-black">
          <div className="absolute inset-0 flex items-center justify-center">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                ref={photoRef}
                src={photo}
                alt="Foto seleccionada para la prueba virtual"
                className="h-full w-full object-contain"
              />
            ) : stream ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="h-full w-full scale-x-[-1] object-cover"
              />
            ) : (
              <div className="max-w-lg px-6 text-center">
                <Camera className="mx-auto size-10 text-white/70" aria-hidden="true" />
                <h3 className="mt-5 text-2xl font-semibold text-white">
                  Prueba una montura cuando tú decidas.
                </h3>
                <p className="mt-3 leading-7 text-white/70">
                  Activa la cámara y mueve tu rostro con naturalidad para comparar cómo se ve la montura.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <button
                    type="button"
                    disabled={busy}
                    onClick={activateCamera}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-black transition-[background-color,transform] duration-200 hover:bg-white/90 disabled:cursor-wait disabled:opacity-55 motion-safe:active:scale-[0.98]"
                  >
                    <Camera className="size-5" aria-hidden="true" />
                    {busy ? "Preparando…" : "Activar cámara"}
                  </button>
                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 px-5 py-3 font-semibold transition-[background-color,transform] duration-200 hover:bg-white/10 motion-safe:active:scale-[0.98]"
                  >
                    <ImagePlus className="size-5" aria-hidden="true" />
                    Subir foto
                  </button>
                </div>
              </div>
            )}
          </div>

          {(stream || photo) && (
            <div className="pointer-events-none absolute inset-0 z-20">
              <MultiAngleFrameOverlay
                key={currentFrame.id}
                frame={currentFrame}
                yaw={faceData?.yaw ?? 0}
                style={overlayStyle}
              />
            </div>
          )}

          <div className="absolute inset-x-3 top-3 z-30 flex items-start justify-between gap-3 sm:inset-x-4 sm:top-4">
            <div className="max-w-[calc(100%-3.5rem)] rounded-2xl border border-white/10 bg-black/60 px-4 py-3 backdrop-blur">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-semibold text-white">{currentFrame.name}</p>
                {stream && (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/80">
                    <Sparkles className="size-3" aria-hidden="true" /> en vivo
                  </span>
                )}
              </div>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/70" aria-live="polite">
                {status}
              </p>
            </div>
            <button
              type="button"
              onClick={closeTryOn}
              className="grid size-12 shrink-0 place-items-center rounded-xl border border-white/15 bg-black/60 text-white backdrop-blur transition-colors hover:bg-white/10"
              aria-label="Cerrar prueba virtual"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div className="safe-bottom absolute inset-x-3 z-30 sm:inset-x-4">
            <div className="mx-auto max-h-[42svh] max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-black/65 p-3 backdrop-blur sm:p-4">
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={previousFrame}
                  disabled={!canPrevious}
                  className="grid size-12 shrink-0 place-items-center rounded-xl border border-white/15 text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Montura anterior"
                >
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </button>

                <div className="min-w-0 text-center">
                  <p className="truncate text-sm font-semibold text-white">{currentFrame.name}</p>
                  <p className="mt-0.5 text-xs text-white/60">
                    {frameIndex + 1} de {frames.length} · una montura a la vez
                  </p>
                </div>

                <button
                  type="button"
                  onClick={nextFrame}
                  disabled={!canNext}
                  className="grid size-12 shrink-0 place-items-center rounded-xl border border-white/15 text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Siguiente montura"
                >
                  <ChevronRight className="size-5" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3">
                <div className="flex items-center gap-2" aria-label="Ajuste de tamaño de montura">
                  <button
                    type="button"
                    onClick={() => setManualScale((value) => Math.max(0.72, value - 0.05))}
                    className="grid size-11 place-items-center rounded-xl border border-white/15 text-white hover:bg-white/10"
                    aria-label="Reducir montura"
                  >
                    <Minus className="size-4" aria-hidden="true" />
                  </button>
                  <span className="min-w-12 text-center text-xs font-semibold text-white">
                    {Math.round(manualScale * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setManualScale((value) => Math.min(1.35, value + 0.05))}
                    className="grid size-11 place-items-center rounded-xl border border-white/15 text-white hover:bg-white/10"
                    aria-label="Aumentar montura"
                  >
                    <Plus className="size-4" aria-hidden="true" />
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={activateCamera}
                    disabled={busy}
                    className="min-h-11 rounded-xl border border-white/15 px-3 text-xs font-semibold text-white hover:bg-white/10 disabled:opacity-50"
                  >
                    Cámara
                  </button>
                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    className="min-h-11 rounded-xl border border-white/15 px-3 text-xs font-semibold text-white hover:bg-white/10"
                  >
                    Foto
                  </button>
                </div>
              </div>

              <div className="mt-3 hidden items-start gap-2 text-[11px] leading-5 text-white/60 sm:flex">
                <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <p>
                  Procesamiento durante esta experiencia. La prueba orienta estilo y proporción; no sustituye una evaluación visual.
                </p>
              </div>
            </div>
          </div>

          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(event) => handlePhoto(event.target.files?.[0])}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
