"use client";

import { useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { AquariumFish, getAquariumFish } from "@/lib/aquariumStorage";

export default function AquariumTank() {
  const [fish, setFish] = useState<AquariumFish[]>([]);
  const [selectedFish, setSelectedFish] = useState<AquariumFish | null>(null);
  const tankRef = useRef<HTMLDivElement | null>(null);
  const fishRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    setFish(getAquariumFish());
  }, []);

  const fishList = useMemo(() => fish, [fish]);

  useLayoutEffect(() => {
    const tank = tankRef.current;
    if (!tank) return;

    const bounds = tank.getBoundingClientRect();
    const maxX = Math.max(0, bounds.width - 80);
    const maxY = Math.max(0, bounds.height - 80);

    const nodes = fishRefs.current.filter(Boolean);
    if (nodes.length === 0) return;

    const ctx = gsap.context(() => {
      nodes.forEach((el, index) => {
        if (!el) return;

        const direction = index % 2 === 0 ? 1 : -1;
        const y = gsap.utils.random(0, maxY);
        const duration = gsap.utils.random(10, 22);

        const startX = direction === 1 ? -80 : maxX + 80;
        const endX = direction === 1 ? maxX + 80 : -80;

        gsap.set(el, { x: startX, y, scaleX: direction });

        gsap.to(el, {
          x: endX,
          duration,
          ease: "none",
          repeat: -1,
          delay: gsap.utils.random(0, 2),
        });
      });
    }, tank);

    return () => ctx.revert();
  }, [fishList]);

  return (
    <section className="rounded-3xl border bg-gradient-to-b from-sky-100 via-cyan-200 to-blue-400 p-6 shadow-sm relative overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none aquarium-waves" />
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="aquarium-bubble"
            style={{
              left: `${10 + i * 10}%`,
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}
      </div>

      <div ref={tankRef} className="relative h-64">
        {fishList.length === 0 ? (
          <div className="flex h-full items-center justify-center text-white/80 text-sm">
            Add fish to see them swim here.
          </div>
        ) : (
          fishList.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                if (el) fishRefs.current[index] = el;
              }}
              className="aquarium-fish"
              onClick={() => setSelectedFish(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  setSelectedFish(item);
                }
              }}
            >
              <img
                src={item.cutoutUrl}
                alt={item.name}
                className="h-16 w-auto drop-shadow-lg"
              />
            </div>
          ))
        )}
      </div>

      {selectedFish && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedFish(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-sky-800">
                  {selectedFish.name}
                </h3>
              </div>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setSelectedFish(null)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 rounded-xl p-4 fish-spin-wrapper">
              <img
                src={selectedFish.cutoutUrl}
                alt={selectedFish.name}
                className="w-full h-auto fish-spin-360"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
