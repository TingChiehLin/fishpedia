export type AquariumFish = {
  id: string;
  name: string;
  cutoutUrl: string;
};

const STORAGE_KEY = "fishpedia_aquarium";

export function getAquariumFish(): AquariumFish[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addAquariumFish(fish: AquariumFish) {
  if (typeof window === "undefined") return;
  const current = getAquariumFish();
  const next = [fish, ...current];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}
