import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  metadataBase: new URL("https://asuma.my.id"),
  title: {
    default: "Asuma Bot - Smart WhatsApp Automation",
    template: "%s | Asuma Bot",
  },
  description:
    "Asuma adalah bot WhatsApp multifungsi — AI assistant, manajemen grup, downloader media, RPG & games, dan lebih dari 100 perintah siap pakai.",
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
    description:
      "Bot WhatsApp multifungsi dengan AI assistant, downloader media, manajemen grup, dan 100+ perintah.",
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
  manifest: "/site.webmanifest",
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#060D1F] text-white transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Navigation />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}


/*import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navigation } from "@/components/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Asuma - Premium WhatsApp Bot Service",
  description: "WhatsApp automation solution with assistant bot, social media downloader, and cloning features",
  keywords: ["whatsapp bot", "automation", "downloader", "jadibot", "asuma bot", "ditss store"],
  authors: [{ name: "ditss" }],
  creator: "ditss",
  publisher: "ditss",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://asuma.my.id"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icons/favicon.ico",
    shortcut: "/icons/favicon-16x16.png",
    apple: "/icons/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://asuma.my.id",
    title: "Asuma - Premium WhatsApp Bot Service",
    description: "WhatsApp automation solution with assistant bot, social media downloader, and cloning features",
    siteName: "Asuma Bot",
    images: [
      {
        url: "https://asuma.my.id/icons/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Asuma Logo",
          },
        ],
      },
  twitter: {
    card: "summary_large_image",
    title: "Asuma - Premium WhatsApp Bot Service",
    description: "WhatsApp automation solution with assistant bot, social media downloader, and cloning features",
  },
  verification: {
    google: "GANTI_DENGAN_KODE_VERIFIKASI_GOOGLE_KAMU",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          <main className="flex-grow pt-16 bg-background">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}*/
