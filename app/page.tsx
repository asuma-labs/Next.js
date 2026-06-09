'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import {
  Bot, Users, Gamepad2, Download, Search, Zap,
  ArrowRight, CheckCircle2, Code2, Shield, Star,
  Wrench, Heart, MessageCircle, Github, BookOpen,
  Mail, Home, ChevronRight, Sparkles, Activity,
  UserCheck, Clock, TrendingUp
} from 'lucide-react';

// ─── Animated Counter ────────────────────────────────────────────────────────
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

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({
  icon, title, description, delay, accent
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  accent: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative p-7 rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm flex flex-col gap-4 overflow-hidden"
    >
      {/* Glow on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl ${accent}`} />
      <div className="relative z-10 w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center">
        {icon}
      </div>
      <h3 className="relative z-10 text-lg font-semibold text-white">{title}</h3>
      <p className="relative z-10 text-sm text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}

// ─── Why Card ─────────────────────────────────────────────────────────────────
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
      whileHover={{ scale: 1.02 }}
      className="flex gap-4 p-6 rounded-2xl bg-slate-800/40 border border-slate-700/40 backdrop-blur-sm"
    >
      <div className="shrink-0 w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-white mb-1">{title}</h4>
        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
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
      className="relative flex flex-col items-center gap-3 p-8 rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/5 to-transparent backdrop-blur-sm text-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/5 to-transparent" />
      <div className="relative z-10 w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
        {icon}
      </div>
      <div className="relative z-10 text-4xl font-extrabold text-white tracking-tight">
        <AnimatedCounter target={value} suffix={suffix ?? ''} />
      </div>
      <p className="relative z-10 text-sm font-medium text-slate-400 uppercase tracking-wider">{label}</p>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div
      className="min-h-screen font-sans text-white overflow-x-hidden"
      style={{ background: 'linear-gradient(135deg, #060D1F 0%, #0A1628 50%, #0D1B2E 100%)' }}
    >
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-96 h-64 rounded-full bg-teal-500/8 blur-3xl" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ── Hero ────────────────────────────────────────────────────────────── */}
        <section className="pt-24 md:pt-36 pb-20 flex flex-col items-center text-center">

          {/* Badge */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-sm font-medium text-cyan-300 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            🤖 WhatsApp Bot · Fast · Smart · Powerful
          </motion.div>

          {/* Bot avatar with pulse rings */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.05, type: 'spring', bounce: 0.3 }}
            className="relative mb-10"
          >
            <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-2xl scale-150" />
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border border-cyan-400/30"
                animate={{ scale: [1, 1.6 + i * 0.3], opacity: [0.5, 0] }}
                transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, ease: 'easeOut' }}
              />
            ))}
            <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center shadow-2xl shadow-cyan-500/30">
              <Bot className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] max-w-4xl text-balance"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300">
              Asuma Bot
            </span>
            <br />
            <span className="text-white/90 text-4xl md:text-5xl font-bold">
              Smart WhatsApp Automation<br className="hidden md:block" /> for Everyone.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed text-balance"
          >
            Asuma adalah bot WhatsApp multifungsi yang membantu pengguna mengelola grup, mencari informasi,
            bermain game, mengunduh media, dan mengotomatisasi berbagai aktivitas langsung dari WhatsApp.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 flex flex-col sm:flex-row gap-3"
          >
            <button className="h-12 px-8 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold hover:from-cyan-400 hover:to-indigo-400 transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 group">
              Coba Sekarang
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="/about/asuma"
              className="h-12 px-8 rounded-full bg-white/[0.06] border border-white/[0.12] text-white font-medium hover:bg-white/[0.1] transition-colors flex items-center justify-center backdrop-blur-sm"
            >
              Tentang Asuma
            </a>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 flex flex-col items-center gap-2 text-slate-600"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="w-5 h-8 rounded-full border-2 border-slate-700 flex items-start justify-center pt-1.5"
            >
              <div className="w-1 h-2 rounded-full bg-slate-600" />
            </motion.div>
          </motion.div>
        </section>

        {/* ── Statistics ──────────────────────────────────────────────────────── */}
        <section className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={<Code2 className="w-6 h-6 text-cyan-400" />} value={100} suffix="+" label="Commands" delay={0} />
            <StatCard icon={<Clock className="w-6 h-6 text-cyan-400" />} value={24} suffix="/7" label="Online" delay={0.1} />
            <StatCard icon={<UserCheck className="w-6 h-6 text-cyan-400" />} value={1000} suffix="+" label="Users" delay={0.2} />
            <StatCard icon={<TrendingUp className="w-6 h-6 text-cyan-400" />} value={30} suffix="+" label="Updates / Month" delay={0.3} />
          </div>
        </section>

        {/* ── Features ────────────────────────────────────────────────────────── */}
        <section className="py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">Fitur Unggulan</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Semua yang kamu butuhkan,<br className="hidden md:block" /> dalam satu bot.</h2>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto">Dari AI hingga game, dari downloader hingga manajemen grup — Asuma hadir lengkap.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard delay={0}    accent="bg-gradient-to-br from-cyan-500/10 to-transparent"   icon={<Bot className="w-6 h-6 text-cyan-400" />}        title="AI Assistant"          description="Tanya apa saja langsung di WhatsApp. Didukung model AI canggih untuk menjawab pertanyaan, meringkas, dan membantu produktivitas." />
            <FeatureCard delay={0.08} accent="bg-gradient-to-br from-indigo-500/10 to-transparent" icon={<Users className="w-6 h-6 text-indigo-400" />}     title="Group Management"      description="Kelola anggota, filter spam, atur izin, dan otomasi tugas admin grup dengan perintah sederhana." />
            <FeatureCard delay={0.16} accent="bg-gradient-to-br from-purple-500/10 to-transparent" icon={<Gamepad2 className="w-6 h-6 text-purple-400" />}  title="RPG & Games"           description="Nikmati permainan RPG, tebak kata, trivia, dan berbagai mini-game seru langsung dalam chat grup." />
            <FeatureCard delay={0.24} accent="bg-gradient-to-br from-pink-500/10 to-transparent"   icon={<Download className="w-6 h-6 text-pink-400" />}    title="Media Downloader"      description="Unduh video, audio, stiker, dan gambar dari berbagai platform populer hanya dengan mengirim link." />
            <FeatureCard delay={0.32} accent="bg-gradient-to-br from-amber-500/10 to-transparent"  icon={<Search className="w-6 h-6 text-amber-400" />}     title="Search Information"    description="Cari berita, cuaca, lirik lagu, definisi kata, dan informasi real-time tanpa keluar dari WhatsApp." />
            <FeatureCard delay={0.4}  accent="bg-gradient-to-br from-teal-500/10 to-transparent"   icon={<Zap className="w-6 h-6 text-teal-400" />}         title="Fast Response"         description="Dioptimalkan untuk latensi rendah dengan infrastruktur stabil agar bot selalu responsif sepanjang hari." />
          </div>
        </section>

        {/* ── About Developer ─────────────────────────────────────────────────── */}
        <section className="py-20 md:py-28 border-t border-white/[0.06]">
          <div className="flex flex-col md:flex-row gap-12 items-center">

            {/* Avatar side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="relative shrink-0 flex flex-col items-center"
            >
              <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-3xl scale-150" />
              <div className="relative w-36 h-36 rounded-3xl bg-gradient-to-br from-indigo-400 to-cyan-500 flex items-center justify-center shadow-2xl shadow-indigo-500/30 text-5xl font-black text-white">
                D
              </div>
              <div className="mt-4 text-center">
                <p className="font-bold text-white text-lg">Ditss</p>
                <p className="text-sm text-slate-500">Aditia · Developer</p>
              </div>
            </motion.div>

            {/* Text side */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">Tentang Pembuat</p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                  Dibuat oleh{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-cyan-300">
                    Ditss
                  </span>
                </h2>
              </div>
              <p className="text-slate-400 leading-relaxed text-base md:text-lg">
                Asuma dikembangkan oleh <span className="text-white font-medium">Ditss (Aditia)</span>, seorang
                developer yang berfokus pada pengembangan WhatsApp Bot, backend API, dan aplikasi web modern.
                Tujuan Asuma adalah menghadirkan solusi otomatisasi yang mudah digunakan dan bermanfaat bagi
                semua pengguna.
              </p>
              <ul className="space-y-3">
                {['WhatsApp Bot Development', 'Backend API & Node.js', 'Modern Web Applications'].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-3 text-slate-300 font-medium"
                  >
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="/about/ditss"
                  className="h-11 px-6 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-medium hover:bg-indigo-500/25 transition-colors flex items-center gap-2 text-sm"
                >
                  About Developer <ChevronRight className="w-4 h-4" />
                </a>
                <a
                  href="/about/asuma"
                  className="h-11 px-6 rounded-full bg-white/[0.05] border border-white/[0.1] text-white font-medium hover:bg-white/[0.1] transition-colors flex items-center gap-2 text-sm"
                >
                  About Asuma <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Why Choose Asuma ────────────────────────────────────────────────── */}
        <section className="py-20 md:py-28 border-t border-white/[0.06]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">Kenapa Asuma?</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Dipilih bukan tanpa alasan.
            </h2>
            <p className="mt-4 text-slate-400 max-w-lg mx-auto">Asuma dirancang agar benar-benar berguna, bukan sekadar terlihat keren.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <WhyCard delay={0}    icon={<Zap className="w-5 h-5 text-cyan-400" />}       title="Cepat & Stabil"          description="Respons instan dengan infrastruktur yang dioptimalkan untuk uptime tinggi sepanjang waktu." />
            <WhyCard delay={0.07} icon={<Sparkles className="w-5 h-5 text-cyan-400" />}  title="Banyak Fitur"            description="Lebih dari 100 perintah tersedia — satu bot untuk semua kebutuhan kamu di WhatsApp." />
            <WhyCard delay={0.14} icon={<Activity className="w-5 h-5 text-cyan-400" />}  title="Selalu Dikembangkan"     description="Update rutin setiap bulan menghadirkan fitur baru berdasarkan masukan pengguna langsung." />
            <WhyCard delay={0.21} icon={<MessageCircle className="w-5 h-5 text-cyan-400" />} title="Mudah Digunakan"     description="Perintah sederhana, dokumentasi jelas, dan tidak perlu instalasi apapun dari pengguna." />
            <WhyCard delay={0.28} icon={<Shield className="w-5 h-5 text-cyan-400" />}    title="Aman"                    description="Tidak menyimpan pesan pribadi. Privasi pengguna adalah prioritas dalam setiap fitur." />
            <WhyCard delay={0.35} icon={<Heart className="w-5 h-5 text-cyan-400" />}     title="Gratis Digunakan"        description="Semua fitur inti tersedia gratis. Tidak ada paywall tersembunyi untuk fungsi utama." />
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────────────── */}
        <section className="py-20 md:py-28 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/60 via-indigo-900/60 to-slate-900/80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent" />
            <div className="absolute inset-0 border border-cyan-500/20 rounded-3xl" />

            {/* Decorative bot icons */}
            <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative z-10 px-8 py-20 md:py-28 flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center mb-6 shadow-xl shadow-cyan-500/30"
              >
                <Bot className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight max-w-2xl">
                Siap mencoba <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">Asuma Bot?</span>
              </h2>
              <p className="mt-5 text-base md:text-lg text-slate-400 max-w-xl">
                Gunakan Asuma sekarang dan nikmati pengalaman WhatsApp yang lebih cerdas, praktis, dan menyenangkan.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <button className="h-13 px-9 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold hover:from-cyan-400 hover:to-indigo-400 transition-all shadow-xl shadow-cyan-500/30 flex items-center justify-center gap-2 group">
                  <Zap className="w-5 h-5" />
                  Mulai Sekarang
                </button>
                <a
                  href="/docs"
                  className="h-13 px-9 py-3 rounded-full bg-white/[0.08] border border-white/[0.15] text-white font-semibold hover:bg-white/[0.14] transition-colors flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Pelajari Lebih Lanjut
                </a>
              </div>
            </div>
          </motion.div>
        </section>

      </main>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/[0.06] bg-slate-950/60 backdrop-blur-sm pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
            {/* Brand */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="font-extrabold text-xl tracking-tight text-white">Asuma</span>
              </div>
              <p className="text-slate-500 max-w-xs text-sm leading-relaxed">
                WhatsApp Bot modern yang dirancang untuk membantu produktivitas, hiburan, dan otomatisasi dalam satu platform.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Navigasi</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                {[
                  { label: 'Home', href: '/', icon: Home },
                  { label: 'About', href: '/about', icon: UserCheck },
                  { label: 'Documentation', href: '/docs', icon: BookOpen },
                ].map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a href={href} className="flex items-center gap-2 hover:text-white transition-colors">
                      <Icon className="w-4 h-4" /> {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Tautan</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                {[
                  { label: 'GitHub', href: 'https://github.com', icon: Github },
                  { label: 'Contact', href: '/contact', icon: Mail },
                ].map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a href={href} className="flex items-center gap-2 hover:text-white transition-colors" target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                      <Icon className="w-4 h-4" /> {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
            <p>© {new Date().getFullYear()} Asuma. All rights reserved.</p>
            <p className="text-slate-700 text-xs">
              Developed with <Heart className="w-3 h-3 inline text-red-500/70" /> by Ditss · asuma.my.id
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
