'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2, Smartphone, KeyRound, ArrowLeft, Terminal } from 'lucide-react';
import { setToken } from '@/lib/auth';
import { motion } from 'motion/react';

export default function LoginPage() {
  const [method, setMethod] = useState<'password' | 'otp'>('password');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (method === 'password') {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, password }),
        });
        
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error(`Server returned unexpected response (Status: ${res.status}). Please try again later.`);
        }
        
        const data = await res.json();
        if (!data.success) throw new Error(data.error || data.message || 'Login failed');
        
        const token = data.token || (data.data && data.data.token);
        if (!token) throw new Error('Authentication token not received from server.');
        
        setToken(token);
        router.push('/dashboard');
        
      } else {
        if (!otpSent) {
          const res = await fetch('/api/auth/request-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone }),
          });
          
          const contentType = res.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
              throw new Error(`Server returned unexpected response (Status: ${res.status}). Please try again later.`);
          }
          
          const data = await res.json();
          if (!data.success) throw new Error(data.error || data.message || 'Failed to send OTP');
          
          setOtpSent(true);
          setIsLoading(false);
          return;
          
        } else {
          const res = await fetch('/api/auth/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone, otp }),
          });
          
          const contentType = res.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
              throw new Error(`Server returned unexpected response (Status: ${res.status}). Please try again later.`);
          }
          
          const data = await res.json();
          if (!data.success) throw new Error(data.error || data.message || 'Invalid OTP');
          
          const token = data.token || (data.data && data.data.token);
          if (!token) throw new Error('Authentication token not received from server.');

          setToken(token);
          router.push('/dashboard');
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-200/40 via-white to-white dark:from-white/5 dark:via-zinc-950 dark:to-zinc-950 -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[400px] flex flex-col gap-8 relative z-10"
      >
        <div className="flex flex-col gap-2 relative">
            <Link href="/" className="absolute -top-12 left-0 inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
            </Link>
          <div className="w-12 h-12 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl flex items-center justify-center font-bold text-xl mb-2 shadow-lg">
            <Terminal strokeWidth={2.5} className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Sign In
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">Access your Asuma Bot dashboard</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-zinc-900/5 dark:shadow-black/20">
          <div className="flex p-1 bg-zinc-100 dark:bg-zinc-950 rounded-xl mb-6 relative">
            <button onClick={() => { setMethod('password'); setOtpSent(false); setError(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all relative z-10 ${method === 'password' ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}>
              <KeyRound className="w-4 h-4" /> Password
            </button>
            <button onClick={() => { setMethod('otp'); setOtpSent(false); setError(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all relative z-10 ${method === 'otp' ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}>
              <Smartphone className="w-4 h-4" /> OTP
            </button>
             <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 transition-all duration-300 ease-out ${method === 'password' ? 'left-1' : 'left-[calc(50%+2px)]'}`} />
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium block text-zinc-700 dark:text-zinc-300">WhatsApp Number</label>
              <input type="text" placeholder="e.g. 62812..." value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white focus:border-transparent outline-none transition-all"
                required />
            </div>

            {method === 'password' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-1.5">
                <label className="text-sm font-medium block text-zinc-700 dark:text-zinc-300">Password</label>
                <input type="password" placeholder="••••••••" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white focus:border-transparent outline-none transition-all"
                  required />
              </motion.div>
            )}

            {method === 'otp' && otpSent && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-1.5">
                <label className="text-sm font-medium block text-zinc-700 dark:text-zinc-300">Verification Code</label>
                <input type="text" placeholder="------" value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  maxLength={6}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white focus:border-transparent outline-none transition-all text-center tracking-[0.5em] font-mono text-xl"
                  required />
                <p className="text-xs text-zinc-500 mt-2 text-center">Code sent via WhatsApp.</p>
              </motion.div>
            )}

            {error && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm text-center font-medium">
                {error.replace(/_/g, ' ')}
              </motion.div>
            )}

            <button type="submit" disabled={isLoading}
              className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-medium rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (otpSent && method === 'otp' ? 'Complete Verification' : 'Continue')}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
