'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Bot, Code2, ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 pb-24">
      <div className="w-full max-w-4xl space-y-8">
        <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Pelajari lebih lanjut tentang Ditss, developer di balik Asuma, dan mengenal lebih dalam tentang Asuma Bot.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link href="/about/ditss">
              <div className="group border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/50 transition-all rounded-2xl p-8 cursor-pointer h-full flex flex-col">
                <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center mb-6">
                  <Code2 className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold mb-3 flex items-center">
                  Tentang Ditss
                </h2>
                <p className="text-zinc-400 mb-6 flex-1">
                  Pengembang di balik Asuma. Fokus pada pengembangan aplikasi web modern, backend API, dan WhatsApp bot.
                </p>
                <div className="flex items-center text-blue-500 font-medium group-hover:translate-x-2 transition-transform">
                  Baca selengkapnya <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/about/asuma">
              <div className="group border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/50 transition-all rounded-2xl p-8 cursor-pointer h-full flex flex-col">
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center mb-6">
                  <Bot className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold mb-3 flex items-center">
                  Mengenal Asuma
                </h2>
                <p className="text-zinc-400 mb-6 flex-1">
                  Bot WhatsApp multifungsi yang dirancang untuk membantu pengelolaan grup, hiburan, dan otomatisasi sehari-hari.
                </p>
                <div className="flex items-center text-emerald-500 font-medium group-hover:translate-x-2 transition-transform">
                  Baca selengkapnya <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
