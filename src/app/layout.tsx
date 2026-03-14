import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import LayoutMain from "@/components/layout/LayoutMain";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fishpedia - Learn Fishing Fun!",
  description:
    "A gamified educational web app that teaches children about fishing in a fun and interactive way.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-linear-to-b from-blue-50 to-green-50 min-h-screen`}
      >
        <Navbar />
        <LayoutMain>{children}</LayoutMain>
      </body>
    </html>
  );
}
