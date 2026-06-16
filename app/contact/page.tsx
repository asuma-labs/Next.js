'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Mail, 
  MessageCircle, 
  Github, 
  Send,
  CheckCircle,
  AlertCircle,
  User,
  AtSign,
  FileText,
  Phone,
  Clock,
  Smartphone
} from 'lucide-react';
import { apiFetch } from '@/lib/auth';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res = await apiFetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      if (res.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setError(res.error || 'Gagal mengirim pesan');
      }
    } catch (err) {
      setError('Gagal mengirim pesan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      label: 'WhatsApp Business',
      value: '+44 7920 601019',
      href: 'https://wa.me/message/WMS27AAA5BQHL1',
      color: 'text-green-500',
      bg: 'bg-green-500/10 border-green-500/20',
      description: 'Chat langsung dengan tim kami',
    },
    {
      icon: Phone,
      label: 'Nomor WhatsApp',
      value: '+44 7920 601019',
      href: 'https://wa.me/447920601019',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      description: 'Hubungi via nomor ini',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'support@asuma.my.id',
      href: 'mailto:support@asuma.my.id',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10 border-blue-500/20',
      description: 'Email untuk pertanyaan serius',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'asuma-labs',
      href: 'https://github.com/asuma-labs',
      color: 'text-zinc-700 dark:text-zinc-300',
      bg: 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700',
      description: 'Lihat source code & kontribusi',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-slate-100 to-indigo-50/50 dark:from-[#060D1F] dark:via-[#0A1628] dark:to-[#0D1B2E] text-zinc-900 dark:text-white transition-colors duration-300 p-6 pt-24 pb-24 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl opacity-75 dark:opacity-100" />
        <div className="absolute bottom-0 right-1/4 w-96 h-64 rounded-full bg-indigo-500/10 blur-3xl opacity-75 dark:opacity-100" />
      </div>

      <div className="w-full max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/" className="inline-flex items-center text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors mb-8 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-600 via-indigo-600 to-sky-600 dark:from-cyan-300 dark:via-sky-200 dark:to-indigo-300 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Punya pertanyaan, saran, atau laporan masalah? Hubungi kami melalui salah satu channel di bawah ini.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm text-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-green-500/20">
                <Phone className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Hubungi Langsung</p>
                <a 
                  href="https://wa.me/447920601019" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xl font-bold text-green-600 dark:text-green-400 hover:underline flex items-center gap-2"
                >
                  +44 7920 601019
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-zinc-300 dark:bg-zinc-700" />
            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Fast Response · <span className="font-medium">Chat Now</span></span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
        >
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <a
                key={index}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className={`p-6 rounded-2xl border ${method.bg} bg-white/60 dark:bg-zinc-900/40 backdrop-blur-sm hover:scale-105 transition-transform duration-200 flex items-start gap-4 group`}
              >
                <div className={`p-3 rounded-xl ${method.bg} shrink-0`}>
                  <div className={method.color}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-zinc-900 dark:text-white">{method.label}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5 font-mono">{method.value}</p>
                  {method.description && (
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">{method.description}</p>
                  )}
                </div>
              </a>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 mb-10 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10">
              <Clock className="w-5 h-5 text-cyan-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-white">Jam Operasional</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Senin - Jumat, 09:00 - 21:00 WIB</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-zinc-600 dark:text-zinc-400">Fast Response</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-8 rounded-3xl bg-white/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm shadow-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-cyan-500" />
            Kirim Pesan
          </h2>

          {isSuccess && (
            <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span>Pesan berhasil dikirim! Kami akan merespon secepatnya.</span>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                    placeholder="Nama Anda"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Nomor WhatsApp <span className="text-zinc-400 text-xs font-normal">(opsional)</span>
              </label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                  placeholder="Contoh: +447920601019"
                />
              </div>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1.5">
                📱 Isi jika ingin dihubungi via WhatsApp untuk respons lebih cepat
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Subjek <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                  placeholder="Subjek pesan"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Pesan <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all resize-none"
                placeholder="Tulis pesan Anda di sini..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold hover:from-cyan-400 hover:to-indigo-400 transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  Mengirim...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Terkirim!
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Kirim Pesan
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-4 text-center">
            Kami akan merespon pesan Anda dalam 1x24 jam.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
