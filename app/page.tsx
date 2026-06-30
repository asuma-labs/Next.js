'use client';

import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { motion, useInView, useScroll, useSpring } from 'motion/react';
import Link from 'next/link';
import {
  Bot, Users, Gamepad2, Download, Search, Zap,
  ArrowRight, CheckCircle2, Code2, Shield,
  Heart, MessageCircle, Github, BookOpen,
  Mail, Home as HomeIcon, ChevronRight, Sparkles, Activity,
  UserCheck, Clock, TrendingUp, MessageSquare, Star, Menu, X,
  Send
} from 'lucide-react';

const TestimonialSection = lazy(() => import('../components/TestimonialSection'));

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 origin-left z-[60]"
      style={{ scaleX }}
    />
  );
}

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
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 border-b border-zinc-200/50 dark:border-white/[0.06]' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-xl tracking-tight text-zinc-900 dark:text-white">Asuma</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium text-zinc-600 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              About
            </Link>
            <Link href="/docs" className="text-sm font-medium text-zinc-600 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              Documentation
            </Link>
            <button className="h-9 px-5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-cyan-500 transition-all shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 active:scale-95">
              Coba Sekarang
            </button>
          </div>

          <button 
            className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/[0.06] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-16 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-zinc-200 dark:border-white/[0.06] md:hidden"
        >
          <div className="px-4 sm:px-6 py-4 space-y-3">
            <Link href="/" className="block py-2 text-sm font-medium text-zinc-600 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/about" className="block py-2 text-sm font-medium text-zinc-600 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              About
            </Link>
            <Link href="/docs" className="block py-2 text-sm font-medium text-zinc-600 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              Documentation
            </Link>
            <button className="w-full h-10 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-cyan-500 transition-all shadow-lg shadow-violet-500/25 active:scale-95">
              Coba Sekarang
            </button>
          </div>
        </motion.div>
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
    const duration = 1800;
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
    { type: 'bot', text: '🤖 Halo! Saya Asuma Bot.\nKetik /menu untuk melihat fitur.', delay: 0.8 },
    { type: 'user', text: '/ai buatkan caption instagram', delay: 2 },
    { type: 'bot', text: '✨ Caption Instagram:\n"Living my best life, one pixel at a time 💫"', delay: 2.8 },
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
    <div className="relative w-full max-w-sm mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 blur-3xl scale-110" />
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-violet-500/20 border border-zinc-200 dark:border-white/[0.08] overflow-hidden">
        <div className="bg-gradient-to-r from-violet-600 to-cyan-600 px-4 py-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">Asuma Bot</p>
            <p className="text-white/80 text-xs">Online</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </div>
        
        <div className="p-4 space-y-3 min-h-[320px] bg-gradient-to-b from-zinc-50 to-white dark:from-slate-800 dark:to-slate-900">
          {messages.map((msg, index) => (
            visibleMessages.includes(index) && (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line ${
                  msg.type === 'user'
                    ? 'bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-br-sm'
                    : 'bg-white dark:bg-slate-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/[0.08] rounded-bl-sm shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            )
          ))}
        </div>

        <div className="px-4 py-3 bg-white dark:bg-slate-900 border-t border-zinc-200 dark:border-white/[0.06] flex items-center gap-2">
          <div className="flex-1 px-4 py-2 rounded-full bg-zinc-100 dark:bg-slate-800 text-sm text-zinc-400">
            Ketik pesan...
          </div>
          <button className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon, title, description, delay, accent, href
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  accent: string;
  href?: string;
}) {
  const content = (
    <>
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl ${accent}`} />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5" />
      
      <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 dark:from-violet-500/20 dark:to-cyan-500/20 border border-violet-500/20 dark:border-violet-500/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-violet-500/10">
        {icon}
      </div>
      
      <h3 className="relative z-10 text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">{title}</h3>
      <p className="relative z-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
      
      <div className="relative z-10 mt-auto pt-4 flex items-center gap-2 text-violet-600 dark:text-violet-400 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Learn more <ArrowRight className="w-4 h-4" />
      </div>
    </>
  );

  if (href) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
        className="group relative p-6 sm:p-8 rounded-3xl border border-zinc-200/80 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.04] backdrop-blur-xl flex flex-col gap-4 sm:gap-5 overflow-hidden shadow-lg shadow-zinc-200/50 dark:shadow-black/20 hover:shadow-2xl hover:shadow-violet-500/20 dark:hover:shadow-violet-500/10 transition-all duration-300 cursor-pointer"
      >
        <Link href={href} className="absolute inset-0 z-20" />
        {content}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
      className="group relative p-6 sm:p-8 rounded-3xl border border-zinc-200/80 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.04] backdrop-blur-xl flex flex-col gap-4 sm:gap-5 overflow-hidden shadow-lg shadow-zinc-200/50 dark:shadow-black/20 hover:shadow-2xl hover:shadow-violet-500/20 dark:hover:shadow-violet-500/10 transition-all duration-300"
    >
      {content}
    </motion.div>
  );
}

function WhyCard({
  icon, title, description, delay
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      className="flex gap-4 p-5 sm:p-6 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/[0.08] backdrop-blur-sm shadow-md hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300"
    >
      <div className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/30 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-zinc-900 dark:text-white mb-1 text-sm sm:text-base">{title}</h4>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

function StatCard({
  icon, value, suffix, label, delay
}: {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative flex flex-col items-center gap-3 sm:gap-4 p-6 sm:p-10 rounded-3xl border border-violet-500/20 dark:border-violet-500/30 bg-gradient-to-br from-white/80 via-violet-500/5 to-cyan-500/5 dark:from-white/[0.06] dark:via-violet-500/10 dark:to-cyan-500/10 backdrop-blur-xl text-center overflow-hidden shadow-xl shadow-violet-500/10 dark:shadow-violet-500/5 hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent" />
      
      <div className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-violet-500/40">
        {icon}
      </div>
      
      <div className="relative z-10 text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-600 dark:from-violet-400 dark:to-cyan-400 tracking-tight">
        <AnimatedCounter target={value} suffix={suffix ?? ''} />
      </div>
      
      <p className="relative z-10 text-[10px] sm:text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">{label}</p>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen font-sans overflow-x-hidden bg-gradient-to-br from-zinc-50 via-violet-50/30 to-cyan-50/20 dark:from-[#05070F] dark:via-[#0A0F1C] dark:to-[#0D1424] text-zinc-900 dark:text-white transition-colors duration-300">
      <ScrollProgress />
      <Navbar />

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet-500/15 blur-[120px] opacity-80 dark:opacity-100" />
        <div className="absolute top-1/3 -right-40 w-[450px] h-[450px] rounded-full bg-cyan-500/10 blur-[120px] opacity-70 dark:opacity-100" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-violet-500/8 blur-[150px] opacity-60 dark:opacity-100" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

        <section className="pt-28 sm:pt-32 md:pt-44 pb-20 sm:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
                className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20 dark:border-violet-500/30 text-xs sm:text-sm font-semibold text-violet-700 dark:text-violet-300 mb-8 sm:mb-10 shadow-lg shadow-violet-500/10 backdrop-blur-sm"
              >
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 animate-pulse" />
                🤖 WhatsApp Bot · 100+ Commands · 24/7 Online
              </motion.div>

              <motion.h1
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] max-w-2xl text-balance"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-violet-500 to-cyan-500 dark:from-violet-400 dark:via-violet-300 dark:to-cyan-300">
                  Asuma Bot
                </span>
                <br />
                <span className="text-zinc-900/95 dark:text-white/95 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-2 block">
                  Intelligent WhatsApp<br className="hidden sm:block" />Automation
                </span>
              </motion.h1>

              <motion.p
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed text-balance"
              >
                Satu bot untuk semua kebutuhan WhatsApp kamu. AI assistant, group management, downloader, games — semua dalam genggaman.
              </motion.p>

              <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
              >
                <button className="h-12 sm:h-14 px-8 sm:px-10 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold hover:from-violet-500 hover:to-cyan-500 transition-all shadow-xl shadow-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/50 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group relative overflow-hidden">
                  <span className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                  <span className="relative z-10 flex items-center gap-2">
                    Coba Sekarang Gratis
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <Link
                  href="/about/asuma"
                  className="h-12 sm:h-14 px-8 sm:px-10 rounded-full bg-white/80 dark:bg-white/[0.08] border border-zinc-200 dark:border-white/[0.12] text-zinc-900 dark:text-white font-semibold hover:bg-white dark:hover:bg-white/[0.12] transition-all backdrop-blur-sm shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  Tentang Asuma
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-6 sm:mt-8 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium"
              >
                Bergabung bersama <span className="text-violet-600 dark:text-violet-400 font-semibold">1.000+</span> pengguna aktif
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <WhatsAppMockup />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 flex flex-col items-center gap-2 text-slate-400 dark:text-slate-600"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-slate-300 dark:border-slate-700 flex items-start justify-center pt-2"
            >
              <div className="w-1 h-2.5 rounded-full bg-gradient-to-b from-violet-500 to-cyan-500" />
            </motion.div>
          </motion.div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
            <StatCard icon={<Code2 className="w-5 h-5 sm:w-7 sm:h-7 text-white" />} value={100} suffix="+" label="Commands" delay={0} />
            <StatCard icon={<Clock className="w-5 h-5 sm:w-7 sm:h-7 text-white" />} value={24} suffix="/7" label="Online" delay={0.1} />
            <StatCard icon={<UserCheck className="w-5 h-5 sm:w-7 sm:h-7 text-white" />} value={1000} suffix="+" label="Users" delay={0.2} />
            <StatCard icon={<TrendingUp className="w-5 h-5 sm:w-7 sm:h-7 text-white" />} value={30} suffix="+" label="Updates / Month" delay={0.3} />
          </div>
        </section>

        <section className="py-20 sm:py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-4">Fitur Unggulan</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">Semua yang kamu butuhkan,<br className="hidden md:block" /> dalam satu bot.</h2>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">Dari AI hingga game, dari downloader hingga manajemen grup — Asuma hadir lengkap.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            <FeatureCard delay={0}    accent="bg-gradient-to-br from-violet-500/15 to-transparent"   icon={<Bot className="w-6 h-6 sm:w-7 sm:h-7 text-violet-600 dark:text-violet-400" />}        title="AI Assistant"          description="Tanya apa saja langsung di WhatsApp. Didukung model AI canggih untuk menjawab pertanyaan, meringkas, dan membantu produktivitas." href="/docs#ai-assistant" />
            <FeatureCard delay={0.08} accent="bg-gradient-to-br from-cyan-500/15 to-transparent"    icon={<Users className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-600 dark:text-cyan-400" />}        title="Group Management"      description="Kelola anggota, filter spam, atur izin, dan otomasi tugas admin grup dengan perintah sederhana." href="/docs#group-management" />
            <FeatureCard delay={0.16} accent="bg-gradient-to-br from-purple-500/15 to-transparent"  icon={<Gamepad2 className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600 dark:text-purple-400" />}  title="RPG & Games"           description="Nikmati permainan RPG, tebak kata, trivia, dan berbagai mini-game seru langsung dalam chat grup." href="/docs#games" />
            <FeatureCard delay={0.24} accent="bg-gradient-to-br from-pink-500/15 to-transparent"    icon={<Download className="w-6 h-6 sm:w-7 sm:h-7 text-pink-600 dark:text-pink-400" />}    title="Media Downloader"      description="Unduh video, audio, stiker, dan gambar dari berbagai platform populer hanya dengan mengirim link." href="/docs#downloader" />
            <FeatureCard delay={0.32} accent="bg-gradient-to-br from-amber-500/15 to-transparent"   icon={<Search className="w-6 h-6 sm:w-7 sm:h-7 text-amber-600 dark:text-amber-400" />}     title="Search Information"    description="Cari berita, cuaca, lirik lagu, definisi kata, dan informasi real-time tanpa keluar dari WhatsApp." href="/docs#search" />
            <FeatureCard delay={0.4}  accent="bg-gradient-to-br from-teal-500/15 to-transparent"    icon={<Zap className="w-6 h-6 sm:w-7 sm:h-7 text-teal-600 dark:text-teal-400" />}          title="Fast Response"         description="Dioptimalkan untuk latensi rendah dengan infrastruktur stabil agar bot selalu responsif sepanjang hari." href="/docs#performance" />
          </div>
        </section>

        <Suspense fallback={<div className="py-20 text-center">Loading testimonials...</div>}>
          <TestimonialSection />
        </Suspense>

        <section className="py-20 sm:py-24 md:py-32 border-t border-zinc-200 dark:border-white/[0.06]">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="relative shrink-0 flex flex-col items-center"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 blur-3xl scale-[2] opacity-30" />
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-[36px] bg-gradient-to-br from-violet-500 via-violet-600 to-cyan-500 flex items-center justify-center shadow-2xl shadow-violet-500/50 text-5xl sm:text-6xl font-black text-white ring-8 ring-violet-500/10">
                D
              </div>
              <div className="mt-4 sm:mt-6 text-center">
                <p className="font-black text-zinc-900 dark:text-white text-lg sm:text-xl">Ditss</p>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">Aditia · Developer</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-5 sm:space-y-7"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">Tentang Pembuat</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
                  Dibuat oleh{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-600 dark:from-violet-400 dark:to-cyan-400">
                    Ditss
                  </span>
                </h2>
              </div>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Asuma dikembangkan oleh <span className="text-zinc-900 dark:text-white font-semibold">Ditss (Aditia)</span>, seorang
                developer yang berfokus pada pengembangan WhatsApp Bot, backend API, dan aplikasi web modern.
                Tujuan Asuma adalah menghadirkan solusi otomatisasi yang mudah digunakan dan bermanfaat bagi
                semua pengguna.
              </p>
              <ul className="space-y-3 sm:space-y-4">
                {['WhatsApp Bot Development', 'Backend API & Node.js', 'Modern Web Applications'].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 font-semibold"
                  >
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500 dark:text-violet-400 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 pt-2 sm:pt-3">
                <Link
                  href="/about/ditss"
                  className="h-11 sm:h-12 px-6 sm:px-7 rounded-full bg-gradient-to-r from-violet-500/15 to-cyan-500/15 border border-violet-500/30 text-violet-700 dark:text-violet-300 font-semibold hover:from-violet-500/25 hover:to-cyan-500/25 transition-all flex items-center gap-2 shadow-lg shadow-violet-500/10 text-sm sm:text-base"
                >
                  About Developer <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about/asuma"
                  className="h-11 sm:h-12 px-6 sm:px-7 rounded-full bg-white/80 dark:bg-white/[0.08] border border-zinc-200 dark:border-white/[0.12] text-zinc-900 dark:text-white font-semibold hover:bg-white dark:hover:bg-white/[0.12] transition-all flex items-center gap-2 shadow-lg text-sm sm:text-base"
                >
                  About Asuma <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 sm:py-24 md:py-32 border-t border-zinc-200 dark:border-white/[0.06]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-4">Kenapa Asuma?</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
              Dipilih bukan tanpa alasan.
            </h2>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto">Asuma dirancang agar benar-benar berguna, bukan sekadar terlihat keren.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            <WhyCard delay={0}    icon={<Zap className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500 dark:text-violet-400" />}            title="Cepat & Stabil"      description="Respons instan dengan infrastruktur yang dioptimalkan untuk uptime tinggi sepanjang waktu." />
            <WhyCard delay={0.07} icon={<Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500 dark:text-violet-400" />}       title="Banyak Fitur"        description="Lebih dari 100 perintah tersedia — satu bot untuk semua kebutuhan kamu di WhatsApp." />
            <WhyCard delay={0.14} icon={<Activity className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500 dark:text-violet-400" />}       title="Selalu Dikembangkan" description="Update rutin setiap bulan menghadirkan fitur baru berdasarkan masukan pengguna langsung." />
            <WhyCard delay={0.21} icon={<MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500 dark:text-violet-400" />}  title="Mudah Digunakan"     description="Perintah sederhana, dokumentasi jelas, dan tidak perlu instalasi apapun dari pengguna." />
            <WhyCard delay={0.28} icon={<Shield className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500 dark:text-violet-400" />}         title="Aman"                description="Tidak menyimpan pesan pribadi. Privasi pengguna adalah prioritas dalam setiap fitur." />
            <WhyCard delay={0.35} icon={<Heart className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500 dark:text-violet-400" />}          title="Gratis Digunakan"    description="Semua fitur inti tersedia gratis. Tidak ada paywall tersembunyi untuk fungsi utama." />
          </div>
        </section>

        <section className="py-20 sm:py-24 md:py-32 pb-28 sm:pb-36">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/80 via-violet-800/80 to-slate-900/90" />
            <div className="absolute inset-0 border-2 border-violet-500/30 rounded-[32px] sm:rounded-[40px]" />
            <div className="absolute -top-12 -right-12 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />
            <div className="absolute -bottom-12 -left-12 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-violet-500/20 blur-3xl animate-pulse" />

            <div className="relative z-10 px-6 sm:px-10 py-20 sm:py-28 md:py-36 flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-violet-500 via-violet-600 to-cyan-500 flex items-center justify-center mb-6 sm:mb-8 shadow-2xl shadow-violet-500/50 ring-8 ring-white/10"
              >
                <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </motion.div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight max-w-3xl text-white">
                Siap mencoba{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-cyan-300">
                  Asuma Bot?
                </span>
              </h2>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-xl">
                Gunakan Asuma sekarang dan nikmati pengalaman WhatsApp yang lebih cerdas, praktis, dan menyenangkan.
              </p>
              <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                <button className="px-8 sm:px-12 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-bold hover:from-violet-400 hover:to-cyan-400 transition-all shadow-2xl shadow-violet-500/40 hover:shadow-3xl hover:shadow-violet-500/60 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 relative overflow-hidden group">
                  <span className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                  <span className="relative z-10 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Mulai Sekarang
                  </span>
                </button>
                <Link
                  href="/docs"
                  className="px-8 sm:px-12 py-3.5 sm:py-4 rounded-full bg-white/10 border-2 border-white/20 text-white font-bold hover:bg-white/15 transition-all flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                  Pelajari Lebih Lanjut
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

      </main>

      <footer className="relative z-10 border-t border-zinc-200 dark:border-white/[0.06] bg-zinc-100/80 dark:bg-slate-950/60 backdrop-blur-xl pt-16 sm:pt-20 pb-8 sm:pb-10 text-zinc-600 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 sm:gap-14 mb-12 sm:mb-16">
            <div className="md:col-span-2 space-y-4 sm:space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-xl shadow-violet-500/30">
                  <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="font-black text-xl sm:text-2xl tracking-tight text-zinc-900 dark:text-white">Asuma</span>
              </div>
              <p className="text-sm sm:text-base text-zinc-500 dark:text-slate-500 max-w-sm leading-relaxed">
                WhatsApp Bot modern yang dirancang untuk membantu produktivitas, hiburan, dan otomatisasi dalam satu platform.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-zinc-800 dark:text-white mb-5 sm:mb-6 text-xs sm:text-sm uppercase tracking-wider">Navigasi</h4>
              <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-zinc-500">
                {[
                  { label: 'Home', href: '/', icon: HomeIcon },
                  { label: 'About', href: '/about', icon: UserCheck },
                  { label: 'Documentation', href: '/docs', icon: BookOpen },
                ].map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a href={href} className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-slate-500 dark:hover:text-white transition-colors font-medium">
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4" /> {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-zinc-800 dark:text-white mb-5 sm:mb-6 text-xs sm:text-sm uppercase tracking-wider">Tautan</h4>
              <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-zinc-500">
                {[
                  { label: 'GitHub', href: 'https://github.com', icon: Github },
                  { label: 'Contact', href: '/contact', icon: Mail },
                ].map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-slate-500 dark:hover:text-white transition-colors font-medium"
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                    >
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4" /> {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-200 dark:border-white/[0.06] pt-8 sm:pt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-zinc-500 dark:text-slate-600">
            <p>© {new Date().getFullYear()} Asuma. All rights reserved.</p>
            <p className="text-zinc-400 dark:text-slate-700 text-[10px] sm:text-xs font-medium">
              Developed with <Heart className="w-3 h-3 inline text-red-500/80" /> by Ditss · asuma.my.id
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
