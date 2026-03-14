"use client";

import { usePathname } from "next/navigation";

export default function LayoutMain({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return <main className={"w-full mx-auto pb-24 md:pb-0"}>{children}</main>;
}
