import { ContactSection } from "./components/ContactSection";
import { HeroSection } from "./components/HeroSection";
import { NewsSection } from "./components/NewsSection";
import { PlatformSection } from "./components/PlatformSection";
import { RoadmapSection } from "./components/RoadmapSection";
import { SiteFooter } from "./components/SiteFooter";
import { SolutionsSection } from "./components/SolutionsSection";
import { useCmsSiteContent } from "./cms/useCmsSiteContent";

export function App() {
  const cms = useCmsSiteContent();

  return (
    <div id="top">
      <main>
        <HeroSection />
        <PlatformSection />
        <SolutionsSection />
        <RoadmapSection state={cms} />
        <NewsSection state={cms} />
        <ContactSection />
        <SiteFooter />
      </main>
    </div>
  );
}
