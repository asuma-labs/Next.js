import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0f172a" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://asuma.my.id"),
  title: {
    default: "Asuma Bot - Smart WhatsApp Automation",
    template: "%s | Asuma Bot",
  },
  description: "Asuma adalah bot WhatsApp multifungsi — AI assistant, manajemen grup, downloader media, RPG & games, dan lebih dari 100 perintah siap pakai.",
  keywords: [
    "asuma bot",
    "whatsapp bot",
    "bot wa",
    "whatsapp automation",
    "bot whatsapp indonesia",
    "asuma.my.id",
    "ai assistant whatsapp",
    "group management bot",
  ],
  authors: [{ name: "Ditss", url: "https://asuma.my.id/about/ditss" }],
  creator: "Ditss",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://asuma.my.id",
    siteName: "Asuma Bot",
    title: "Asuma Bot - Smart WhatsApp Automation",
    description: "Bot WhatsApp multifungsi dengan AI assistant, downloader media, manajemen grup, dan 100+ perintah.",
    images: [
      {
        url: "/icons/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Asuma Bot",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Asuma Bot - Smart WhatsApp Automation",
    description: "Bot WhatsApp multifungsi dengan 100+ perintah. Gratis, cepat, dan selalu online.",
    images: ["/icons/android-chrome-512x512.png"],
  },
  verification: {
    google: "hMmtzBFUiEDI1-fsDioUzB0VgKiARhdFCaAwKIBmEJw",
  },
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/favicon.ico", sizes: "any" },
      { url: "/icons/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome-192x192", url: "/icons/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/icons/android-chrome-512x512.png" },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Asuma Bot",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://asuma.my.id",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
