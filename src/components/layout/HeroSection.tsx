// src/components/layout/HeroSection.tsx

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="text-center py-12 bg-linear-to-r from-blue-400 to-green-400 rounded-2xl text-white mb-8">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Welcome to Fishpedia! 🐟
      </h1>
      <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
        Discover amazing fish, learn fishing facts, and have fun with your
        family!
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          asChild
          size="lg"
          className="bg-white text-blue-600 hover:bg-gray-100"
        >
          <Link href="/learn">Start Learning</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="border-white text-white hover:bg-white hover:text-blue-600"
        >
          <Link href="/quiz">Take a Quiz</Link>
        </Button>
      </div>
    </section>
  );
}
