import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-gradient-to-br from-sky-500 via-cyan-400 to-emerald-400">
      {/* Readability overlay */}
      <div className="absolute inset-0 bg-slate-900/25" />

      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white blur-3xl" />
        <div className="absolute top-1/3 right-0 h-96 w-96 rounded-full bg-cyan-200 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-emerald-200 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        {/* Tag */}
        <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white/95 backdrop-blur-md shadow-sm">
          🎣 Learn, Play, and Explore Nature Together
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)] md:text-6xl lg:text-7xl">
          Welcome to <span className="text-white">Fishpedia</span> 🐟
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)] md:text-xl">
          Discover fascinating fish, learn fun fishing facts, and enjoy
          interactive experiences designed for kids, families, and curious
          learners of all ages.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-white px-8 text-sky-700 shadow-lg transition-all duration-300 hover:scale-[1.03]"
          >
            <Link href="/learn">Start Learning</Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="secondary"
            className="h-12 rounded-full border border-white/30 bg-white/10 px-8 text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:bg-white/20"
          >
            <Link href="/quiz">Take a Quiz</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
