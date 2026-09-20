import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/products`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
