"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function LayoutMain({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <main className={cn("w-full mx-auto pb-24", isHome ? "py-0" : "py-12")}>
      {children}
    </main>
  );
}
