'use client';

import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { useInView } from 'motion/react';
import Link from 'next/link';
import {
  Bot, Users, Gamepad2, Download, Search, Zap,
  ArrowRight, CheckCircle2, Code2, Shield,
  Heart, BookOpen, Mail, Home as HomeIcon,
  UserCheck, Clock, TrendingUp, Menu, X, Send
} from 'lucide-react';

const TestimonialSection = lazy(() => import('../components/TestimonialSection'));

// ==========================================
// KOMPONEN NAVBAR (Neumorphism)
// ==========================================
function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#E2E8F0] shadow-[0_4px_10px_rgba(163,177,198,0.3)]">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            {/* Logo dengan efek timbul */}
            <div className="w-10 h-10 rounded-xl bg-[#E2E8F0] shadow-[4px_4px_8px_#c5d0e0,-4px_-4px_8px_#ffffff] flex items-center justify-center group-hover:shadow-[inset_4px_4px_8px_#c5d0e0,inset_-4px_-4px_8px_#ffffff] transition-all">
              <Bot className="w-5 h-5 text-blue-600" />
            </div>
            <span className="font-extrabold text-xl text-slate-800 tracking-tight">Asuma</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/docs" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">
              Documentation
            </Link>
            {/* Tombol Neumorphism */}
            <button className="h-10 px-6 rounded-xl bg-[#E2E8F0] text-blue-600 font-bold shadow-[4px_4px_8px_#c5d0e0,-4px_-4px_8px_#ffffff] hover:shadow-[inset_4px_4px_8px_#c5d0e0,inset_-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#c5d0e0,inset_-4px_-4px_8px_#ffffff] transition-all">
              Coba Sekarang
            </button>
          </div>

          <button 
            className="md:hidden p-2 rounded-lg text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-20 left-0 right-0 z-40 bg-[#E2E8F0] shadow-lg p-6 space-y-4 md:hidden border-t border-slate-300">
          <Link href="/" className="block text-sm font-bold text-slate-700">Home</Link>
          <Link href="/about" className="block text-sm font-bold text-slate-700">About</Link>
          <Link href="/docs" className="block text-sm font-bold text-slate-700">Documentation</Link>
          <button className="w-full h-10 mt-2 rounded-xl bg-[#E2E8F0] text-blue-600 font-bold shadow-[4px_4px_8px_#c5d0e0,-4px_-4px_8px_#ffffff]">
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
// KOMPONEN MOCKUP WHATSAPP (Soft UI)
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
    <div className="w-full max-w-sm mx-auto bg-[#E2E8F0] rounded-3xl shadow-[20px_20px_60px_#c5d0e0,-20px_-20px_60px_#ffffff] p-6">
      {/* Header Chat */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-300/50">
        <div className="w-10 h-10 rounded-full bg-[#E2E8F0] shadow-[inset_2px_2px_5px_#c5d0e0,inset_-2px_-2px_5px_#ffffff] flex items-center justify-center">
          <Bot className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <p className="font-bold text-slate-800 text-sm">Asuma Bot</p>
          <p className="text-xs text-green-500 font-medium">● Online</p>
        </div>
      </div>
      
      {/* Area Chat */}
      <div className="space-y-4 min-h-[280px]">
        {messages.map((msg, index) => (
          visibleMessages.includes(index) && (
            <div
              key={index}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm whitespace-pre-line ${
                msg.type === 'user'
                  ? 'bg-[#E2E8F0] shadow-[inset_3px_3px_6px_#c5d0e0,inset_-3px_-3px_6px_#ffffff] text-blue-700 font-medium rounded-br-none'
                  : 'bg-[#E2E8F0] shadow-[5px_5px_10px_#c5d0e0,-5px_-5px_10px_#ffffff] text-slate-700 rounded-bl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          )
        ))}
      </div>

      {/* Input Chat */}
      <div className="mt-6 flex items-center gap-3">
        <div className="flex-1 px-4 py-3 rounded-xl bg-[#E2E8F0] shadow-[inset_3px_3px_6px_#c5d0e0,inset_-3px_-3px_6px_#ffffff] text-sm text-slate-400">
          Ketik pesan...
        </div>
        <button className="w-12 h-12 rounded-xl bg-[#E2E8F0] shadow-[5px_5px_10px_#c5d0e0,-5px_-5px_10px_#ffffff] flex items-center justify-center text-blue-600 hover:shadow-[inset_3px_3px_6px_#c5d0e0,inset_-3px_-3px_6px_#ffffff] transition-all">
          <Send className="w-5 h-5" />
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
    <div className="min-h-screen font-sans bg-[#E2E8F0] text-slate-800 transition-colors duration-300">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6">

        {/* HERO SECTION */}
        <section className="pt-40 pb-24 md:pt-48 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E2E8F0] shadow-[inset_3px_3px_6px_#c5d0e0,inset_-3px_-3px_6px_#ffffff] text-blue-600 text-xs font-bold mb-8">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                WhatsApp Bot v2.0 Telah Hadir
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-slate-900">
                Otomatisasi WhatsApp <br className="hidden lg:block"/> 
                <span className="text-blue-600">Lebih Cerdas.</span>
              </h1>

              <p className="text-lg text-slate-600 mb-10 max-w-lg font-medium leading-relaxed">
                Satu bot untuk semua kebutuhan. AI Assistant, manajemen grup, downloader, dan mini-games. Cepat, stabil, dan mudah digunakan.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
                <button className="h-14 px-8 rounded-2xl bg-[#E2E8F0] text-blue-600 font-bold shadow-[6px_6px_12px_#c5d0e0,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#c5d0e0,inset_-6px_-6px_12px_#ffffff] transition-all flex items-center justify-center gap-2 group">
                  Mulai Sekarang <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  href="/docs"
                  className="h-14 px-8 rounded-2xl bg-[#E2E8F0] text-slate-700 font-bold shadow-[6px_6px_12px_#c5d0e0,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#c5d0e0,inset_-6px_-6px_12px_#ffffff] transition-all flex items-center justify-center"
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

        {/* STATS SECTION */}
        <section className="py-12 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Code2 className="w-6 h-6" />, value: 100, suffix: "+", label: "Commands" },
              { icon: <Clock className="w-6 h-6" />, value: 24, suffix: "/7", label: "Uptime" },
              { icon: <UserCheck className="w-6 h-6" />, value: 1000, suffix: "+", label: "Pengguna" },
              { icon: <TrendingUp className="w-6 h-6" />, value: 30, suffix: "+", label: "Update/Bulan" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left gap-3 p-6 rounded-2xl bg-[#E2E8F0] shadow-[8px_8px_16px_#c5d0e0,-8px_-8px_16px_#ffffff]">
                <div className="text-blue-600 mb-1">{stat.icon}</div>
                <h4 className="text-3xl font-extrabold text-slate-800">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </h4>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FITUR SECTION */}
        <section className="py-20">
          <div className="mb-16 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold mb-4 text-slate-900">Fitur Utama</h2>
            <p className="text-slate-600 max-w-2xl font-medium">Didesain untuk memudahkan pekerjaanmu. Tanpa ribet, langsung bisa dipakai di grup atau chat pribadi.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Bot />, title: "AI Assistant", desc: "Tanya apa saja, minta ringkasan, atau buat konten langsung dari WhatsApp." },
              { icon: <Users />, title: "Group Management", desc: "Atur anggota, filter link spam, dan otomatisasi tugas admin grup." },
              { icon: <Gamepad2 />, title: "RPG & Games", desc: "Mainkan mini-games, tebak kata, dan trivia seru bareng teman." },
              { icon: <Download />, title: "Media Downloader", desc: "Unduh video, audio, dan stiker dari platform populer via link." },
              { icon: <Search />, title: "Search Info", desc: "Cari berita, cuaca, atau lirik lagu tanpa keluar dari aplikasi." },
              { icon: <Zap />, title: "Fast Response", desc: "Infrastruktur stabil dengan latensi rendah untuk respon instan." }
            ].map((fitur, i) => (
              <div key={i} className="p-8 rounded-3xl bg-[#E2E8F0] shadow-[10px_10px_20px_#c5d0e0,-10px_-10px_20px_#ffffff] hover:shadow-[inset_8px_8px_16px_#c5d0e0,inset_-8px_-8px_16px_#ffffff] transition-all duration-300 group cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-[#E2E8F0] shadow-[4px_4px_8px_#c5d0e0,-4px_-4px_8px_#ffffff] flex items-center justify-center text-blue-600 mb-6 group-hover:shadow-[inset_3px_3px_6px_#c5d0e0,inset_-3px_-3px_6px_#ffffff] transition-all">
                  {React.cloneElement(fitur.icon, { className: "w-6 h-6" })}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">{fitur.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">{fitur.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <Suspense fallback={<div className="py-20 text-center font-bold text-slate-500">Memuat ulasan...</div>}>
          <TestimonialSection />
        </Suspense>

        {/* DEVELOPER SECTION */}
        <section className="py-24 mt-10">
          <div className="p-10 md:p-14 rounded-[2.5rem] bg-[#E2E8F0] shadow-[20px_20px_60px_#c5d0e0,-20px_-20px_60px_#ffffff] flex flex-col md:flex-row gap-12 items-center md:items-start">
            <div className="w-28 h-28 rounded-3xl bg-[#E2E8F0] shadow-[inset_5px_5px_10px_#c5d0e0,inset_-5px_-5px_10px_#ffffff] flex items-center justify-center text-5xl font-extrabold text-blue-600 shrink-0">
              D
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-extrabold mb-4 text-slate-900">Dibuat oleh Ditss</h2>
              <p className="text-slate-600 mb-8 max-w-2xl leading-relaxed font-medium">
                Asuma dikembangkan secara mandiri oleh <strong className="text-slate-800">Aditia (Ditss)</strong>. Fokus pada pengembangan bot WhatsApp, API backend, dan aplikasi web modern. Tujuannya sederhana: membuat otomatisasi yang bermanfaat dan mudah digunakan.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {['WhatsApp Bot Dev', 'Backend & Node.js', 'Web Apps'].map((skill, i) => (
                  <span key={i} className="flex items-center gap-2 text-sm font-bold text-slate-700 px-4 py-2 rounded-xl bg-[#E2E8F0] shadow-[3px_3px_6px_#c5d0e0,-3px_-3px_6px_#ffffff]">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" /> {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 mb-20">
          <div className="rounded-[2.5rem] p-12 md:p-20 text-center bg-[#E2E8F0] shadow-[inset_10px_10px_20px_#c5d0e0,inset_-10px_-10px_20px_#ffffff]">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-slate-900">Siap mencoba Asuma?</h2>
            <p className="text-slate-600 font-medium mb-10 max-w-xl mx-auto text-lg">
              Bergabung dengan 1.000+ pengguna lainnya. Nikmati pengalaman WhatsApp yang lebih praktis tanpa perlu install aplikasi tambahan.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <button className="h-14 px-10 rounded-2xl bg-[#E2E8F0] text-blue-600 font-bold shadow-[6px_6px_12px_#c5d0e0,-6px_-6px_12px_#ffffff] hover:shadow-[4px_4px_8px_#c5d0e0,-4px_-4px_8px_#ffffff] transition-all">
                Mulai Gratis Sekarang
              </button>
              <Link href="/docs" className="h-14 px-10 rounded-2xl bg-[#E2E8F0] text-slate-700 font-bold shadow-[6px_6px_12px_#c5d0e0,-6px_-6px_12px_#ffffff] hover:shadow-[4px_4px_8px_#c5d0e0,-4px_-4px_8px_#ffffff] transition-all flex items-center justify-center">
                Baca Dokumentasi
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-[#E2E8F0] shadow-[0_-4px_10px_rgba(163,177,198,0.3)] py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6 text-blue-600" />
              <span className="font-extrabold text-xl text-slate-800">Asuma</span>
            </div>
            
            <div className="flex gap-8 text-sm font-bold text-slate-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
              <Link href="/docs" className="hover:text-blue-600 transition-colors">Docs</Link>
              <a href="#" className="hover:text-blue-600 transition-colors">GitHub</a>
            </div>

            <p className="text-sm font-medium text-slate-500">
              © {new Date().getFullYear()} Asuma. Dibuat dengan <Heart className="w-4 h-4 inline text-red-500" /> oleh Ditss.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
