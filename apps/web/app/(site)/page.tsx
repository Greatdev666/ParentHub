import { getHomepageData } from "@/lib/sanity/queries";
import { HeroSection } from "@/components/home/HeroSection";
import { LatestSection } from "@/components/home/LatestSection";
import { FeaturedPost } from "@/components/home/FeaturedPost";
import { FeaturedTopicsCarousel } from "@/components/home/FeaturedTopicsCarousel";
import { ExploreTopics } from "@/components/home/ExploreTopics";
import { CategorySection } from "@/components/home/CategorySection";
import { TeamSection } from "@/components/home/TeamSection";

export default async function HomePage() {
  const { latest, featuredPost, featuredTopics, categories, team } = await getHomepageData();

  return (
    <>
      <HeroSection />

      <div id="latest">
        <LatestSection latest={latest} />
      </div>

      <FeaturedPost article={featuredPost} />

      <ExploreTopics categories={categories} />

      <FeaturedTopicsCarousel articles={featuredTopics} />

      {categories?.map((cat: any) => (
        <CategorySection key={cat.title} category={cat} />
      ))}

      <TeamSection team={team} />
    </>
  );
}
