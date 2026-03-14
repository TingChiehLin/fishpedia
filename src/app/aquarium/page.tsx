import AquariumGallery from "@/components/ui/AquariumGallery";
import AquariumTank from "@/components/ui/AquariumTank";
export default function AquariumPage() {
  return (
    <div className="space-y-8">
      <AquariumTank />

      <AquariumGallery />
    </div>
  );
}
