'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Bot, Users, Gamepad2, Download, Search, Zap, CheckCircle2, Rocket, Code2, Globe, Shield, RefreshCw, HeartHandshake, Code } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-zinc-950 text-white selection:bg-zinc-800 selection:text-white">
      <main className="max-w-7xl mx-auto px-6 mt-20 md:mt-32">
        {/* Hero Section */}
        <section className="text-center flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-sm font-medium text-zinc-300 mb-8 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            🤖 WhatsApp Bot • Fast • Smart • Powerful
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-balance max-w-4xl leading-[1.1]"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Asuma Bot</span><br/>
            Smart WhatsApp Automation for Everyone.
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl text-balance"
          >
            Asuma adalah bot WhatsApp multifungsi yang membantu pengguna mengelola grup, mencari informasi, bermain game, mengunduh media, dan mengotomatisasi berbagai aktivitas langsung dari WhatsApp.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link href="https://wa.me/123" target="_blank" rel="noreferrer" className="h-14 px-8 rounded-full bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 group">
              Coba Sekarang 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/about" className="h-14 px-8 rounded-full bg-zinc-900/80 backdrop-blur-md text-white border border-zinc-800 font-medium hover:bg-zinc-800 transition-colors flex items-center justify-center">
              Tentang Asuma
            </Link>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="mt-32 md:mt-48 pb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Fitur Unggulan</h2>
            <p className="mt-4 text-zinc-400 text-lg">Semua yang Anda butuhkan untuk produktivitas & hiburan.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              delay={0}
              icon={<Bot className="w-6 h-6 text-emerald-400" />}
              title="AI Assistant"
              description="Integrasi AI cerdas untuk menjawab berbagai pertanyaan, memberikan solusi, dan mengobrol secara natural."
            />
            <FeatureCard 
              delay={0.1}
              icon={<Users className="w-6 h-6 text-cyan-400" />}
              title="Group Management"
              description="Kelola grup Anda dengan mudah: Anti-spam, auto-kick, welcome message, dan perintah moderasi lainnya."
            />
            <FeatureCard 
              delay={0.2}
              icon={<Gamepad2 className="w-6 h-6 text-purple-400" />}
              title="RPG & Games"
              description="Sistem RPG lengkap, tebak kata, trivia, dan berbagai mini-game seru untuk hiburan di dalam grup."
            />
            <FeatureCard 
              delay={0.3}
              icon={<Download className="w-6 h-6 text-pink-400" />}
              title="Media Downloader"
              description="Unduh video, audio, dan gambar dari berbagai platform sosial media langsung dari WhatsApp Anda."
            />
            <FeatureCard 
              delay={0.4}
              icon={<Search className="w-6 h-6 text-blue-400" />}
              title="Search Information"
              description="Pencarian cepat untuk lirik lagu, artikel wiki, berita terbaru, cuaca, dan informasi publik lainnya."
            />
             <FeatureCard 
              delay={0.5}
              icon={<Zap className="w-6 h-6 text-yellow-400" />}
              title="Fast Response"
              description="Server berkinerja tinggi memastikan ping yang rendah dan balasan instan untuk setiap perintah Anda."
            />
          </div>
        </section>

        {/* About Section (Created by Ditss) */}
        <section className="mt-20 md:mt-32 pb-20 pt-10">
          <div className="relative rounded-[3rem] overflow-hidden border border-zinc-800 bg-zinc-900/40 backdrop-blur-3xl p-10 md:p-20 shadow-2xl">
            <div className="absolute top-0 right-0 p-32 bg-emerald-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-0 left-0 p-32 bg-cyan-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
              <div className="w-20 h-20 rounded-3xl bg-zinc-800/80 flex items-center justify-center border border-zinc-700/50 shadow-xl">
                 <Code2 className="w-10 h-10 text-emerald-400" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Dibuat oleh Ditss</h2>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed">
                Asuma dikembangkan oleh Ditss (Aditia), seorang developer yang berfokus pada pengembangan WhatsApp Bot, backend API, dan aplikasi web modern. Tujuan Asuma adalah menghadirkan solusi otomatisasi yang mudah digunakan dan bermanfaat bagi semua pengguna.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/about/ditss" className="h-12 px-8 rounded-full border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700 text-white font-medium transition-colors flex items-center justify-center gap-2">
                  <HeartHandshake className="w-4 h-4" />
                  About Developer
                </Link>
                <Link href="/about/asuma" className="h-12 px-8 rounded-full border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700 text-white font-medium transition-colors flex items-center justify-center gap-2">
                  <Bot className="w-4 h-4" />
                  About Asuma
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Asuma */}
        <section className="mt-20 md:mt-32 pb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Kenapa Memilih Asuma?</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <WhyCard icon={<Zap />} title="Cepat dan Stabil" desc="Infrastruktur handal yang terus aktif 24/7." delay={0.1} />
            <WhyCard icon={<CheckCircle2 />} title="Banyak Fitur" desc="Dari utilitas sederhana hingga mini-game kompleks." delay={0.2} />
            <WhyCard icon={<RefreshCw />} title="Selalu Dikembangkan" desc="Pembaruan rutin dengan penambahan fitur-fitur baru." delay={0.3} />
            <WhyCard icon={<HeartHandshake />} title="Mudah Digunakan" desc="Antarmuka chat yang intuitif & petunjuk yang jelas." delay={0.4} />
            <WhyCard icon={<Shield />} title="Aman" desc="Privasi data Anda terjaga dan tidak disalahgunakan." delay={0.5} />
            <WhyCard icon={<Globe />} title="Gratis Digunakan" desc="Silakan nikmati sebagian besar fitur secara gratis." delay={0.6} />
          </div>
        </section>

        {/* Statistics Section */}
        <section className="mt-20 md:mt-32 pb-20">
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard value="100+" label="Commands" icon={<Code />} delay={0} />
              <StatCard value="24/7" label="Online" icon={<Globe />} delay={0.1} />
              <StatCard value="1000+" label="Users" icon={<Users />} delay={0.2} />
              <StatCard value="Active" label="Development" icon={<Rocket />} delay={0.3} />
           </div>
        </section>

        {/* CTA Section */}
        <section className="mt-20 md:mt-32 pb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="rounded-[3rem] bg-gradient-to-b from-zinc-800 to-zinc-950 border border-zinc-800 text-white overflow-hidden relative shadow-2xl"
          >
            <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/gradient/1920/1080')] opacity-5 mix-blend-overlay grayscale" />
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent blur-3xl" />
            <div className="relative px-8 py-20 md:py-32 flex flex-col items-center text-center">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight max-w-2xl">
                Siap mencoba Asuma Bot?
              </h2>
              <p className="mt-6 text-lg text-zinc-400 max-w-xl">
                Gunakan Asuma sekarang dan nikmati pengalaman WhatsApp yang lebih cerdas, praktis, dan menyenangkan.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 w-full">
                <Link href="https://wa.me/123" target="_blank" className="h-14 px-8 rounded-full bg-white text-zinc-950 font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 group">
                  <Rocket className="w-5 h-5" />
                  Mulai Sekarang
                </Link>
                <Link href="/about" className="h-14 px-8 rounded-full border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 text-white font-medium transition-colors flex items-center justify-center">
                  Pelajari Lebih Lanjut
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3 font-bold text-2xl tracking-tight text-white">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-zinc-900" />
                </div>
                Asuma
              </div>
              <p className="text-zinc-400 max-w-sm">
                WhatsApp Bot modern yang dirancang untuk membantu produktivitas, hiburan, dan otomatisasi dalam satu platform.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Navigasi</h4>
              <ul className="space-y-3 text-zinc-400">
                <li><Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About</Link></li>
                <li><Link href="/docs" className="hover:text-emerald-400 transition-colors">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Sosial & Tautan</h4>
              <ul className="space-y-3 text-zinc-400">
                <li><a href="https://github.com/asuma-labs" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">GitHub</a></li>
                <li><a href="https://wa.me/321" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
            <p>© {new Date().getFullYear()} Asuma. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="p-8 rounded-3xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 flex flex-col gap-4 group hover:border-zinc-700 transition-colors"
    >
      <div className="w-14 h-14 rounded-2xl bg-zinc-800/80 flex items-center justify-center shadow-inner border border-zinc-700/50 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-zinc-400 leading-relaxed text-sm">
        {description}
      </p>
    </motion.div>
  );
}

function WhyCard({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) {
  return (
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="flex items-start gap-4 p-6 rounded-3xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/60 transition-colors"
    >
       <div className="w-12 h-12 shrink-0 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-300 border border-zinc-700">
         {icon}
       </div>
       <div>
         <h4 className="font-semibold text-white text-lg mb-1">{title}</h4>
         <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
       </div>
    </motion.div>
  )
}

function StatCard({ value, label, icon, delay }: { value: string, label: string, icon: React.ReactNode, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center text-center gap-2"
    >
      <div className="text-emerald-500 mb-2">{icon}</div>
      <h3 className="text-3xl md:text-4xl font-bold text-white">{value}</h3>
      <p className="text-zinc-400 font-medium text-sm tracking-wide uppercase">{label}</p>
    </motion.div>
  )
}
