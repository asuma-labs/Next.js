// app/status/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Status - Asuma Bot",
  description: "Cek status layanan Asuma Bot secara real-time. Pantau uptime, performa, dan ketersediaan bot WhatsApp.",
  openGraph: {
    title: "Status - Asuma Bot",
    description: "Cek status layanan Asuma Bot secara real-time. Pantau uptime, performa, dan ketersediaan bot WhatsApp.",
    url: "https://asuma.my.id/status",
  },
  alternates: {
    canonical: "https://asuma.my.id/status",
  },
};

export default function StatusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
