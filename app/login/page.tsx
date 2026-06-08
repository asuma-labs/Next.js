// app/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2, Smartphone, KeyRound, ArrowLeft } from 'lucide-react';
import { API_URL, setToken } from '@/lib/auth';

export default function LoginPage() {
  const [method, setMethod] = useState<'password' | 'otp'>('password');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (method === 'password') {
        const res = await fetch(`${API_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, password }),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error || 'Login gagal');
        
        setToken(data.token);
        window.location.href = '/dashboard'; // Hard redirect agar cookie terbaca
      } else {
        if (!otpSent) {
          const res = await fetch(`${API_URL}/api/auth/request-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone }),
          });
          const data = await res.json();
          if (!data.success) throw new Error(data.error || 'Gagal kirim OTP');
          setOtpSent(true);
          setIsLoading(false);
          return; 
        } else {
          const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },            body: JSON.stringify({ phone, otp }),
          });
          const data = await res.json();
          if (!data.success) throw new Error(data.error || 'OTP salah');
          
          setToken(data.token);
          window.location.href = '/dashboard'; // Hard redirect agar cookie terbaca
        }
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Home
        </Link>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-foreground/60">Masuk ke dashboard Asuma Bot kamu</p>
        </div>

        <div className="bg-background border border-border rounded-2xl p-6 shadow-xl">
          <div className="flex p-1 bg-accent rounded-xl mb-6">
            <button
              onClick={() => { setMethod('password'); setOtpSent(false); setError(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                method === 'password' ? 'bg-background text-foreground shadow-sm' : 'text-foreground/60'
              }`}
            >
              <KeyRound className="w-4 h-4" /> Password
            </button>
            <button
              onClick={() => { setMethod('otp'); setOtpSent(false); setError(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                method === 'otp' ? 'bg-background text-foreground shadow-sm' : 'text-foreground/60'
              }`}
            >
              <Smartphone className="w-4 h-4" /> OTP
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1.5">Nomor WhatsApp</label>
              <input
                type="text"
                placeholder="Contoh: 628123456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                required
              />
            </div>

            {method === 'password' && (
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">Password</label>
                <input
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  required
                />
              </div>
            )}

            {method === 'otp' && otpSent && (
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">Kode OTP</label>
                <input
                  type="text"
                  placeholder="6 digit kode"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  maxLength={6}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all tracking-widest text-center text-lg font-bold"
                  required
                />
                <p className="text-xs text-foreground/50 mt-2 text-center">
                  Kode sudah dikirim ke WhatsApp kamu.
                </p>
              </div>
            )}

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm text-center font-medium">
                {error.replace(/_/g, ' ').toUpperCase()}
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                otpSent && method === 'otp' ? 'Verifikasi OTP' : 'Masuk'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
