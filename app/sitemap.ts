import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.asuma.my.id";

  const routes = [
    { url: "", changeFrequency: "daily", priority: 1.0 },
    { url: "/status", changeFrequency: "daily", priority: 0.8 },
    { url: "/info", changeFrequency: "weekly", priority: 0.7 },
    { url: "/shop", changeFrequency: "daily", priority: 0.9 },
    { url: "/pricing", changeFrequency: "weekly", priority: 0.9 },
    { url: "/blog", changeFrequency: "weekly", priority: 0.8 },
    { url: "/artikel", changeFrequency: "weekly", priority: 0.8 },
    { url: "/docs", changeFrequency: "weekly", priority: 0.8 },
    { url: "/faq", changeFrequency: "monthly", priority: 0.6 },
    { url: "/about", changeFrequency: "monthly", priority: 0.7 },
    { url: "/about/asuma", changeFrequency: "monthly", priority: 0.7 },
    { url: "/about/ditss", changeFrequency: "monthly", priority: 0.6 },
    { url: "/contact", changeFrequency: "monthly", priority: 0.5 },
    { url: "/open-source", changeFrequency: "weekly", priority: 0.7 },
    { url: "/open-source/scriptbot", changeFrequency: "weekly", priority: 0.7 },
    { url: "/privacy", changeFrequency: "monthly", priority: 0.3 },
    { url: "/terms", changeFrequency: "monthly", priority: 0.3 },
  ] as const;

  return routes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
