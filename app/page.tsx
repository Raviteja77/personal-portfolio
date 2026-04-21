import { Nav } from "@/components/layout/Nav";
import { HeroSection } from "@/components/sections/HeroSection";
import { VideoParallax } from "@/components/ui/VideoParallax";
import { AboutSection } from "@/components/sections/AboutSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { SkillsSection } from "@/components/sections/SkillsSection";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <VideoParallax />
        <AboutSection />
        <WorkSection />
        <SkillsSection />
      </main>
    </>
  );
}
