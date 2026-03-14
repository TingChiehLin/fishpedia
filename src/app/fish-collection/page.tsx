"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

type Fish = {
  id: number;
  name: string;
  collected: boolean;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  habitat: string;
  fact: string;
  image: string;
};

type FilterOption = "All" | "Collected" | "Not Collected";

const filters: FilterOption[] = ["All", "Collected", "Not Collected"];

function createFishImage(
  primary: string,
  secondary: string,
  accent: string,
): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" fill="none">
      <defs>
        <linearGradient id="bg" x1="32" y1="24" x2="288" y2="196" gradientUnits="userSpaceOnUse">
          <stop stop-color="#EFFCFF" />
          <stop offset="1" stop-color="#D9FBEA" />
        </linearGradient>
        <linearGradient id="body" x1="68" y1="64" x2="224" y2="166" gradientUnits="userSpaceOnUse">
          <stop stop-color="${primary}" />
          <stop offset="1" stop-color="${secondary}" />
        </linearGradient>
      </defs>
      <rect width="320" height="220" rx="28" fill="url(#bg)" />
      <circle cx="60" cy="52" r="10" fill="#FFFFFF" fill-opacity="0.9" />
      <circle cx="92" cy="36" r="6" fill="#FFFFFF" fill-opacity="0.7" />
      <circle cx="272" cy="56" r="8" fill="#FFFFFF" fill-opacity="0.7" />
      <circle cx="252" cy="86" r="5" fill="#FFFFFF" fill-opacity="0.85" />
      <ellipse cx="146" cy="118" rx="84" ry="50" fill="url(#body)" />
      <path d="M213 118L272 76V160L213 118Z" fill="${accent}" />
      <path d="M108 80L130 44L158 82" fill="${accent}" fill-opacity="0.9" />
      <path d="M120 160L142 190L170 156" fill="${accent}" fill-opacity="0.85" />
      <ellipse cx="114" cy="106" rx="16" ry="10" fill="#FFFFFF" fill-opacity="0.3" />
      <ellipse cx="150" cy="136" rx="30" ry="4" fill="#FFFFFF" fill-opacity="0.35" />
      <circle cx="92" cy="110" r="7" fill="#0F172A" fill-opacity="0.8" />
      <circle cx="90" cy="108" r="2" fill="#FFFFFF" />
      <path d="M72 129C82 136 97 136 108 129" stroke="#0F172A" stroke-opacity="0.45" stroke-width="4" stroke-linecap="round" />
      <path d="M235 86C246 94 253 106 255 120" stroke="#FFFFFF" stroke-opacity="0.35" stroke-width="6" stroke-linecap="round" />
      <path d="M226 154C237 148 246 138 252 126" stroke="#FFFFFF" stroke-opacity="0.25" stroke-width="5" stroke-linecap="round" />
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const fishCollection: Fish[] = [
  {
    id: 1,
    name: "Sunbeam Guppy",
    collected: true,
    rarity: "Common",
    habitat: "Shallow river pools",
    fact: "Sunbeam guppies gather in bright groups when the water is warm.",
    image: createFishImage("#FDE68A", "#38BDF8", "#F97316"),
  },
  {
    id: 2,
    name: "Pebble Puffer",
    collected: true,
    rarity: "Rare",
    habitat: "Rocky tide pools",
    fact: "It puffs into a ball when a shadow passes overhead.",
    image: createFishImage("#F9A8D4", "#A7F3D0", "#14B8A6"),
  },
  {
    id: 3,
    name: "Coral Comet",
    collected: false,
    rarity: "Epic",
    habitat: "Coral reef arches",
    fact: "Its tail flashes like confetti during sunset swims.",
    image: createFishImage("#FB7185", "#38BDF8", "#FACC15"),
  },
  {
    id: 4,
    name: "Moonfin Ray",
    collected: false,
    rarity: "Legendary",
    habitat: "Moonlit lagoons",
    fact: "Moonfin rays glide so softly they barely ripple the water.",
    image: createFishImage("#C4B5FD", "#60A5FA", "#22D3EE"),
  },
  {
    id: 5,
    name: "Bamboo Betta",
    collected: true,
    rarity: "Rare",
    habitat: "Lily-covered ponds",
    fact: "Bamboo bettas build bubble nests under floating leaves.",
    image: createFishImage("#86EFAC", "#2DD4BF", "#0EA5E9"),
  },
  {
    id: 6,
    name: "Tidewhistle Tang",
    collected: false,
    rarity: "Common",
    habitat: "Kelp gardens",
    fact: "The fins hum gently when ocean currents get playful.",
    image: createFishImage("#67E8F9", "#34D399", "#FBBF24"),
  },
  {
    id: 7,
    name: "Golden Ripple Koi",
    collected: true,
    rarity: "Epic",
    habitat: "Garden ponds",
    fact: "Its scales look like liquid gold when sunlight touches them.",
    image: createFishImage("#FDE68A", "#FB923C", "#F43F5E"),
  },
  {
    id: 8,
    name: "Cloudstripe Minnow",
    collected: false,
    rarity: "Common",
    habitat: "Mountain creeks",
    fact: "Cloudstripe minnows dart into calm eddies during storms.",
    image: createFishImage("#BFDBFE", "#93C5FD", "#34D399"),
  },
  {
    id: 9,
    name: "Lantern Loach",
    collected: true,
    rarity: "Rare",
    habitat: "Twilight riverbanks",
    fact: "Tiny glowing markings help groups stay together at dusk.",
    image: createFishImage("#FDBA74", "#FDE68A", "#22C55E"),
  },
  {
    id: 10,
    name: "Starcrest Seahorse",
    collected: false,
    rarity: "Legendary",
    habitat: "Seagrass mazes",
    fact: "Its crown-like fin shimmers like a tiny night sky.",
    image: createFishImage("#A5B4FC", "#67E8F9", "#FDE68A"),
  },
  {
    id: 11,
    name: "Mango Mosaic Cichlid",
    collected: true,
    rarity: "Epic",
    habitat: "Warm mangrove lagoons",
    fact: "Each one has a slightly different patchwork pattern.",
    image: createFishImage("#FDBA74", "#FB7185", "#2DD4BF"),
  },
  {
    id: 12,
    name: "Bubbletail Blenny",
    collected: false,
    rarity: "Rare",
    habitat: "Sunny reef nooks",
    fact: "It likes to hide in tiny caves and peek out with a wiggle.",
    image: createFishImage("#7DD3FC", "#A7F3D0", "#F59E0B"),
  },
];

const rarityStyles: Record<Fish["rarity"], string> = {
  Common: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  Rare: "bg-sky-100 text-sky-700 ring-sky-200",
  Epic: "bg-amber-100 text-amber-700 ring-amber-200",
  Legendary: "bg-rose-100 text-rose-700 ring-rose-200",
};

const rarityGlow: Record<Fish["rarity"], string> = {
  Common: "from-emerald-200/90 via-teal-100 to-white",
  Rare: "from-sky-200/90 via-cyan-100 to-white",
  Epic: "from-amber-200/90 via-yellow-100 to-white",
  Legendary: "from-rose-200/90 via-fuchsia-100 to-white",
};

function matchFilter(fish: Fish, activeFilter: FilterOption) {
  if (activeFilter === "Collected") {
    return fish.collected;
  }

  if (activeFilter === "Not Collected") {
    return !fish.collected;
  }

  return true;
}

function LockedFishArt() {
  return (
    <div className="relative flex h-full items-center justify-center">
      <div className="absolute h-28 w-28 rounded-full bg-white/30 blur-2xl" />
      <svg
        aria-hidden="true"
        className="relative h-24 w-24 text-slate-500/85"
        viewBox="0 0 96 96"
        fill="none"
      >
        <path
          d="M18 48C18 32 31 22 49 22C64 22 76 29 83 40L69 48L83 56C76 67 64 74 49 74C31 74 18 64 18 48Z"
          fill="currentColor"
          fillOpacity="0.72"
        />
        <path d="M68 48L86 36V60L68 48Z" fill="currentColor" />
        <circle cx="38" cy="45" r="4.5" fill="#F8FAFC" fillOpacity="0.9" />
        <path
          d="M18 48C18 32 31 22 49 22C64 22 76 29 83 40L69 48L83 56C76 67 64 74 49 74C31 74 18 64 18 48Z"
          stroke="white"
          strokeOpacity="0.25"
          strokeWidth="3"
        />
        <rect
          x="34"
          y="53"
          width="28"
          height="22"
          rx="7"
          fill="#0F172A"
          fillOpacity="0.8"
        />
        <path
          d="M41 53V49C41 42.925 45.925 38 52 38C58.075 38 63 42.925 63 49V53"
          stroke="#0F172A"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="48" cy="64" r="3.5" fill="#E2E8F0" />
      </svg>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 text-sky-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function FishCollectionCard({ fish }: { fish: Fish }) {
  const isCollected = fish.collected;

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[28px] border shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl",
        isCollected
          ? "border-white/70 bg-white/85"
          : "border-slate-200/80 bg-slate-50/85",
      )}
    >
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1/2 opacity-80 transition-opacity duration-300 group-hover:opacity-100",
          isCollected
            ? "bg-gradient-to-br from-sky-100 via-cyan-50 to-emerald-100"
            : "bg-gradient-to-br from-slate-200 via-slate-100 to-cyan-50",
        )}
      />

      <div className="relative p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <span
            className={cn(
              "inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1",
              isCollected
                ? rarityStyles[fish.rarity]
                : "bg-white/80 text-slate-500 ring-slate-200",
            )}
          >
            {isCollected ? fish.rarity : "Mystery Fish"}
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ring-1",
              isCollected
                ? "bg-emerald-100 text-emerald-700 ring-emerald-200"
                : "bg-slate-200 text-slate-600 ring-slate-300",
            )}
          >
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                isCollected ? "bg-emerald-500" : "bg-slate-400",
              )}
            />
            {isCollected ? "Collected" : "Locked"}
          </span>
        </div>

        <div
          className={cn(
            "relative mt-4 overflow-hidden rounded-[24px] border p-4",
            isCollected
              ? `border-white/80 bg-gradient-to-br ${rarityGlow[fish.rarity]}`
              : "border-slate-200 bg-gradient-to-br from-slate-300 via-slate-100 to-cyan-50",
          )}
        >
          {isCollected ? (
            <Image
              src={fish.image}
              alt={fish.name}
              width={320}
              height={220}
              unoptimized
              className="h-44 w-full rounded-[20px] object-cover shadow-md transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="relative h-44 overflow-hidden rounded-[20px]">
              <Image
                src={fish.image}
                alt=""
                fill
                unoptimized
                className="absolute inset-0 h-full w-full object-cover opacity-20 blur-[2px] grayscale"
              />
              <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
              <LockedFishArt />
            </div>
          )}
        </div>

        <div className="mt-5 space-y-3">
          <div className="space-y-1">
            <h2
              className={cn(
                "text-xl font-bold tracking-tight",
                isCollected ? "text-slate-900" : "text-slate-600",
              )}
            >
              {isCollected ? fish.name : "Unknown Fish"}
            </h2>
            <p className="text-sm font-medium text-slate-500">
              Habitat: {isCollected ? fish.habitat : "Hidden until discovered"}
            </p>
          </div>

          <p
            className={cn(
              "min-h-12 text-sm leading-6",
              isCollected ? "text-slate-600" : "text-slate-500",
            )}
          >
            {isCollected
              ? fish.fact
              : "A secret entry is waiting here. Reel this fish in to unlock its full story."}
          </p>

          <div
            className={cn(
              "flex items-center justify-between rounded-2xl px-4 py-3 text-sm",
              isCollected
                ? "bg-sky-50 text-sky-700"
                : "bg-white/70 text-slate-500 ring-1 ring-slate-200",
            )}
          >
            <span>
              {isCollected ? "Collection note updated" : "Discovery needed"}
            </span>
            <span className="font-semibold">
              {isCollected ? "Entry complete" : "???"}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function FishCollectionPage() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const collectedCount = fishCollection.filter((fish) => fish.collected).length;
  const totalCount = fishCollection.length;
  const progressPercent = Math.round((collectedCount / totalCount) * 100);
  const remainingCount = totalCount - collectedCount;

  const filteredFish = fishCollection.filter((fish) => {
    const searchTarget = fish.collected ? fish.name : "unknown";
    const matchesSearch = searchTarget
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());

    return matchFilter(fish, activeFilter) && matchesSearch;
  });

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cyan-50 via-sky-50 to-emerald-50" />
      <div className="absolute -top-20 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/40 blur-3xl" />
      <div className="absolute right-0 top-40 -z-10 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-72 w-72 rounded-full bg-amber-100/60 blur-3xl" />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 sm:px-8 lg:px-10 py-10">
        <div className="relative overflow-hidden rounded-[36px] border border-white/70 bg-white/75 p-6 shadow-xl backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.22),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(253,224,71,0.18),_transparent_36%)]" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex rounded-full bg-sky-100 px-4 py-1.5 text-sm font-semibold text-sky-700 ring-1 ring-sky-200">
                Fish Collection
              </span>
              <div className="space-y-3">
                <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  Build your bubbly fish encyclopedia
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                  Browse the fish you have already discovered, peek at the ones
                  still hiding, and watch your collection fill up one splash at
                  a time.
                </p>
              </div>
            </div>

            <div className="min-w-full rounded-[28px] bg-slate-900 px-5 py-5 text-white shadow-lg sm:min-w-[320px] lg:max-w-sm">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-cyan-100/80">
                    Collection Progress
                  </p>
                  <p className="mt-1 text-3xl font-black tracking-tight">
                    {collectedCount} / {totalCount} collected
                  </p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-cyan-100">
                  {progressPercent}%
                </span>
              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-300 to-emerald-300 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-200">
                {remainingCount === 0
                  ? "Your collection is complete. Every fish entry has been discovered."
                  : `${remainingCount} more fish to discover before your collection is full.`}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[30px] border border-white/70 bg-white/75 p-4 shadow-lg backdrop-blur-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
                      isActive
                        ? "bg-sky-500 text-white shadow-md shadow-sky-200"
                        : "bg-sky-50 text-slate-600 ring-1 ring-sky-100 hover:bg-sky-100",
                    )}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            <label className="flex w-full items-center gap-3 rounded-full border border-sky-100 bg-white px-4 py-3 shadow-sm lg:max-w-md">
              <SearchIcon />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search collected fish by name"
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </label>
          </div>
        </div>

        {filteredFish.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredFish.map((fish) => (
              <FishCollectionCard key={fish.id} fish={fish} />
            ))}
          </div>
        ) : (
          <div className="rounded-[32px] border border-dashed border-sky-200 bg-white/75 px-6 py-14 text-center shadow-sm">
            <div className="mx-auto flex max-w-md flex-col items-center gap-4">
              <div className="rounded-full bg-sky-100 p-4 text-sky-600 shadow-inner shadow-sky-200/70">
                <SearchIcon />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">
                  No fish match this search
                </h2>
                <p className="text-sm leading-6 text-slate-500 sm:text-base">
                  Try another fish name or switch filters to explore a different
                  part of your collection.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveFilter("All");
                  setSearchQuery("");
                }}
                className="rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-200 transition-transform duration-200 hover:-translate-y-0.5"
              >
                Reset filters
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
