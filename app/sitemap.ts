import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://asuma.my.id";

  const routes = [
    // --- UTAMA ---
    { url: "", changeFrequency: "daily", priority: 1.0 },
    { url: "/status", changeFrequency: "daily", priority: 0.8 },
    { url: "/info", changeFrequency: "weekly", priority: 0.7 },

    // --- BISNIS & STORE ---
    { url: "/shop", changeFrequency: "daily", priority: 0.9 },
    { url: "/pricing", changeFrequency: "weekly", priority: 0.9 }, // Tambahan: Untuk paket sewa bot

    // --- EDUKASI & KONTEN ---
    { url: "/blog", changeFrequency: "weekly", priority: 0.8 },
    { url: "/artikel", changeFrequency: "weekly", priority: 0.8 },
    { url: "/docs", changeFrequency: "weekly", priority: 0.8 },    // Tambahan: Panduan / Fitur Bot
    { url: "/faq", changeFrequency: "monthly", priority: 0.6 },     // Tambahan: Tanya Jawab

    // --- TENTANG & KONTAK ---
    { url: "/about", changeFrequency: "monthly", priority: 0.7 },
    { url: "/about/asuma", changeFrequency: "monthly", priority: 0.7 },
    { url: "/about/ditss", changeFrequency: "monthly", priority: 0.6 },
    { url: "/contact", changeFrequency: "monthly", priority: 0.5 },

    // --- OPEN SOURCE ---
    { url: "/open-souce", changeFrequency: "weekly", priority: 0.7 },
    { url: "/open-souce/scriptbot", changeFrequency: "weekly", priority: 0.7 },

    // --- LEGALITAS (Penting untuk SEO & Google Adsense) ---
    { url: "/privacy", changeFrequency: "monthly", priority: 0.3 },
    { url: "/terms", changeFrequency: "monthly", priority: 0.3 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency as "daily" | "weekly" | "monthly",
    priority: route.priority,
  }));
}
