// app/layout.tsx
import type { Metadata } from "next";
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
  keywords: ['whatsapp bot', 'automation', 'downloader', 'jadibot'],
  authors: [{ name: 'Aditia Nugraha Putra' }],
  creator: 'Aditia Nugraha Putra',
  publisher: 'Ditss Store',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://asuma.my.id'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icons/favicon.ico',
    shortcut: '/icons/favicon-16x16.png',
    apple: '/icons/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://asuma.my.id',
    title: 'Asuma - Premium WhatsApp Bot Service',
    description: 'WhatsApp automation solution with assistant bot, social media downloader, and cloning features',
    siteName: 'Asuma Bot',
    images: [
      {
        url: 'https://asuma.my.id/icons/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'Asuma Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asuma - Premium WhatsApp Bot Service',
    description: 'WhatsApp automation solution with assistant bot, social media downloader, and cloning features',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
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
}
