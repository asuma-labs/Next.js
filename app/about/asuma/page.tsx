'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, Bot, Zap, PenTool, Users, Gamepad2, Settings, MessageCircle, HeartHandshake, ChevronLeft } from 'lucide-react';

export default function AboutAsumaPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
          <Link href="/about" className="inline-flex items-center text-zinc-650 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors mb-8 mt-8 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to About
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-500/20 shadow-xs">
              <Bot className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-300 dark:to-teal-300 bg-clip-text text-transparent">Mengenal Asuma</h1>
              <p className="text-zinc-650 dark:text-zinc-400 text-lg font-medium">WhatsApp Asisten Digital</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-lg">
            <p className="mb-6">
              <strong>Asuma</strong> adalah bot WhatsApp multifungsi yang dikembangkan untuk menghadirkan berbagai fitur otomatisasi dan utilitas langsung di dalam WhatsApp tanpa memerlukan aplikasi tambahan.
            </p>
            
            <p className="mb-6 text-zinc-550 dark:text-zinc-400">
              Pengguna dapat memanfaatkan Asuma untuk berbagai kebutuhan, seperti:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-white/60 dark:bg-zinc-900/40 border border-zinc-250 dark:border-zinc-800/85 p-5 rounded-2xl flex gap-4 backdrop-blur-xs shadow-xs">
                <Zap className="w-6 h-6 text-amber-500 shrink-0" />
                <p className="text-sm text-zinc-650 dark:text-zinc-300">Respons otomatis yang cepat terhadap berbagai perintah.</p>
              </div>
              <div className="bg-white/60 dark:bg-zinc-900/40 border border-zinc-250 dark:border-zinc-800/85 p-5 rounded-2xl flex gap-4 backdrop-blur-xs shadow-xs">
                <PenTool className="w-6 h-6 text-blue-550 dark:text-blue-400 shrink-0" />
                <p className="text-sm text-zinc-650 dark:text-zinc-300">Fitur utilitas seperti pembuatan stiker, downloader media, pencarian informasi, dan alat bantu lainnya.</p>
              </div>
              <div className="bg-white/60 dark:bg-zinc-900/40 border border-zinc-250 dark:border-zinc-800/85 p-5 rounded-2xl flex gap-4 backdrop-blur-xs shadow-xs">
                <Users className="w-6 h-6 text-purple-550 dark:text-purple-400 shrink-0" />
                <p className="text-sm text-zinc-650 dark:text-zinc-300">Manajemen grup dengan fitur anti-spam dan moderasi.</p>
              </div>
              <div className="bg-white/60 dark:bg-zinc-900/40 border border-zinc-250 dark:border-zinc-800/85 p-5 rounded-2xl flex gap-4 backdrop-blur-xs shadow-xs">
                <Gamepad2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <p className="text-sm text-zinc-650 dark:text-zinc-300">Beragam permainan interaktif seperti RPG, Tebak Kata, dan game seru lainnya.</p>
              </div>
              <div className="bg-white/60 dark:bg-zinc-900/40 border border-zinc-250 dark:border-zinc-800/85 p-5 rounded-2xl flex gap-4 backdrop-blur-xs shadow-xs sm:col-span-2">
                <Settings className="w-6 h-6 text-zinc-500 dark:text-zinc-400 shrink-0" />
                <p className="text-sm text-zinc-650 dark:text-zinc-300">Otomatisasi tugas sehari-hari agar penggunaan WhatsApp menjadi lebih praktis.</p>
              </div>
            </div>

            <p className="mb-10 text-zinc-550 dark:text-zinc-400 italic">
              Asuma terus dikembangkan dengan fitur-fitur baru agar dapat menjadi asisten digital yang bermanfaat bagi seluruh pengguna.
            </p>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-zinc-905 dark:text-white">Visi</h2>
              <div className="border-l-2 border-emerald-550 dark:border-emerald-400 pl-5 space-y-4 text-zinc-650 dark:text-zinc-300">
                <p>Tujuan utama pengembangan Asuma bukan hanya menciptakan sebuah bot, tetapi menghadirkan solusi yang benar-benar membantu aktivitas digital sehari-hari.</p>
                <p>Teknologi yang baik adalah teknologi yang mudah digunakan, memberikan manfaat nyata, dan dapat diakses oleh siapa saja.</p>
                <p>Melalui Asuma, saya berharap dapat memberikan pengalaman yang lebih produktif, efisien, dan menyenangkan bagi para pengguna WhatsApp.</p>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-zinc-900/45 border border-zinc-250 dark:border-zinc-800/80 rounded-3xl p-8 mb-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 text-zinc-905 dark:text-white text-center">Mari Terhubung</h2>
              
              <div className="space-y-4 max-w-sm mx-auto">
                <a 
                  href="https://wa.me/123" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-emerald-500/10 hover:bg-emerald-500/15 text-emerald-650 dark:text-emerald-400 border border-emerald-500/20 dark:border-emerald-500/30 rounded-xl transition-colors w-full font-medium shadow-xs"
                >
                  <span className="flex items-center"><MessageCircle className="w-5 h-5 mr-3" /> Coba Asuma</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a 
                  href="https://wa.me/321" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-blue-500/10 hover:bg-blue-500/15 text-blue-650 dark:text-blue-400 border border-blue-500/20 dark:border-blue-500/30 rounded-xl transition-colors w-full font-medium shadow-xs"
                >
                  <span className="flex items-center"><HeartHandshake className="w-5 h-5 mr-3" /> Kolaborasi & Saran</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </motion.div>

          <motion.div variants={itemVariants} className="pt-8 mt-8 border-t border-zinc-200 dark:border-zinc-800">
            <Link href="/about/ditss" className="inline-flex items-center justify-between w-full p-5 rounded-2xl bg-white/70 dark:bg-zinc-900/40 border border-zinc-250 dark:border-zinc-800/80 hover:bg-white dark:hover:bg-zinc-900/60 hover:hover:border-zinc-350 dark:hover:border-zinc-755 transition-colors shadow-sm">
              <ChevronLeft className="w-5 h-5 text-zinc-500" />
              <div className="text-right">
                <p className="text-sm text-zinc-550 dark:text-zinc-400 mb-1 font-medium">Sebelumnya</p>
                <p className="font-bold text-zinc-905 dark:text-white text-lg">Tentang Ditss</p>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function ArrowRight(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
}
