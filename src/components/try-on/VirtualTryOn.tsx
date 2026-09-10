"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, ImagePlus, Minus, Plus, ShieldCheck, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { Frame } from "@/types/frame";

type FacePoint = { x: number; y: number; name?: string };
type DetectedFace = { keypoints?: FacePoint[]; landmarks?: FacePoint[] };
type FaceDetector = {
  estimateFaces: (input: CanvasImageSource, config?: Record<string, unknown>) => Promise<DetectedFace[]>;
  initialize?: () => Promise<void>;
};
type TfRuntime = {
  setBackend: (name: string) => Promise<boolean> | boolean;
  ready: () => Promise<void>;
};
type FaceLandmarksRuntime = {
  SupportedModels: { MediaPipeFaceMesh: unknown };
  createDetector: (model: unknown, config: Record<string, unknown>) => Promise<FaceDetector>;
};
type RuntimeWindow = Window &
  typeof globalThis & {
    tf?: TfRuntime;
    faceLandmarksDetection?: FaceLandmarksRuntime;
  };
type FaceData = { x: number; y: number; scale: number; rotation: number };

let detectorCache: FaceDetector | null = null;
let detectorPromise: Promise<FaceDetector> | null = null;

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") resolve();
      else existing.addEventListener("load", () => resolve(), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      resolve();
    });
    script.addEventListener("error", () => reject(new Error(`No se pudo cargar ${src}`)));
    document.body.appendChild(script);
  });
}

async function loadFaceDetector() {
  if (detectorCache) return detectorCache;
  if (detectorPromise) return detectorPromise;

  detectorPromise = (async () => {
    await loadScript("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js");
    await loadScript(
      "https://cdn.jsdelivr.net/npm/@tensorflow-models/face-landmarks-detection@1.0.6/dist/face-landmarks-detection.min.js"
    );

    const runtime = window as RuntimeWindow;
    if (!runtime.tf || !runtime.faceLandmarksDetection) {
      throw new Error("El motor de seguimiento no quedó disponible.");
    }

    await runtime.tf.setBackend("webgl");
    await runtime.tf.ready();

    const detector = await runtime.faceLandmarksDetection.createDetector(
      runtime.faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
      { runtime: "tfjs", refineLandmarks: true, maxFaces: 1 }
    );

    if (detector.initialize) await detector.initialize();
    detectorCache = detector;
    return detector;
  })();

  try {
    return await detectorPromise;
  } catch (error) {
    detectorPromise = null;
    throw error;
  }
}

export function VirtualTryOn({
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
  const [currentFrame, setCurrentFrame] = useState(initialFrame);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [detector, setDetector] = useState<FaceDetector | null>(null);
  const [faceData, setFaceData] = useState<FaceData | null>(null);
  const [scale, setScale] = useState(1);
  const [status, setStatus] = useState("Activa la cámara o sube una foto para comenzar.");
  const [busy, setBusy] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const stopCamera = () => {
    setStream((activeStream) => {
      activeStream?.getTracks().forEach((track) => track.stop());
      return null;
    });
    setDetector(null);
    setFaceData(null);
  };

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [stream]);

  useEffect(() => {
    if (!stream || !detector || photo) return;

    let animationFrame = 0;
    let cancelled = false;

    const detect = async () => {
      const video = videoRef.current;
      if (!video || video.readyState < 2 || !video.videoWidth || cancelled) {
        animationFrame = requestAnimationFrame(detect);
        return;
      }

      try {
        const faces = await detector.estimateFaces(video, { flipHorizontal: true });
        const points = faces[0]?.keypoints ?? faces[0]?.landmarks ?? [];

        if (points.length) {
          const leftEye = points.find((point) => point.name === "left_eye") ?? points[33];
          const rightEye = points.find((point) => point.name === "right_eye") ?? points[263];
          const nose = points.find((point) => point.name === "nose_bridge") ?? points[168];

          if (leftEye && rightEye) {
            const rect = video.getBoundingClientRect();
            const scaleX = rect.width / video.videoWidth;
            const scaleY = rect.height / video.videoHeight;
            const midX = (leftEye.x + rightEye.x) / 2;
            const eyeY = (leftEye.y + rightEye.y) / 2;
            const midY = nose ? (eyeY + nose.y) / 2 : eyeY;
            const eyeDistance = Math.hypot(rightEye.x - leftEye.x, rightEye.y - leftEye.y);
            const rotation = Math.atan2(rightEye.y - leftEye.y, rightEye.x - leftEye.x) * (180 / Math.PI);

            setFaceData({
              x: rect.left + midX * scaleX,
              y: rect.top + midY * scaleY,
              scale: Math.max(0.65, Math.min(1.8, (eyeDistance / 145) * 1.7)),
              rotation,
            });
            setStatus("Seguimiento activo. Puedes ajustar el tamaño.");
          }
        } else {
          setFaceData(null);
          setStatus("Buscando tu rostro…");
        }
      } catch {
        setStatus("El seguimiento se interrumpió. Puedes cerrar y volver a intentarlo.");
      }

      if (!cancelled) animationFrame = requestAnimationFrame(detect);
    };

    animationFrame = requestAnimationFrame(detect);
    return () => {
      cancelled = true;
      cancelAnimationFrame(animationFrame);
    };
  }, [stream, detector, photo]);

  const activateCamera = async () => {
    if (!window.isSecureContext && window.location.hostname !== "localhost") {
      setStatus("La cámara requiere HTTPS. Puedes usar una foto como alternativa.");
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus("Este navegador no expone acceso a cámara. Puedes usar una foto.");
      return;
    }

    setBusy(true);
    setPhoto(null);
    setStatus("Solicitando permiso de cámara…");

    try {
      stopCamera();
      const nextStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      setStream(nextStream);
      setStatus("Cargando seguimiento facial…");
      const nextDetector = await loadFaceDetector();
      setDetector(nextDetector);
      setStatus("Buscando tu rostro…");
    } catch {
      setStatus("No se pudo activar la cámara. Puedes probar con una foto.");
      stopCamera();
    } finally {
      setBusy(false);
    }
  };

  const handlePhoto = (file?: File) => {
    if (!file) return;
    stopCamera();
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(typeof reader.result === "string" ? reader.result : null);
      setStatus("Modo foto: la montura queda centrada y puedes ajustar su tamaño.");
    };
    reader.readAsDataURL(file);
  };

  const frameImage = currentFrame.tryOnImage ?? currentFrame.image;
  const overlayStyle = faceData && !photo
    ? {
        left: `${faceData.x}px`,
        top: `${faceData.y}px`,
        transform: `translate(-50%, -50%) rotate(${faceData.rotation}deg) scale(${faceData.scale * scale})`,
      }
    : {
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%) scale(${scale})`,
      };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="h-[calc(100svh-1rem)] w-[calc(100vw-1rem)] max-w-none overflow-hidden rounded-3xl border-white/10 bg-black p-0 text-white sm:max-w-none"
      >
        <DialogTitle className="sr-only">Prueba virtual de monturas</DialogTitle>
        <DialogDescription className="sr-only">
          Herramienta visual para orientar estilo y proporción. No realiza diagnóstico visual.
        </DialogDescription>

        <div className="relative h-full w-full overflow-hidden bg-black">
          <div className="absolute inset-0 flex items-center justify-center">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photo} alt="Foto seleccionada para la prueba virtual" className="max-h-full max-w-full object-contain" />
            ) : stream ? (
              <video ref={videoRef} autoPlay muted playsInline className="max-h-full max-w-full scale-x-[-1] object-contain" />
            ) : (
              <div className="max-w-lg px-6 text-center">
                <Camera className="mx-auto size-10 text-white/70" aria-hidden="true" />
                <h3 className="mt-5 text-2xl font-semibold text-white">Prueba la montura cuando tú decidas.</h3>
                <p className="mt-3 leading-7 text-white/65">
                  La cámara no se solicita al entrar al catálogo. Actívala aquí o utiliza una fotografía.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <button
                    type="button"
                    disabled={busy}
                    onClick={activateCamera}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-black disabled:opacity-50"
                  >
                    <Camera className="size-5" aria-hidden="true" />
                    {busy ? "Preparando…" : "Activar cámara"}
                  </button>
                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 font-semibold"
                  >
                    <ImagePlus className="size-5" aria-hidden="true" />
                    Subir foto
                  </button>
                </div>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(event) => handlePhoto(event.target.files?.[0])}
                />
              </div>
            )}
          </div>

          {(stream || photo) && (
            <div className="pointer-events-none absolute inset-0 z-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={frameImage}
                alt=""
                aria-hidden="true"
                className="absolute h-auto w-64 max-w-[70vw] object-contain drop-shadow-2xl"
                style={overlayStyle}
              />
            </div>
          )}

          <div className="absolute inset-x-4 top-4 z-30 flex items-start justify-between gap-4">
            <div className="max-w-lg rounded-2xl border border-white/10 bg-black/55 px-4 py-3 backdrop-blur">
              <p className="text-sm font-semibold text-white">{currentFrame.name}</p>
              <p className="mt-1 text-xs leading-5 text-white/65">{status}</p>
            </div>
            <DialogClose asChild>
              <button type="button" onClick={stopCamera} className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-black/55 backdrop-blur" aria-label="Cerrar prueba virtual">
                <X className="size-5" aria-hidden="true" />
              </button>
            </DialogClose>
          </div>

          <div className="absolute bottom-4 left-4 right-4 z-30">
            <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-black/60 p-3 backdrop-blur">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {frames.map((frame) => (
                  <button
                    key={frame.id}
                    type="button"
                    onClick={() => setCurrentFrame(frame)}
                    aria-pressed={currentFrame.id === frame.id}
                    className={`shrink-0 rounded-xl border px-3 py-2 text-xs font-semibold ${
                      currentFrame.id === frame.id ? "border-white bg-white text-black" : "border-white/15 text-white"
                    }`}
                  >
                    {frame.name}
                  </button>
                ))}
              </div>

              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setScale((value) => Math.max(0.65, value - 0.05))} className="grid size-10 place-items-center rounded-xl border border-white/15" aria-label="Reducir montura">
                    <Minus className="size-4" aria-hidden="true" />
                  </button>
                  <span className="min-w-14 text-center text-xs font-semibold">{Math.round(scale * 100)}%</span>
                  <button type="button" onClick={() => setScale((value) => Math.min(1.5, value + 0.05))} className="grid size-10 place-items-center rounded-xl border border-white/15" aria-label="Aumentar montura">
                    <Plus className="size-4" aria-hidden="true" />
                  </button>
                </div>

                <div className="flex gap-2">
                  <button type="button" onClick={activateCamera} disabled={busy} className="min-h-10 rounded-xl border border-white/15 px-3 text-xs font-semibold disabled:opacity-50">
                    Cámara
                  </button>
                  <button type="button" onClick={() => photoInputRef.current?.click()} className="min-h-10 rounded-xl border border-white/15 px-3 text-xs font-semibold">
                    Foto
                  </button>
                </div>
              </div>

              <div className="mt-3 flex items-start gap-2 text-[11px] leading-5 text-white/60">
                <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <p>La imagen se procesa en el navegador durante esta experiencia. La prueba es orientativa y no sustituye una evaluación visual.</p>
              </div>
            </div>
            <input ref={photoInputRef} type="file" accept="image/*" className="sr-only" onChange={(event) => handlePhoto(event.target.files?.[0])} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
