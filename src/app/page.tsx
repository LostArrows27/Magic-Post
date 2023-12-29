"use client";

import HeroSection from "@/components/landing-page/hero-section";
import NavigationMenuBar from "@/components/landing-page/navigation-menu";
import { ParcelTrackSection } from "@/components/landing-page/parcel-track-section";
import Count from "@/components/sub-section/Count";
import ServiceSection from "@/components/sub-section/ServiceSection";
import { ThemeProvider } from "@/components/theme-provider/ThemeProvider";

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="flex min-h-screen flex-col items-center p-4">
        <div className="z-10 w-full items-center justify-between text-sm lg:flex px-4 py-2">
          <div className="flex items-stretch gap-0">
            <span className="text-primary text-4xl font-semibold grow whitespace-nowrap self-start">
              Magic Post
            </span>
          </div>
          <NavigationMenuBar />
        </div>
        <HeroSection />
        <ServiceSection />
        <Count />
        <ParcelTrackSection />
      </main>
    </ThemeProvider>
  );
}
