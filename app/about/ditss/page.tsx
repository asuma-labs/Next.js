'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, User, ChevronRight } from 'lucide-react';

export default function AboutDitssPage() {
  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-slate-100 to-indigo-50/50 dark:from-[#060D1F] dark:via-[#0A1628] dark:to-[#0D1B2E] text-zinc-900 dark:text-white transition-colors duration-300 p-6 pt-24 pb-24 flex justify-center relative overflow-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl opacity-75 dark:opacity-100" />
        <div className="absolute bottom-0 right-1/4 w-96 h-64 rounded-full bg-indigo-500/10 blur-3xl opacity-75 dark:opacity-100" />
      </div>

      <div className="w-full max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/about" className="inline-flex items-center text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors mb-8 mt-8 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to About
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 text-blue-650 dark:text-blue-450 rounded-2xl flex items-center justify-center border border-blue-500/20 shadow-xs">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-650 to-indigo-650 dark:from-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">Tentang Ditss</h1>
              <p className="text-zinc-650 dark:text-zinc-400 text-lg font-medium">Developer Asuma</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="prose prose-zinc dark:prose-invert max-w-none">
            <div className="space-y-6 text-zinc-700 dark:text-zinc-300 leading-relaxed text-lg">
              <p>
                Halo! Saya <strong>Ditss (Aditia)</strong>, seorang developer yang memiliki passion dalam membangun solusi digital yang praktis, efisien, dan bermanfaat bagi banyak orang.
              </p>
              
              <div className="p-6 rounded-3xl bg-white/60 dark:bg-zinc-900/40 border border-zinc-250 dark:border-zinc-800/80 backdrop-blur-sm shadow-sm">
                <p className="m-0">
                  Saya berfokus pada pengembangan WhatsApp Bot, backend API, dan aplikasi web modern menggunakan teknologi seperti Node.js, Next.js, dan berbagai teknologi JavaScript lainnya.
                </p>
              </div>

              <p>
                Saya adalah pengembang di balik <strong>Asuma</strong>, sebuah bot WhatsApp yang dirancang untuk membantu pengguna dalam mengelola grup, mencari informasi dengan cepat, mengotomatisasi berbagai aktivitas, hingga menyediakan hiburan melalui fitur-fitur interaktif.
              </p>

              <blockquote className="border-l-4 border-blue-550 dark:border-blue-400 pl-4 py-2 italic text-zinc-550 dark:text-zinc-400">
                &quot;Saya percaya bahwa teknologi seharusnya mampu mempermudah pekerjaan sehari-hari dan memberikan pengalaman yang nyaman bagi penggunanya.&quot;
              </blockquote>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-8 mt-8 border-t border-zinc-200 dark:border-zinc-800">
            <Link href="/about/asuma" className="inline-flex items-center justify-between w-full p-5 rounded-2xl bg-white/70 dark:bg-zinc-900/40 border border-zinc-250 dark:border-zinc-800/80 hover:bg-white dark:hover:bg-zinc-900/60 transition-colors shadow-sm">
              <div>
                <p className="text-sm text-zinc-550 dark:text-zinc-400 mb-1 font-medium">Selanjutnya</p>
                <p className="font-bold text-zinc-905 dark:text-white text-lg">Mengenal Asuma</p>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-500" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
