// app/about/ditss/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Ditss - Asuma Bot",
  description: "Ditss adalah developer di balik Asuma Bot. Fokus pada Next.js, Node.js, dan WhatsApp Bot development.",
  openGraph: {
    title: "Tentang Ditss - Asuma Bot",
    description: "Ditss (Aditia) adalah developer di balik Asuma Bot. Fokus pada Next.js, Node.js, dan WhatsApp Bot development.",
    url: "https://asuma.my.id/about/ditss",
  },
  alternates: {
    canonical: "https://asuma.my.id/about/ditss",
  },
};

export default function AboutDitssLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
