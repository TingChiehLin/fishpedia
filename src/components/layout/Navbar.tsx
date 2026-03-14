// src/components/layout/Navbar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Brain, Users, Trophy, User, Map, Camera, Fish } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/fish-map", label: "Fish Map", icon: Map },
  { href: "/fish-for-real", label: "Fish for Real", icon: Camera },
  { href: "/aquarium", label: "Aquarium", icon: Fish },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/quiz", label: "Quiz", icon: Brain },
  { href: "/activities", label: "Activities", icon: Users },
  { href: "/progress", label: "Progress", icon: Trophy },
  { href: "/profile", label: "Profile", icon: User },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              🐟 Fishpedia
            </Link>
          </div>
          <div className="flex space-x-8">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === href
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-100",
                )}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
