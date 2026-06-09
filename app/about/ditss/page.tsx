'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, User, ChevronRight } from 'lucide-react';

export default function AboutDitssPage() {
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
          className="space-y-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Tentang Ditss</h1>
              <p className="text-zinc-400 text-lg">Developer Asuma</p>
            </div>
          </div>

          <div className="prose prose-invert prose-zinc max-w-none">
            <div className="space-y-6 text-zinc-300 leading-relaxed text-lg">
              <p>
                Halo! Saya <strong>Ditss (Aditia)</strong>, seorang developer yang memiliki passion dalam membangun solusi digital yang praktis, efisien, dan bermanfaat bagi banyak orang.
              </p>
              
              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <p className="m-0">
                  Saya berfokus pada pengembangan WhatsApp Bot, backend API, dan aplikasi web modern menggunakan teknologi seperti Node.js, Next.js, dan berbagai teknologi JavaScript lainnya.
                </p>
              </div>

              <p>
                Saya adalah pengembang di balik <strong>Asuma</strong>, sebuah bot WhatsApp yang dirancang untuk membantu pengguna dalam mengelola grup, mencari informasi dengan cepat, mengotomatisasi berbagai aktivitas, hingga menyediakan hiburan melalui fitur-fitur interaktif.
              </p>

              <blockquote className="border-l-4 border-blue-500 pl-4 py-2 italic text-zinc-400">
                "Saya percaya bahwa teknologi seharusnya mampu mempermudah pekerjaan sehari-hari dan memberikan pengalaman yang nyaman bagi penggunanya."
              </blockquote>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-zinc-800">
            <Link href="/about/asuma" className="inline-flex items-center justify-between w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors">
              <div>
                <p className="text-sm text-zinc-400 mb-1">Selanjutnya</p>
                <p className="font-semibold text-white">Mengenal Asuma</p>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-400" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
