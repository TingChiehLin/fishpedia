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
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {fish.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800">{item.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-slate-50 p-3">
              <img
                src={item.cutoutUrl}
                alt={item.name}
                className="w-full h-auto"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
