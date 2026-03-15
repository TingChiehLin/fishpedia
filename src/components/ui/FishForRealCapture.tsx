"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addAquariumFish } from "@/lib/aquariumStorage";
import { cn } from "@/lib/utils";

type FishFacing = "left" | "right";

const fishCamBubbles = [
  {
    id: 1,
    size: "h-3 w-3",
    left: "left-[10%]",
    bottom: "bottom-6",
    delay: "0s",
    duration: "4.8s",
  },
  {
    id: 2,
    size: "h-4 w-4",
    left: "left-[24%]",
    bottom: "bottom-16",
    delay: "0.8s",
    duration: "5.5s",
  },
  {
    id: 3,
    size: "h-2.5 w-2.5",
    left: "left-[48%]",
    bottom: "bottom-10",
    delay: "1.2s",
    duration: "4.2s",
  },
  {
    id: 4,
    size: "h-5 w-5",
    left: "left-[72%]",
    bottom: "bottom-8",
    delay: "0.3s",
    duration: "6s",
  },
  {
    id: 5,
    size: "h-3.5 w-3.5",
    left: "left-[86%]",
    bottom: "bottom-20",
    delay: "1.6s",
    duration: "5s",
  },
];

async function detectFishFacingFromCutout(
  dataUrl: string,
): Promise<FishFacing> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => {
      const width = img.naturalWidth || img.width;
      const height = img.naturalHeight || img.height;
      if (!width || !height) {
        resolve("right");
        return;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) {
        resolve("right");
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      const { data } = ctx.getImageData(0, 0, width, height);

      let leftCount = 0;
      let rightCount = 0;
      const threshold = 12;
      const mid = Math.floor(width / 2);

      for (let y = 0; y < height; y += 2) {
        const rowOffset = y * width * 4;
        for (let x = 0; x < width; x += 2) {
          const index = rowOffset + x * 4 + 3;
          const alpha = data[index];
          if (alpha > threshold) {
            if (x < mid) {
              leftCount += 1;
            } else {
              rightCount += 1;
            }
          }
        }
      }

      resolve(leftCount >= rightCount ? "left" : "right");
    };
    img.onerror = () => resolve("right");
    img.src = dataUrl;
  });
}

export default function FishForRealCapture() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [streamReady, setStreamReady] = useState(false);
  const [identifyLoading, setIdentifyLoading] = useState(false);
  const [identifyError, setIdentifyError] = useState<string | null>(null);
  const [identifyResult, setIdentifyResult] = useState<{
    label: string;
    score: number;
    top5?: { label: string; score: number }[];
  } | null>(null);
  const [cutoutUrl, setCutoutUrl] = useState<string | null>(null);
  const [addMessage, setAddMessage] = useState<string | null>(null);
  const [fishFacing, setFishFacing] = useState<FishFacing | null>(null);
  const uploadInputId = "fish-preview-upload";

  const clearCaptureState = () => {
    setPreviewUrl(null);
    setIdentifyResult(null);
    setIdentifyError(null);
    setCutoutUrl(null);
    setAddMessage(null);
    setFishFacing(null);
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setIsCameraOn(false);
    setStreamReady(false);
  };

  const startCamera = async () => {
    try {
      setCameraError(null);
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError("Camera not supported in this browser.");
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      streamRef.current = stream;
      setIsCameraOn(true);
    } catch (error) {
      setCameraError(
        error instanceof Error ? error.message : "Unable to access camera.",
      );
      stopCamera();
    }
  };

  const takePhoto = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");
    setPreviewUrl(dataUrl);
    setIdentifyResult(null);
    setIdentifyError(null);
    setCutoutUrl(null);
    setAddMessage(null);
    setFishFacing(null);
  };

  const onUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
      setIdentifyResult(null);
      setIdentifyError(null);
      setCutoutUrl(null);
      setAddMessage(null);
      setFishFacing(null);
    };
    reader.readAsDataURL(file);
  };

  const identifyFish = async () => {
    if (!previewUrl) return;
    setIdentifyLoading(true);
    setIdentifyError(null);
    setIdentifyResult(null);
    setCutoutUrl(null);
    setAddMessage(null);
    setFishFacing(null);
    try {
      const res = await fetch("/api/fish-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageDataUrl: previewUrl }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to identify fish");
      }
      setIdentifyResult({
        label: data.label,
        score: data.score,
        top5: data.top5,
      });

      const cutoutRes = await fetch("/api/remove-bg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageDataUrl: previewUrl }),
      });
      const cutoutData = await cutoutRes.json();
      if (cutoutRes.ok && cutoutData?.imageDataUrl) {
        const cutout = cutoutData.imageDataUrl as string;
        setCutoutUrl(cutout);
        const facing = await detectFishFacingFromCutout(cutout);
        setFishFacing(facing);
      } else if (!cutoutRes.ok) {
        throw new Error(cutoutData?.error || "Failed to remove background");
      }
    } catch (error) {
      setIdentifyError(
        error instanceof Error ? error.message : "Unable to identify fish",
      );
    } finally {
      setIdentifyLoading(false);
    }
  };

  useEffect(() => {
    if (!isCameraOn || !videoRef.current || !streamRef.current) return;
    const video = videoRef.current;
    video.srcObject = streamRef.current;
    const handleLoaded = async () => {
      try {
        await video.play();
        setStreamReady(true);
      } catch (error) {
        setCameraError(
          error instanceof Error ? error.message : "Unable to start video.",
        );
      }
    };
    video.addEventListener("loadedmetadata", handleLoaded);
    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
    };
  }, [isCameraOn]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleRetake = async () => {
    clearCaptureState();

    if (!isCameraOn) {
      await startCamera();
    }
  };

  const handleConfirm = async () => {
    if (previewUrl) {
      await identifyFish();
      return;
    }

    if (isCameraOn) {
      takePhoto();
      return;
    }

    await startCamera();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
      <Card className="overflow-hidden border-white/70 bg-white/75 shadow-[0_24px_80px_rgba(14,116,144,0.16)] backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700/70">
                Fish Cam
              </p>
            </div>
            <span className="rounded-full bg-cyan-100 px-4 py-1 text-xs font-semibold text-cyan-700 ring-1 ring-cyan-200">
              {previewUrl ? "Preview Ready" : isCameraOn ? "Live" : "Standby"}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="relative overflow-hidden rounded-[30px] border border-white/70 bg-gradient-to-br from-cyan-100 via-sky-200 to-teal-300 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-28px_60px_rgba(8,145,178,0.14),0_20px_40px_rgba(14,116,144,0.18)]">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-12 left-[12%] h-44 w-14 rotate-12 bg-gradient-to-b from-white/50 via-white/20 to-transparent blur-md" />
              <div className="absolute -top-10 left-[34%] h-48 w-16 rotate-6 bg-gradient-to-b from-white/45 via-white/15 to-transparent blur-md" />
              <div className="absolute -top-10 right-[18%] h-44 w-14 -rotate-6 bg-gradient-to-b from-white/35 via-white/15 to-transparent blur-md" />
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/30 to-transparent" />
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-cyan-400/25 via-cyan-200/10 to-transparent" />

            {fishCamBubbles.map((bubble) => (
              <div
                key={bubble.id}
                className={cn(
                  "pointer-events-none absolute rounded-full border border-white/50 bg-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] animate-bounce",
                  bubble.size,
                  bubble.left,
                  bubble.bottom,
                )}
                style={{
                  animationDelay: bubble.delay,
                  animationDuration: bubble.duration,
                }}
              >
                <span className="absolute left-1 top-1 h-1 w-1 rounded-full bg-white/80" />
              </div>
            ))}

            <div className="relative overflow-hidden rounded-[24px] border border-white/60 bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),inset_0_-20px_45px_rgba(14,116,144,0.18)] backdrop-blur-[2px]">
              <div className="pointer-events-none absolute inset-4 z-20">
                <div className="absolute left-0 top-0 h-10 w-10 rounded-tl-3xl border-l-4 border-t-4 border-white/70" />
                <div className="absolute right-0 top-0 h-10 w-10 rounded-tr-3xl border-r-4 border-t-4 border-white/70" />
                <div className="absolute bottom-0 left-0 h-10 w-10 rounded-bl-3xl border-b-4 border-l-4 border-white/70" />
                <div className="absolute bottom-0 right-0 h-10 w-10 rounded-br-3xl border-b-4 border-r-4 border-white/70" />
              </div>

              <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_45%)]" />

              <div className="relative aspect-[4/5] sm:aspect-[4/3]">
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Fish capture preview"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : isCameraOn ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-sm">
                      <svg
                        aria-hidden="true"
                        className="h-12 w-12 text-cyan-700"
                        viewBox="0 0 64 64"
                        fill="none"
                      >
                        <path
                          d="M12 31C12 21 20 14 31 14C40 14 48 18 52 24L44 31L52 38C48 44 40 48 31 48C20 48 12 41 12 31Z"
                          fill="currentColor"
                          fillOpacity="0.92"
                        />
                        <path d="M42 31L56 22V40L42 31Z" fill="currentColor" />
                        <circle cx="24" cy="28" r="3.5" fill="white" />
                        <rect
                          x="20"
                          y="38"
                          width="24"
                          height="14"
                          rx="7"
                          fill="#F8FAFC"
                          fillOpacity="0.95"
                        />
                        <circle cx="32" cy="45" r="5" fill="#0F766E" />
                        <path
                          d="M23 38L28 33H36L41 38"
                          stroke="#F8FAFC"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="mt-5 text-2xl font-black tracking-tight text-slate-900">
                      Ready for your next splashy catch
                    </h3>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-slate-600">
                      Point your camera at the fish you caught
                    </p>
                  </div>
                )}
              </div>

              {isCameraOn && !streamReady && !previewUrl && !cameraError && (
                <div className="absolute inset-x-4 bottom-4 z-30 rounded-full bg-slate-900/55 px-4 py-2 text-center text-xs font-medium text-white backdrop-blur-sm">
                  Warming up the Fish Cam...
                </div>
              )}
            </div>
          </div>

          {cameraError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {cameraError}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              onClick={handleRetake}
              disabled={identifyLoading}
              className="h-12 rounded-full bg-red-400 text-white shadow-md shadow-red-200 transition-all hover:bg-red-500"
            >
              Retake
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={identifyLoading}
              className="h-12 rounded-full bg-green-500 text-white shadow-md shadow-green-200 transition-all hover:bg-green-600"
            >
              {identifyLoading
                ? "Confirming..."
                : previewUrl
                  ? "Confirm"
                  : isCameraOn
                    ? "Snap Fish"
                    : "Open Cam"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-white/70 bg-white/75 shadow-[0_24px_80px_rgba(14,116,144,0.12)] backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700/70">
                Upload Or Preview
              </p>
              <CardTitle className="mt-2 text-2xl font-black tracking-tight text-slate-900">
                Save the best fish photo
              </CardTitle>
            </div>
            <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700 ring-1 ring-teal-200">
              {previewUrl ? "Image Ready" : "Waiting"}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-[26px] border border-teal-100 bg-gradient-to-br from-white via-cyan-50/80 to-emerald-50/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Upload from gallery
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Pick a clear fish photo for the best match.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <input
                  id={uploadInputId}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={onUpload}
                  className="sr-only"
                />
                <label
                  htmlFor={uploadInputId}
                  className="inline-flex h-11 cursor-pointer items-center justify-center rounded-full bg-cyan-500 px-5 text-sm font-semibold text-white shadow-md shadow-cyan-200 transition-all hover:bg-cyan-600"
                >
                  Choose from Gallery
                </label>
                <span className="text-sm text-slate-500">
                  {previewUrl ? "1 photo selected" : "No file chosen"}
                </span>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-gradient-to-br from-cyan-50 via-sky-100 to-teal-200 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-24px_50px_rgba(20,184,166,0.12),0_16px_36px_rgba(14,116,144,0.12)]">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-10 left-[18%] h-36 w-12 rotate-12 bg-gradient-to-b from-white/45 via-white/15 to-transparent blur-md" />
              <div className="absolute -top-8 right-[22%] h-32 w-12 -rotate-6 bg-gradient-to-b from-white/35 via-white/10 to-transparent blur-md" />
            </div>

            {fishCamBubbles.slice(0, 4).map((bubble) => (
              <div
                key={`preview-${bubble.id}`}
                className={cn(
                  "pointer-events-none absolute rounded-full border border-white/50 bg-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] animate-bounce",
                  bubble.size,
                  bubble.left,
                  bubble.bottom,
                )}
                style={{
                  animationDelay: bubble.delay,
                  animationDuration: bubble.duration,
                }}
              >
                <span className="absolute left-1 top-1 h-1 w-1 rounded-full bg-white/80" />
              </div>
            ))}

            <div className="relative overflow-hidden rounded-[22px] border border-white/60 bg-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),inset_0_-16px_36px_rgba(14,116,144,0.14)] backdrop-blur-[2px]">
              <div className="pointer-events-none absolute inset-4 z-20">
                <div className="absolute left-0 top-0 h-9 w-9 rounded-tl-3xl border-l-4 border-t-4 border-white/65" />
                <div className="absolute right-0 top-0 h-9 w-9 rounded-tr-3xl border-r-4 border-t-4 border-white/65" />
                <div className="absolute bottom-0 left-0 h-9 w-9 rounded-bl-3xl border-b-4 border-l-4 border-white/65" />
                <div className="absolute bottom-0 right-0 h-9 w-9 rounded-br-3xl border-b-4 border-r-4 border-white/65" />
              </div>

              <div className="relative aspect-[4/3] flex items-center justify-center">
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-sm">
                      <svg
                        aria-hidden="true"
                        className="h-10 w-10 text-teal-700"
                        viewBox="0 0 64 64"
                        fill="none"
                      >
                        <rect
                          x="14"
                          y="20"
                          width="36"
                          height="24"
                          rx="8"
                          fill="currentColor"
                          fillOpacity="0.92"
                        />
                        <path
                          d="M24 20L28 14H36L40 20"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="32" cy="32" r="8" fill="white" />
                        <circle cx="32" cy="32" r="4" fill="#0F766E" />
                        <circle cx="44" cy="26" r="2" fill="white" />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-xl font-black tracking-tight text-slate-900">
                      Your fish preview will appear here
                    </h3>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={identifyFish}
              disabled={!previewUrl || identifyLoading}
              className="h-12 rounded-full bg-cyan-500 text-white shadow-md shadow-cyan-200 transition-all hover:bg-cyan-600"
            >
              {identifyLoading ? "Identifying..." : "Identify Fish"}
            </Button>
            <Button
              type="button"
              onClick={() => {
                clearCaptureState();
              }}
              disabled={!previewUrl}
              className="h-12 rounded-full bg-white text-slate-700 ring-1 ring-slate-200 transition-all hover:bg-slate-50"
            >
              Clear Preview
            </Button>
          </div>

          {identifyError && (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {identifyError}
            </p>
          )}

          {identifyResult && (
            <div className="rounded-[26px] border border-cyan-100 bg-white/90 p-4 shadow-[0_12px_30px_rgba(14,116,144,0.08)]">
              <p className="text-lg font-semibold text-cyan-800">
                {identifyResult.label}
              </p>
              {cutoutUrl && (
                <div className="mt-3 rounded-2xl bg-slate-50 p-3 fish-spin-wrapper">
                  <div className="relative aspect-video w-full">
                    <Image
                      src={cutoutUrl}
                      alt="Fish cutout"
                      fill
                      unoptimized
                      className="object-contain fish-spin-360"
                    />
                  </div>
                </div>
              )}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => {
                    if (!identifyResult || !cutoutUrl) return;
                    addAquariumFish({
                      id: `${Date.now()}`,
                      name: identifyResult.label,
                      cutoutUrl,
                      facing: fishFacing ?? "right",
                    });
                    setAddMessage("Added to aquarium!");
                  }}
                  disabled={!cutoutUrl}
                  className="rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-200 hover:bg-emerald-600"
                >
                  + Add to Aquarium
                </Button>
                {addMessage && (
                  <span className="text-sm text-green-700">{addMessage}</span>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
