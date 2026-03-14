"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AquariumFish, getAquariumFish } from "@/lib/aquariumStorage";

export default function AquariumGallery() {
  const [fish, setFish] = useState<AquariumFish[]>([]);

  useEffect(() => {
    setFish(getAquariumFish());
  }, []);

  if (!fish.length) {
    return (
      <section className="mx-auto max-w-4xl rounded-2xl border bg-white p-6 text-center">
        <p className="text-gray-600">
          No fish added yet. Add one from "Fish for Real".
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border bg-white/80 p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-sky-800 mb-4">Fish Gallary</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {fish.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader className="py-3">
              <CardTitle className="text-sm text-blue-800">
                {item.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="rounded-lg bg-slate-50 p-2">
                <img
                  src={item.cutoutUrl}
                  alt={item.name}
                  className="w-full h-auto"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
