import { HeroDesc } from "../_components/home/hero-desc";
import { HeroSection } from "../_components/home/hero-section";
import { RecentCourse } from "../_components/home/recent-course";

export default function Home() {
  return (
    <main className="">
      <HeroDesc />
      <HeroSection />
      <RecentCourse />
    </main>
  );
}
