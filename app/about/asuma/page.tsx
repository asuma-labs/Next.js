'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, Bot, Zap, PenTool, Users, Gamepad2, Settings, MessageCircle, HeartHandshake, ChevronLeft } from 'lucide-react';

export default function AboutAsumaPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24 flex justify-center">
      <div className="w-full max-w-3xl">
        <Link href="/about" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors mb-8 mt-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to About
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center shrink-0">
              <Bot className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Mengenal Asuma</h1>
              <p className="text-zinc-400 text-lg">WhatsApp Asisten Digital</p>
            </div>
          </div>

          <div className="text-zinc-300 leading-relaxed text-lg">
            <p className="mb-6">
              <strong>Asuma</strong> adalah bot WhatsApp multifungsi yang dikembangkan untuk menghadirkan berbagai fitur otomatisasi dan utilitas langsung di dalam WhatsApp tanpa memerlukan aplikasi tambahan.
            </p>
            
            <p className="mb-6 text-zinc-400">
              Pengguna dapat memanfaatkan Asuma untuk berbagai kebutuhan, seperti:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-2xl flex gap-4">
                <Zap className="w-6 h-6 text-yellow-500 shrink-0" />
                <p className="text-sm text-zinc-300">Respons otomatis yang cepat terhadap berbagai perintah.</p>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-2xl flex gap-4">
                <PenTool className="w-6 h-6 text-blue-500 shrink-0" />
                <p className="text-sm text-zinc-300">Fitur utilitas seperti pembuatan stiker, downloader media, pencarian informasi, dan alat bantu lainnya.</p>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-2xl flex gap-4">
                <Users className="w-6 h-6 text-purple-500 shrink-0" />
                <p className="text-sm text-zinc-300">Manajemen grup dengan fitur anti-spam dan moderasi.</p>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-2xl flex gap-4">
                <Gamepad2 className="w-6 h-6 text-emerald-500 shrink-0" />
                <p className="text-sm text-zinc-300">Beragam permainan interaktif seperti RPG, Tebak Kata, dan game seru lainnya.</p>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-2xl flex gap-4 sm:col-span-2">
                <Settings className="w-6 h-6 text-zinc-400 shrink-0" />
                <p className="text-sm text-zinc-300">Otomatisasi tugas sehari-hari agar penggunaan WhatsApp menjadi lebih praktis.</p>
              </div>
            </div>

            <p className="mb-10 text-zinc-400 italic">
              Asuma terus dikembangkan dengan fitur-fitur baru agar dapat menjadi asisten digital yang bermanfaat bagi seluruh pengguna.
            </p>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-white">Visi</h2>
              <div className="border-l-2 border-emerald-500 pl-5 space-y-4 text-zinc-300">
                <p>Tujuan utama pengembangan Asuma bukan hanya menciptakan sebuah bot, tetapi menghadirkan solusi yang benar-benar membantu aktivitas digital sehari-hari.</p>
                <p>Teknologi yang baik adalah teknologi yang mudah digunakan, memberikan manfaat nyata, dan dapat diakses oleh siapa saja.</p>
                <p>Melalui Asuma, saya berharap dapat memberikan pengalaman yang lebih produktif, efisien, dan menyenangkan bagi para pengguna WhatsApp.</p>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-white text-center">Mari Terhubung</h2>
              
              <div className="space-y-4 max-w-sm mx-auto">
                <a 
                  href="https://wa.me/123" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 rounded-xl transition-colors w-full"
                >
                  <span className="flex items-center font-medium"><MessageCircle className="w-5 h-5 mr-3" /> Coba Asuma</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a 
                  href="https://wa.me/321" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border border-blue-500/20 rounded-xl transition-colors w-full"
                >
                  <span className="flex items-center font-medium"><HeartHandshake className="w-5 h-5 mr-3" /> Kolaborasi & Saran</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          <div className="pt-8 mt-8 border-t border-zinc-800">
            <Link href="/about/ditss" className="inline-flex items-center justify-between w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors">
              <ChevronLeft className="w-5 h-5 text-zinc-400" />
              <div className="text-right">
                <p className="text-sm text-zinc-400 mb-1">Sebelumnya</p>
                <p className="font-semibold text-white">Tentang Ditss</p>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ArrowRight(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
}
