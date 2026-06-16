// app/contact/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Asuma Bot",
  description: "Hubungi tim Asuma Bot untuk pertanyaan, saran, atau laporan masalah. Kami siap membantu Anda.",
  openGraph: {
    title: "Contact - Asuma Bot",
    description: "Hubungi tim Asuma Bot untuk pertanyaan, saran, atau laporan masalah.",
    url: "https://asuma.my.id/contact",
  },
  alternates: {
    canonical: "https://asuma.my.id/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
