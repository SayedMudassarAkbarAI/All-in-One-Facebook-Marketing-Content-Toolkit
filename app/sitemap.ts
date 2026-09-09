import { MetadataRoute } from "next";
import { TOOLS } from "@/data/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://facebook-toolkit.vercel.app";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/data-deletion`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Map all tools from tools registry
  const toolRoutes: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${baseUrl}/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: tool.isPopular ? 0.9 : 0.8,
  }));

  return [...staticRoutes, ...toolRoutes];
}
