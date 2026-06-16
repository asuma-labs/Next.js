"use client";

import { Wallet, TrendingUp, Gift, Settings, LogOut } from "lucide-react";
import { removeToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function DashboardView({ userData }: { userData: any }) {
  const router = useRouter();
  const { profile, economy } = userData;

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-900/20">
        <p className="text-blue-100 text-sm font-medium">Selamat datang kembali,</p>
        <h1 className="text-3xl font-bold mt-1">{profile.name}! 👋</h1>
        <div className="mt-6 flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
          <div>
            <p className="text-blue-100 text-xs">Saldo Asuma</p>
            <p className="text-2xl font-bold">Rp {economy.money?.toLocaleString("id-ID") || 0}</p>
          </div>
          <Wallet className="w-8 h-8 text-white/80" />
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
        <ActionButton 
          icon={<TrendingUp className="w-6 h-6 text-green-400" />} 
          title="Trading" 
          desc="Belajar crypto real-time" 
          onClick={() => router.push("/trading")} 
        />
        <ActionButton 
          icon={<Gift className="w-6 h-6 text-orange-400" />} 
          title="Daily Claim" 
          desc="Ambil hadiah harianmu" 
          onClick={() => alert("Fitur claim coming soon!")} 
        />
        <ActionButton 
          icon={<Settings className="w-6 h-6 text-slate-400" />} 
          title="Pengaturan" 
          desc="Edit profil & password" 
          onClick={() => router.push("/settings")} 
        />
        <button 
          onClick={handleLogout}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-red-500/50 transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <LogOut className="w-5 h-5 text-red-500" />
          </div>
          <p className="font-bold text-sm text-slate-200">Keluar</p>
          <p className="text-xs text-slate-500 mt-1">Akhiri sesi ini</p>
        </button>
      </div>

      {/* Info Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <h3 className="text-sm font-semibold text-slate-400 mb-2">Info Akun</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Serial Number</span>
            <span className="text-slate-300 font-mono">{profile.serialNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Referral Code</span>
            <span className="text-blue-400 font-mono cursor-pointer hover:underline">{profile.referralCode}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, title, desc, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all text-left group"
    >
      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <p className="font-bold text-sm text-slate-200">{title}</p>
      <p className="text-xs text-slate-500 mt-1">{desc}</p>
    </button>
  );
}
