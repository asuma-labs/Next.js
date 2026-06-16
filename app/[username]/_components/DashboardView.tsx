// app/[username]/_components/DashboardView.tsx
'use client';

import { Crown, Download, Zap, Shield } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardViewProps {
  userData: {
    profile: {
      name: string;
      vip: boolean;
      ban: boolean;
      age: number;
      bio: string;
      serialNumber: string;
      referralCode: string;
      hasPassword: boolean;
    };
    economy: {
      limit: number;
      money: number;
      exp: number;
      level: number;
      bank: number;
      dailyStreak: number;
    };
    tracking: any;
  };
}

export default function DashboardView({ userData }: DashboardViewProps) {
  const { profile, economy } = userData;

  const stats = [
    { 
      label: 'Level', 
      value: economy?.level || 1, 
      icon: Crown, 
      color: 'text-amber-500', 
      bg: 'bg-amber-50 dark:bg-amber-500/10' 
    },
    { 
      label: 'Money', 
      value: `Rp ${(economy?.money || 0).toLocaleString('id-ID')}`, 
      icon: Download, 
      color: 'text-green-500', 
      bg: 'bg-green-50 dark:bg-green-500/10' 
    },
    { 
      label: 'Limit', 
      value: economy?.limit || 0, 
      icon: Zap, 
      color: 'text-sky-500', 
      bg: 'bg-sky-50 dark:bg-sky-500/10' 
    },
    { 
      label: 'Status', 
      value: profile?.vip ? 'VIP' : 'Regular', 
      icon: Shield, 
      color: profile?.vip ? 'text-purple-500' : 'text-zinc-500', 
      bg: profile?.vip ? 'bg-purple-50 dark:bg-purple-500/10' : 'bg-zinc-100 dark:bg-zinc-800' 
    },
  ];

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6"
      >
        <div>
          <h1 className="text-3xl tracking-tight font-bold">Hello, {profile?.name || 'User'}! 👋</h1>
          <p className="text-zinc-500 mt-2 flex items-center gap-2">
            Serial: <span className="font-mono text-sm bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-700">{profile?.serialNumber || 'N/A'}</span>
          </p>
        </div>
        {profile?.vip && (
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-700 dark:text-amber-400 text-sm font-semibold border border-amber-500/20">
            <Crown className="w-4 h-4" /> Premium Member
          </div>
        )}
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
              <p className="text-sm text-zinc-500 mt-1">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm"
      >
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          Profile Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2 block">Biography</label>
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
              <p className="text-sm leading-relaxed">{profile?.bio || 'No bio set.'}</p>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2 block">Referral Code</label>
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <code className="font-mono text-sm text-zinc-800 dark:text-zinc-200">
                {profile?.referralCode || 'N/A'}
              </code>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(profile?.referralCode || '');
                }}
                className="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors uppercase tracking-wider"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
