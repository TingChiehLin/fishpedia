import FishForRealCapture from "@/components/ui/FishForRealCapture";

export default function FishForRealPage() {
  return (
    <div className="space-y-8">
      <header className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Fish for Real
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Use your camera or upload a photo to capture a real fish moment.
        </p>
      </header>

      <FishForRealCapture />
    </div>
  );
}
