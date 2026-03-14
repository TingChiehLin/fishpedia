import HeroSection from "@/components/layout/HeroSection";
import FeatureCard from "@/components/ui/FeatureCard";
import FishCard from "@/components/cards/FishCard";
import { BookOpen, Brain, Users, Trophy, User, Map, Camera } from "lucide-react";
import { api } from "@/lib/services/api";

export default async function Home() {
  const [fish, facts] = await Promise.all([api.getFish(), api.getFacts()]);

  const featuredFish = fish.slice(0, 3);
  const dailyFact = facts[0]; // For demo, show first fact

  const features = [
    {
      title: "Fish Map",
      description: "Tap a place and see which fish live there.",
      icon: Map,
      href: "/fish-map",
    },
    {
      title: "Fish for Real",
      description: "Use your camera or upload a fish photo.",
      icon: Camera,
      href: "/fish-for-real",
    },
    {
      title: "Learn About Fish",
      description: "Discover amazing fish species and their habitats.",
      icon: BookOpen,
      href: "/learn",
    },
    {
      title: "Take Quizzes",
      description: "Test your fishing knowledge with fun quizzes.",
      icon: Brain,
      href: "/quiz",
    },
    {
      title: "Family Activities",
      description: "Enjoy fishing activities with your family.",
      icon: Users,
      href: "/activities",
    },
    {
      title: "Track Progress",
      description: "See your achievements and earned badges.",
      icon: Trophy,
      href: "/progress",
    },
    {
      title: "Your Profile",
      description: "View your learning journey and stats.",
      icon: User,
      href: "/profile",
    },
  ];

  return (
    <div className="space-y-12">
      <HeroSection />

      {/* Daily Fishing Fact */}
      <section className="bg-yellow-100 border-l-4 border-yellow-400 p-6 rounded-r-lg">
        <h2 className="text-2xl font-bold text-yellow-800 mb-2">
          🌟 Daily Fishing Fact
        </h2>
        <p className="text-lg text-yellow-700">{dailyFact.fact}</p>
      </section>

      {/* Featured Fish */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Featured Fish</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredFish.map((fish) => (
            <FishCard key={fish.id} fish={fish} />
          ))}
        </div>
      </section>

      {/* Navigation Features */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">
          What Would You Like to Do?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.href} {...feature} />
          ))}
        </div>
      </section>
    </div>
  );
}
