// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bot, Download, Zap, Shield, Loader2, Crown } from 'lucide-react';
import { apiFetch, getToken } from '@/lib/auth';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Cek apakah user sudah login
    if (!getToken()) {
      router.push('/login');
      return;
    }

    // Ambil data user dari backend
    const fetchUserData = async () => {
      try {
        const res = await apiFetch('/api/dashboard/me');
        if (res.success) {
          setUserData(res.data);
        }
      } catch (error) {
        console.error('Gagal ambil data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="text-center py-20">
        <p className="text-foreground/60">Gagal memuat data. Silakan login ulang.</p>
      </div>    );
  }

  const { profile, economy } = userData;

  const stats = [
    { label: 'Level', value: economy?.level || 1, icon: Crown, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { label: 'Money', value: `Rp ${(economy?.money || 0).toLocaleString('id-ID')}`, icon: Download, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Limit', value: economy?.limit || 0, icon: Zap, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Status', value: profile?.vip ? 'VIP' : 'Regular', icon: Shield, color: profile?.vip ? 'text-purple-500' : 'text-gray-500', bg: profile?.vip ? 'bg-purple-500/10' : 'bg-gray-500/10' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Halo, {profile?.name || 'User'}! 👋</h1>
          <p className="text-foreground/60 mt-1">Serial Number: <span className="font-mono text-sm bg-accent px-2 py-0.5 rounded">{profile?.serialNumber || 'N/A'}</span></p>
        </div>
        {profile?.vip && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-600 dark:text-yellow-400 text-sm font-semibold border border-yellow-500/20">
            <Crown className="w-4 h-4" /> Premium Member
          </span>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="p-6 rounded-2xl border border-border bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
              <p className="text-sm text-foreground/60 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Profile Info Card */}
      <div className="p-6 rounded-2xl border border-border bg-background/50">
        <h2 className="text-lg font-semibold text-foreground mb-4">Informasi Profil</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>            <label className="text-xs font-medium text-foreground/50 uppercase tracking-wider">Bio</label>
            <p className="text-foreground mt-1">{profile?.bio || 'Belum ada bio'}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-foreground/50 uppercase tracking-wider">Referral Code</label>
            <p className="text-foreground mt-1 font-mono">{profile?.referralCode || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
