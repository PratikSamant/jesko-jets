"use client";
import { useLenis } from "@/hooks/useLenis";
import Navbar from "@/components/Navbar";
import HeroScroll from "@/components/HeroScroll";
import ManifestoSection from "@/components/ManifestoSection";
import PlaneMorph from "@/components/PlaneMorph";
import FleetSection from "@/components/FleetSection";
import StatsBar from "@/components/StatsBar";
import Globe from "@/components/Globe";
import Footer from "@/components/Footer";

export default function Home() {
  useLenis(); // Initialize smooth scroll

  return (
    <main>
      <Navbar />
      <HeroScroll />
      <ManifestoSection />
      <PlaneMorph />
      <FleetSection />
      <StatsBar />
      <Globe />
      <Footer />
    </main>
  );
}
