// src/components/layout/Navbar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Home, Camera, BookOpen, Fish } from "lucide-react";
import { cn } from "@/lib/utils";

/* Shared navigation items */
const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/fish-for-real", label: "Scan", icon: Camera },
  { href: "/learn", label: "Collections", icon: BookOpen },
  { href: "/aquarium", label: "Aquarium", icon: Fish },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Navbar */}
      <header className="sticky top-0 z-50 hidden border-b border-sky-100 bg-white/90 backdrop-blur-md md:block supports-[backdrop-filter]:bg-white/80">
        <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 rounded-full px-2 py-1 transition-transform duration-200 hover:scale-[1.01]"
          >
            <div className="relative h-11 w-11 overflow-hidden rounded-full bg-sky-50 ring-1 ring-sky-100">
              <Image
                src="/images/logo.png"
                alt="Fishpedia logo"
                fill
                className="object-cover"
                sizes="44px"
                priority
              />
            </div>

            <div className="flex flex-col leading-none">
              <span className="text-lg font-extrabold tracking-tight text-sky-700">
                Fishpedia
              </span>
              <span className="hidden text-xs font-medium text-slate-500 sm:block">
                Learn • Play • Explore
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-2">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;

              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? " text-sky-700"
                      : "text-slate-600 hover:bg-sky-50 hover:text-sky-700",
                  )}
                >
                  <Icon
                    size={18}
                    className={cn(
                      "transition-transform duration-200",
                      isActive ? "scale-105" : "group-hover:scale-105",
                    )}
                  />
                  <span>{label}</span>

                  {isActive && (
                    <span className="absolute inset-x-4 -bottom-1 h-0.5 rounded-full bg-sky-500" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Mobile Bottom Tab Bar */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-sky-100 bg-white/90 backdrop-blur-xl md:hidden supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto max-w-md px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
          <div className="grid grid-cols-4 gap-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;

              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex min-h-[64px] flex-col items-center justify-center rounded-2xl px-1 py-2 text-xs font-medium transition-all duration-200",
                    isActive
                      ? "text-sky-700"
                      : "text-slate-500 hover:text-sky-600 active:scale-95",
                  )}
                >
                  <div
                    className={cn(
                      "mb-1 flex h-10 w-10 items-center justify-center rounded-xl transition-all",
                      isActive ? "bg-sky-100 shadow-sm" : "",
                    )}
                  >
                    <Icon size={20} />
                  </div>

                  <span className="truncate">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
