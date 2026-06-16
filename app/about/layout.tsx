// app/about/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Asuma Bot",
  description: "Pelajari lebih lanjut tentang Asuma Bot, developer Ditss, dan fitur-fitur yang tersedia.",
  openGraph: {
    title: "About - Asuma Bot",
    description: "Pelajari lebih lanjut tentang Asuma Bot, developer Ditss, dan fitur-fitur yang tersedia.",
    url: "https://asuma.my.id/about",
  },
  alternates: {
    canonical: "https://asuma.my.id/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
