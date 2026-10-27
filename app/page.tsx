'use client';

import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { useInView } from 'motion/react';
import Link from 'next/link';
import {
  Bot, Users, Gamepad2, Download, Search, Zap,
  ArrowRight, CheckCircle2, Code2, Shield,
  Heart, BookOpen, Home as HomeIcon,
  UserCheck, Clock, TrendingUp, Menu, X, Send
} from 'lucide-react';

const TestimonialSection = lazy(() => import('../components/TestimonialSection'));

// ==========================================
// KOMPONEN NAVBAR (Clean & Flat)
// ==========================================
function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">Asuma</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/docs" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              Documentation
            </Link>
            <button className="h-9 px-5 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
              Coba Sekarang
            </button>
          </div>

          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-slate-200 p-6 space-y-4 md:hidden shadow-lg">
          <Link href="/" className="block text-sm font-medium text-slate-700">Home</Link>
          <Link href="/about" className="block text-sm font-medium text-slate-700">About</Link>
          <Link href="/docs" className="block text-sm font-medium text-slate-700">Documentation</Link>
          <button className="w-full h-10 mt-2 rounded-md bg-blue-600 text-white text-sm font-semibold">
            Coba Sekarang
          </button>
        </div>
      )}
    </>
  );
}

// ==========================================
// KOMPONEN ANIMASI ANGKA
// ==========================================
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

// ==========================================
// KOMPONEN MOCKUP WHATSAPP (Clean UI)
// ==========================================
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
    <div className="w-full max-w-sm mx-auto bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Header Chat */}
      <div className="bg-slate-50 border-b border-slate-200 px-5 py-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <Bot className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <p className="font-bold text-slate-900 text-sm">Asuma Bot</p>
          <p className="text-xs text-green-600 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
          </p>
        </div>
      </div>
      
      {/* Area Chat */}
      <div className="p-5 space-y-4 min-h-[300px] bg-white">
        {messages.map((msg, index) => (
          visibleMessages.includes(index) && (
            <div
              key={index}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line ${
                msg.type === 'user'
                  ? 'bg-blue-600 text-white rounded-br-sm'
                  : 'bg-slate-100 text-slate-800 border border-slate-200 rounded-bl-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          )
        ))}
      </div>

      {/* Input Chat */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-3">
        <div className="flex-1 px-4 py-2.5 rounded-md bg-white border border-slate-300 text-sm text-slate-400">
          Ketik pesan...
        </div>
        <button className="w-10 h-10 rounded-md bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ==========================================
// HALAMAN UTAMA
// ==========================================
export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-800">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6">

        {/* HERO SECTION */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                WhatsApp Bot v2.0 Telah Hadir
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-slate-900">
                Otomatisasi WhatsApp <br className="hidden lg:block"/> 
                <span className="text-blue-600">Lebih Cerdas.</span>
              </h1>

              <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
                Satu bot untuk semua kebutuhan. AI Assistant, manajemen grup, downloader, dan mini-games. Cepat, stabil, dan mudah digunakan.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button className="h-12 px-6 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm">
                  Mulai Sekarang <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href="/docs"
                  className="h-12 px-6 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center shadow-sm"
                >
                  Lihat Dokumentasi
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <WhatsAppMockup />
            </div>
          </div>
        </section>

        {/* STATS SECTION (Clean Grid) */}
        <section className="py-12 border-y border-slate-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-200">
            {[
              { icon: <Code2 className="w-5 h-5" />, value: 100, suffix: "+", label: "Commands" },
              { icon: <Clock className="w-5 h-5" />, value: 24, suffix: "/7", label: "Uptime" },
              { icon: <UserCheck className="w-5 h-5" />, value: 1000, suffix: "+", label: "Pengguna" },
              { icon: <TrendingUp className="w-5 h-5" />, value: 30, suffix: "+", label: "Update/Bulan" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left px-4">
                <div className="text-blue-600 mb-2">{stat.icon}</div>
                <h4 className="text-3xl font-bold text-slate-900">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </h4>
                <p className="text-sm font-medium text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FITUR SECTION (Bento/Card Grid) */}
        <section className="py-24">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-3 text-slate-900 tracking-tight">Fitur Utama</h2>
            <p className="text-slate-600 max-w-2xl">Didesain untuk memudahkan pekerjaanmu. Tanpa ribet, langsung bisa dipakai di grup atau chat pribadi.</p>
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
              <div key={i} className="p-6 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 group">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {React.cloneElement(fitur.icon, { className: "w-5 h-5" })}
                </div>
                <h3 className="text-lg font-bold mb-2 text-slate-900">{fitur.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{fitur.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <Suspense fallback={<div className="py-20 text-center text-slate-500">Memuat ulasan...</div>}>
          <TestimonialSection />
        </Suspense>

        {/* DEVELOPER SECTION (Clean Layout) */}
        <section className="py-20 border-t border-slate-200">
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start max-w-4xl mx-auto">
            <div className="w-24 h-24 rounded-2xl bg-blue-600 flex items-center justify-center text-3xl font-bold text-white shrink-0 shadow-sm">
              D
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold mb-3 text-slate-900">Dibuat oleh Ditss</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Asuma dikembangkan secara mandiri oleh <strong className="text-slate-900">Aditia (Ditss)</strong>. Fokus pada pengembangan bot WhatsApp, API backend, dan aplikasi web modern. Tujuannya sederhana: membuat otomatisasi yang bermanfaat dan mudah digunakan.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {['WhatsApp Bot Dev', 'Backend & Node.js', 'Web Apps'].map((skill, i) => (
                  <span key={i} className="flex items-center gap-2 text-sm font-medium text-slate-700 px-3 py-1.5 rounded-md bg-slate-100 border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" /> {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 mb-10">
          <div className="rounded-2xl p-10 md:p-16 text-center bg-blue-600 shadow-sm relative overflow-hidden">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Siap mencoba Asuma?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Bergabung dengan 1.000+ pengguna lainnya. Nikmati pengalaman WhatsApp yang lebih praktis tanpa perlu install aplikasi tambahan.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button className="h-12 px-8 rounded-lg bg-white text-blue-700 font-bold hover:bg-slate-50 transition-colors shadow-sm">
                Mulai Gratis Sekarang
              </button>
              <Link href="/docs" className="h-12 px-8 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center">
                Baca Dokumentasi
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6 text-blue-600" />
              <span className="font-bold text-lg text-slate-900">Asuma</span>
            </div>
            
            <div className="flex gap-6 text-sm font-medium text-slate-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
              <Link href="/docs" className="hover:text-blue-600 transition-colors">Docs</Link>
              <a href="#" className="hover:text-blue-600 transition-colors">GitHub</a>
            </div>

            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Asuma. Dibuat dengan <Heart className="w-4 h-4 inline text-red-500" /> oleh Ditss.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
