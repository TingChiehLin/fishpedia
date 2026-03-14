"use client";

import { useEffect, useMemo, useState } from "react";
import { AquariumFish, getAquariumFish } from "@/lib/aquariumStorage";

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getPosition(fish: AquariumFish) {
  const hash = hashString(fish.id);
  const x = 5 + (hash % 80);
  const y = 10 + ((hash >> 3) % 60);
  const delay = (hash % 10) * -1;
  return { x, y, delay };
}

export default function AquariumTank() {
  const [fish, setFish] = useState<AquariumFish[]>([]);

  useEffect(() => {
    setFish(getAquariumFish());
  }, []);

  const fishPositions = useMemo(() => {
    return fish.map((item) => ({
      item,
      ...getPosition(item),
    }));
  }, [fish]);

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

      <div className="relative h-64">
        {fishPositions.length === 0 ? (
          <div className="flex h-full items-center justify-center text-white/80 text-sm">
            Add fish to see them swim here.
          </div>
        ) : (
          fishPositions.map(({ item, x, y, delay }) => (
            <div
              key={item.id}
              className="aquarium-fish"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                animationDelay: `${delay}s`,
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
    </section>
  );
}
