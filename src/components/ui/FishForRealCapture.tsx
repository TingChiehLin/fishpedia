"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addAquariumFish } from "@/lib/aquariumStorage";

type FishFacing = "left" | "right";

async function detectFishFacingFromCutout(
  dataUrl: string
): Promise<FishFacing> {
  return new Promise((resolve) => {
    const img = new Image();
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
        error instanceof Error ? error.message : "Unable to access camera."
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
      }
    } catch (error) {
      setIdentifyError(
        error instanceof Error ? error.message : "Unable to identify fish"
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
          error instanceof Error ? error.message : "Unable to start video."
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Camera</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-slate-100 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
            {isCameraOn ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-sm text-gray-500">
                Turn on the camera to start
              </p>
            )}
          </div>
          {isCameraOn && !streamReady && !cameraError && (
            <p className="text-sm text-gray-500">
              Starting camera… If nothing appears, try Stop Camera and Open
              Camera again.
            </p>
          )}
          {cameraError && (
            <p className="text-sm text-red-600">{cameraError}</p>
          )}
          <div className="flex flex-wrap gap-3">
            <Button onClick={startCamera} disabled={isCameraOn}>
              Open Camera
            </Button>
            <Button onClick={takePhoto} disabled={!isCameraOn}>
              Take Photo
            </Button>
            <Button variant="outline" onClick={stopCamera} disabled={!isCameraOn}>
              Stop Camera
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upload Or Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-gray-700">Upload</span>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={onUpload}
              className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-500"
            />
          </label>

          <div className="bg-slate-100 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-sm text-gray-500">No image yet</p>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={identifyFish} disabled={!previewUrl || identifyLoading}>
              {identifyLoading ? "Identifying..." : "Identify Fish"}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setPreviewUrl(null);
                setIdentifyResult(null);
                setIdentifyError(null);
                setCutoutUrl(null);
                setAddMessage(null);
                setFishFacing(null);
              }}
              disabled={!previewUrl}
            >
              Clear Preview
            </Button>
          </div>

          {identifyError && (
            <p className="text-sm text-red-600">{identifyError}</p>
          )}

          {identifyResult && (
            <div className="rounded-xl border bg-white p-4">
              <p className="text-lg font-semibold text-blue-800">
                {identifyResult.label}
              </p>
              {cutoutUrl && (
                <div className="mt-3 rounded-lg bg-slate-50 p-3 fish-spin-wrapper">
                  <img
                    src={cutoutUrl}
                    alt="Fish cutout"
                    className="w-full h-auto fish-spin-360"
                  />
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
