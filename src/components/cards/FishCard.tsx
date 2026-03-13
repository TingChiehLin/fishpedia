// src/components/cards/FishCard.tsx

import { Fish } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FishCardProps {
  fish: Fish;
}

export default function FishCard({ fish }: FishCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="aspect-video bg-linear-to-br from-blue-200 to-green-200 rounded-lg mb-4 flex items-center justify-center text-6xl">
          🐟
        </div>
        <CardTitle className="text-xl">{fish.name}</CardTitle>
        <CardDescription>{fish.habitat}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{fish.description}</p>
        <p className="text-sm font-medium text-blue-600 mb-4">
          Fun Fact: {fish.funFact}
        </p>
        <Button asChild className="w-full">
          <Link href={`/learn/${fish.id}`}>Learn More</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
