import { Nav } from "@/components/layout/Nav";
import { HeroSection } from "@/components/sections/HeroSection";
import { VideoParallax } from "@/components/ui/VideoParallax";
import { AboutSection } from "@/components/sections/AboutSection";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <VideoParallax />
        <AboutSection />
      </main>
    </>
  );
}
