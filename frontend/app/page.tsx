import { HeroSection, HeroSectionProps } from "@/components/custom/hero-section";
import { FeaturesSection, FeaturesSectionProps } from "@/components/custom/features-section";
import { loaders } from "@/data/loader";
import { validateApiResponse } from "../lib/error-handler";

export type Blocks = HeroSectionProps | FeaturesSectionProps;

function blockRender(block: Blocks, index: number) {
  switch (block.__component) {
    case "layout.hero-section":
      return <HeroSection key={index} data={block as HeroSectionProps} />
    case "layout.features-section":
      return <FeaturesSection key={index} data={block as FeaturesSectionProps} />
  }
}

export default async function Home() {
  const homePageData = await loaders.getHomePageData()
  const data = validateApiResponse(homePageData, "home page")
  const { blocks } = data;

  return (
    <main className="">
      {blocks.map((block, index) => blockRender(block, index))}
    </main>
  );
}
