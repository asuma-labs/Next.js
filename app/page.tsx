'use client';

import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { motion, useInView } from 'motion/react';
import Link from 'next/link';
import {
  Bot, Users, Gamepad2, Download, Search, Zap,
  ArrowRight, CheckCircle2, Code2, Shield,
  Heart, MessageCircle, Github, BookOpen,
  Mail, Home as HomeIcon, ChevronRight, Sparkles, Activity,
  UserCheck, Clock, TrendingUp, Menu, X, Send
} from 'lucide-react';

const TestimonialSection = lazy(() => import('../components/TestimonialSection'));

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 dark:bg-slate-900/95 shadow-sm border-b border-slate-200 dark:border-slate-800' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-slate-900 dark:text-white">Asuma</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
              About
            </Link>
            <Link href="/docs" className="text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
              Docs
            </Link>
            <button className="h-9 px-5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
              Coba Gratis
            </button>
          </div>

          <button 
            className="md:hidden p-2 text-slate-600 dark:text-slate-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 md:hidden px-6 py-4 space-y-4 shadow-lg">
          <Link href="/" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Home</Link>
          <Link href="/about" className="block text-sm font-medium text-slate-600 dark:text-slate-300">About</Link>
          <Link href="/docs" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Docs</Link>
          <button className="w-full h-10 rounded-lg bg-blue-600 text-white text-sm font-medium">Coba Gratis</button>
        </div>
      )}
    </>
  );
}

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function WhatsAppMockup() {
  const messages = [
    { type: 'user', text: '/help', delay: 0 },
    { type: 'bot', text: 'Halo! Saya Asuma Bot.\nKetik /menu untuk melihat fitur.', delay: 0.8 },
    { type: 'user', text: '/ai buatkan caption instagram', delay: 2 },
    { type: 'bot', text: 'Caption Instagram:\n"Living my best life, one pixel at a time."', delay: 2.8 },
  ];

  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);

  useEffect(() => {
    messages.forEach((_, index) => {
      setTimeout(() => {
        setVisibleMessages(prev => [...prev, index]);
      }, messages[index].delay * 1000);
    });
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden">
      <div className="bg-blue-600 px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-white font-semibold text-sm">Asuma Bot</p>
          <p className="text-blue-100 text-xs">Online</p>
        </div>
      </div>
      
      <div className="p-4 space-y-4 min-h-[300px] bg-slate-50 dark:bg-slate-900">
        {messages.map((msg, index) => (
          visibleMessages.includes(index) && (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] px-4 py-2.5 rounded-lg text-sm whitespace-pre-line ${
                msg.type === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-none shadow-sm'
              }`}>
                {msg.text}
              </div>
            </motion.div>
          )
        ))}
      </div>

      <div className="px-4 py-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center gap-2">
        <div className="flex-1 px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-900 text-sm text-slate-400">
          Ketik pesan...
        </div>
        <button className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center">
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6">

        {/* HERO SECTION */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium mb-6 border border-blue-200 dark:border-blue-800">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                WhatsApp Bot v2.0 Telah Hadir
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                Otomatisasi WhatsApp <br className="hidden lg:block"/> 
                <span className="text-blue-600 dark:text-blue-500">Lebih Cerdas.</span>
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-lg">
                Satu bot untuk semua kebutuhan. AI Assistant, manajemen grup, downloader, dan mini-games. Cepat, stabil, dan mudah digunakan.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button className="h-12 px-8 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  Mulai Sekarang <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href="/docs"
                  className="h-12 px-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
                >
                  Lihat Dokumentasi
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <WhatsAppMockup />
            </motion.div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="py-12 border-y border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Code2 className="w-6 h-6 text-blue-600" />, value: 100, suffix: "+", label: "Commands" },
              { icon: <Clock className="w-6 h-6 text-blue-600" />, value: 24, suffix: "/7", label: "Uptime" },
              { icon: <UserCheck className="w-6 h-6 text-blue-600" />, value: 1000, suffix: "+", label: "Pengguna" },
              { icon: <TrendingUp className="w-6 h-6 text-blue-600" />, value: 30, suffix: "+", label: "Update/Bulan" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
                <div className="mb-1">{stat.icon}</div>
                <h4 className="text-3xl font-bold text-slate-900 dark:text-white">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </h4>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FITUR SECTION */}
        <section className="py-24">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4">Fitur Utama</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl">Didesain untuk memudahkan pekerjaanmu. Tanpa ribet, langsung bisa dipakai di grup atau chat pribadi.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Bot />, title: "AI Assistant", desc: "Tanya apa saja, minta ringkasan, atau buat konten langsung dari WhatsApp." },
              { icon: <Users />, title: "Group Management", desc: "Atur anggota, filter link spam, dan otomatisasi tugas admin grup." },
              { icon: <Gamepad2 />, title: "RPG & Games", desc: "Mainkan mini-games, tebak kata, dan trivia seru bareng teman." },
              { icon: <Download />, title: "Media Downloader", desc: "Unduh video, audio, dan stiker dari platform populer via link." },
              { icon: <Search />, title: "Search Info", desc: "Cari berita, cuaca, atau lirik lagu tanpa keluar dari aplikasi." },
              { icon: <Zap />, title: "Fast Response", desc: "Infrastruktur stabil dengan latensi rendah untuk respon instan." }
            ].map((fitur, i) => (
              <div key={i} className="group p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors duration-200">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                  {React.cloneElement(fitur.icon, { className: "w-5 h-5" })}
                </div>
                <h3 className="text-lg font-bold mb-2">{fitur.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{fitur.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <Suspense fallback={<div className="py-20 text-center text-slate-500">Memuat ulasan...</div>}>
          <TestimonialSection />
        </Suspense>

        {/* DEVELOPER SECTION */}
        <section className="py-24 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-24 h-24 rounded-2xl bg-blue-600 flex items-center justify-center text-4xl font-bold text-white shrink-0">
              D
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Dibuat oleh Ditss</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl leading-relaxed">
                Asuma dikembangkan secara mandiri oleh <strong className="text-slate-900 dark:text-white">Aditia (Ditss)</strong>. Fokus pada pengembangan bot WhatsApp, API backend, dan aplikasi web modern. Tujuannya sederhana: membuat otomatisasi yang bermanfaat dan mudah digunakan.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" /> WhatsApp Bot Dev
                </span>
                <span className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" /> Backend & Node.js
                </span>
                <span className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" /> Web Apps
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 mb-12">
          <div className="bg-blue-600 dark:bg-blue-900 rounded-2xl p-10 md:p-16 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap mencoba Asuma?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Bergabung dengan 1.000+ pengguna lainnya. Nikmati pengalaman WhatsApp yang lebih praktis tanpa perlu install aplikasi tambahan.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="h-12 px-8 rounded-lg bg-white text-blue-600 font-bold hover:bg-slate-100 transition-colors">
                Mulai Gratis
              </button>
              <Link href="/docs" className="h-12 px-8 rounded-lg bg-blue-700 text-white font-medium hover:bg-blue-800 transition-colors flex items-center justify-center">
                Baca Dokumentasi
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">Asuma</span>
            </div>
            
            <div className="flex gap-6 text-sm text-slate-600 dark:text-slate-400">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
              <Link href="/docs" className="hover:text-blue-600 transition-colors">Docs</Link>
              <a href="#" className="hover:text-blue-600 transition-colors">GitHub</a>
            </div>

            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Asuma. Dibuat dengan <Heart className="w-3 h-3 inline text-red-500" /> oleh Ditss.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
