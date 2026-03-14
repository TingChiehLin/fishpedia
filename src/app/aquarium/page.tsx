import AquariumGallery from "@/components/ui/AquariumGallery";
export default function AquariumPage() {
  return (
    <div className="space-y-8 py-10 px-6">
      <header className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Aquarium
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your collected fish will appear here.
        </p>
      </header>

      <AquariumGallery />
    </div>
  );
}
