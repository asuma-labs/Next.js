// app/about/page.tsx
import type { Metadata } from "next";
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Bot, Code2, ArrowLeft } from 'lucide-react';

// ✅ METADATA KHUSUS ABOUT
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

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-slate-100 to-indigo-50/50 dark:from-[#060D1F] dark:via-[#0A1628] dark:to-[#0D1B2E] text-zinc-900 dark:text-white transition-colors duration-300 flex flex-col items-center justify-center p-6 pt-24 pb-24 relative overflow-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl opacity-75 dark:opacity-100" />
        <div className="absolute bottom-0 right-1/4 w-96 h-64 rounded-full bg-indigo-500/10 blur-3xl opacity-75 dark:opacity-100" />
      </div>

      <div className="w-full max-w-4xl space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/" className="inline-flex items-center text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors font-medium">
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-650 via-indigo-650 to-sky-650 dark:from-cyan-300 dark:via-sky-200 dark:to-indigo-300 bg-clip-text text-transparent">
            About
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Pelajari lebih lanjut tentang Ditss, developer di balik Asuma, dan mengenal lebih dalam tentang Asuma Bot.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-6 mt-12"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <Link href="/about/ditss">
              <div className="group border border-zinc-250 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-sm hover:bg-white dark:hover:bg-zinc-900/60 hover:border-zinc-350 dark:hover:border-zinc-755 transition-all rounded-3xl p-8 cursor-pointer h-full flex flex-col shadow-sm">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
                  <Code2 className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold mb-3 text-zinc-905 dark:text-white flex items-center">
                  Tentang Ditss
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6 flex-1 leading-relaxed text-sm">
                  Pengembang di balik Asuma. Fokus pada pengembangan aplikasi web modern, backend API, dan WhatsApp bot.
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-2 transition-transform">
                  Baca selengkapnya <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <Link href="/about/asuma">
              <div className="group border border-zinc-250 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-sm hover:bg-white dark:hover:bg-zinc-900/60 hover:border-zinc-350 dark:hover:border-zinc-755 transition-all rounded-3xl p-8 cursor-pointer h-full flex flex-col shadow-sm">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20">
                  <Bot className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold mb-3 text-zinc-905 dark:text-white flex items-center">
                  Mengenal Asuma
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6 flex-1 leading-relaxed text-sm">
                  Bot WhatsApp multifungsi yang dirancang untuk membantu pengelolaan grup, hiburan, dan otomatisasi sehari-hari.
                </p>
                <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-semibold group-hover:translate-x-2 transition-transform">
                  Baca selengkapnya <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
