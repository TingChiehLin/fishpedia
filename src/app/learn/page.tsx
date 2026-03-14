import FishCard from "@/components/cards/FishCard";
import { api } from "@/lib/services/api";

export default async function LearnPage() {
  const fish = await api.getFish();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Learn About Fish
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover amazing fish species, their habitats, and fun facts about
          fishing!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fish.map((fish) => (
          <FishCard key={fish.id} fish={fish} />
        ))}
      </div>
    </div>
  );
}
