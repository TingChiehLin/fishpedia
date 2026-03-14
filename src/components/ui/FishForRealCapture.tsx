"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  };

  const onUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
      setIdentifyResult(null);
      setIdentifyError(null);
    };
    reader.readAsDataURL(file);
  };

  const identifyFish = async () => {
    if (!previewUrl) return;
    setIdentifyLoading(true);
    setIdentifyError(null);
    setIdentifyResult(null);
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
              <p className="text-sm text-gray-500">Detected fish</p>
              <p className="text-lg font-semibold text-blue-800">
                {identifyResult.label}
              </p>
              <p className="text-xs text-gray-500">
                Confidence: {(identifyResult.score * 100).toFixed(1)}%
              </p>
              {identifyResult.top5?.length ? (
                <div className="mt-3">
                  <p className="text-sm font-semibold text-gray-700">
                    Other guesses
                  </p>
                  <ul className="mt-1 space-y-1 text-sm text-gray-600">
                    {identifyResult.top5.slice(1).map((item) => (
                      <li key={item.label}>
                        • {item.label} ({(item.score * 100).toFixed(1)}%)
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
