import { ContactSection } from "./components/ContactSection";
import { HeroSection } from "./components/HeroSection";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { NewsSection } from "./components/NewsSection";
import { PlatformSection } from "./components/PlatformSection";
import { RoadmapSection } from "./components/RoadmapSection";
import { SiteFooter } from "./components/SiteFooter";
import { SolutionsSection } from "./components/SolutionsSection";
import { useFeaturedNews } from "./cms/news/useFeaturedNews";
import { useRoadmapContent } from "./cms/roadmap/useRoadmapContent";
import styles from "./styles/TdsPage.module.css";

export function App() {
  const roadmap = useRoadmapContent();
  const featuredNews = useFeaturedNews();

  return (
    <div className={styles.pageShell} id="top">
      <div className={styles.languageSwitcherPosition}>
        <LanguageSwitcher />
      </div>
      <main>
        <HeroSection />
        <PlatformSection />
        <SolutionsSection />
        <RoadmapSection state={roadmap} />
        <NewsSection state={featuredNews} />
        <ContactSection />
        <SiteFooter />
      </main>
    </div>
  );
}
