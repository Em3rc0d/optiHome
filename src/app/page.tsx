import type { Metadata } from "next";
import {
  CommercialHero,
  CommercialFrames,
  EditorialStory,
  OpticalCare,
  CommercialProcess,
  CommercialFaq,
  CommercialClosing,
} from "@/components/home/CommercialHome";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <CommercialHero />
      <CommercialFrames />
      <EditorialStory />
      <OpticalCare />
      <CommercialProcess />
      <CommercialFaq />
      <CommercialClosing />
    </>
  );
}
