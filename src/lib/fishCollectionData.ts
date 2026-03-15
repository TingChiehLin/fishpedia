const fishNames = [
  "Anchovy",
  "Angelfish",
  "Anglerfish",
  "Arowana",
  "Atlantic Cod",
  "Barracuda",
  "Betta",
  "Blue Marlin",
  "Blue Tang",
  "Bream",
  "Carp",
  "Catfish",
  "Clownfish",
  "Coelacanth",
  "Crucian Carp",
  "Dorado",
  "Dragonfish",
  "Eel",
  "Electric Eel",
  "Emperor Angelfish",
  "Flounder",
  "Flying Fish",
  "Gilt-head Bream",
  "Goldfish",
  "Grouper",
  "Guppy",
  "Halibut",
  "Herring",
  "Horse Mackerel",
  "Jackfish",
  "Killifish",
  "Koi",
  "Lionfish",
  "Mackerel",
  "Mahi-mahi",
  "Manta Ray",
  "Monkfish",
  "Moonfish",
  "Moray Eel",
  "Needlefish",
  "Nile Tilapia",
  "Ocean Sunfish",
  "Parrotfish",
  "Perch",
  "Pike",
  "Piranha",
  "Pollock",
  "Pomfret",
  "Pufferfish",
  "Rainbow Trout",
  "Red Snapper",
  "Remora",
  "Sailfish",
  "Salmon",
  "Sardine",
  "Sawfish",
  "Seahorse",
  "Sea Bass",
  "Shark",
  "Sheepshead",
  "Skate",
  "Smelt",
  "Snapper",
  "Sole",
  "Stingray",
  "Sturgeon",
  "Swordfish",
  "Tarpon",
  "Tetra",
  "Tilefish",
  "Tilapia",
  "Triggerfish",
  "Trout",
  "Tuna",
  "Turbot",
  "Wahoo",
  "Walleye",
  "Whitefish",
  "Wrasse",
  "Yellowfin Tuna",
  "Zebrafish",
  "Atlantic Salmon",
  "Black Cod",
  "Bluefin Tuna",
  "Brown Trout",
  "Butterflyfish",
  "Cichlid",
  "Clupea",
  "Darter",
  "Dory",
  "Drum",
  "Flathead",
  "Goby",
  "Haddock",
  "Hake",
  "Hammerhead Shark",
  "Kingfish",
  "Lamprey",
  "Lingcod",
  "Mudfish",
  "Opah",
  "Pangasius",
  "Rainbowfish",
  "Roosterfish",
  "Rudd",
  "Salmon Shark",
  "Sculpin",
  "Snapperfish",
  "Spotted Bass",
  "Sweetlips",
  "Trevally",
  "Tripletail",
  "Wobbegong",
  "Yellowtail",
  "Zander",
  "Arctic Char",
  "Bluegill",
  "Brook Trout",
  "Chub",
  "Dogfish",
  "Milkfish",
  "Garfish",
  "Rockfish",
  "Silver Carp",
  "Snakehead",
  "Tench",
];

const habitats = [
  "Coral reefs",
  "Mangrove lagoons",
  "Open ocean",
  "Seagrass meadows",
  "Tidal estuaries",
  "Rocky coastlines",
  "Deep sea canyons",
  "Freshwater lakes",
  "River deltas",
  "Kelp forests",
  "Underwater caves",
  "Lagoon shallows",
];

const facts = [
  "It prefers to travel in small schools for safety.",
  "Its fins shimmer when sunlight hits the water.",
  "It can sense tiny vibrations in the current.",
  "It rests in coral crevices during the day.",
  "It migrates with the changing seasons.",
  "It uses quick bursts to surprise prey.",
  "Its colors help it blend into reef gardens.",
  "It can glide smoothly without much effort.",
  "It feeds most actively at dawn and dusk.",
  "It helps keep the reef clean by eating algae.",
];

const rarities = ["Common", "Rare", "Epic", "Legendary"] as const;

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

const palettes = [
  ["#FDE68A", "#38BDF8", "#F97316"],
  ["#F9A8D4", "#A7F3D0", "#14B8A6"],
  ["#FB7185", "#38BDF8", "#FACC15"],
  ["#C4B5FD", "#60A5FA", "#22D3EE"],
  ["#86EFAC", "#2DD4BF", "#0EA5E9"],
  ["#67E8F9", "#34D399", "#FBBF24"],
  ["#FDE68A", "#FB923C", "#F43F5E"],
  ["#BFDBFE", "#93C5FD", "#34D399"],
  ["#FDBA74", "#FDE68A", "#22C55E"],
  ["#A5B4FC", "#67E8F9", "#FDE68A"],
  ["#FDBA74", "#FB7185", "#2DD4BF"],
  ["#7DD3FC", "#A7F3D0", "#F59E0B"],
];

export const fishCollectionData = fishNames.slice(0, 60).map((name, index) => {
  const palette = palettes[index % palettes.length];
  return {
    id: index + 1,
    name,
    rarity: rarities[index % rarities.length],
    habitat: habitats[index % habitats.length],
    fact: facts[index % facts.length],
    image: createFishImage(palette[0], palette[1], palette[2]),
  };
});
