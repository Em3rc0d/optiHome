import { Hero } from "@/components/home/Hero";
import { OpticalStory } from "@/components/home/OpticalStory";
import { JourneyChooser } from "@/components/home/JourneyChooser";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeaturedFrames } from "@/components/home/FeaturedFrames";
import { TryOnFeature } from "@/components/home/TryOnFeature";
import { TrustFaq } from "@/components/home/TrustFaq";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <OpticalStory />
      <JourneyChooser />
      <HowItWorks />
      <FeaturedFrames />
      <TryOnFeature />
      <TrustFaq />
      <FinalCta />
    </>
  );
}
