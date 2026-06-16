"use client";

import { User, Users, Trophy, Wallet, Gamepad2 } from "lucide-react";

export default function PublicProfileView({ userData }: { userData: any }) {
  const { profile, economy, games, social } = userData;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
            {profile.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              {profile.name}
              {profile.vip && <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-500/30">VIP</span>}
            </h1>
            <p className="text-slate-400 text-sm mt-1">{profile.bio || "Player Asuma MD"}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-800">
          <StatItem label="Pengikut" value={social.followers} icon={<Users className="w-4 h-4 text-blue-400" />} />
          <StatItem label="Level" value={economy.level} icon={<Trophy className="w-4 h-4 text-yellow-400" />} />
          <StatItem label="Dilihat" value={profile.profileViews} icon={<User className="w-4 h-4 text-purple-400" />} />
        </div>
      </div>

      {/* Games Stats */}
      <div>
        <h3 className="text-sm font-semibold text-slate-400 mb-3 flex items-center gap-2">
          <Gamepad2 className="w-4 h-4" /> Statistik Permainan
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <GameCard title="RPG Wins" value={games.rpgWins} color="text-green-400" bg="bg-green-500/10" />
          <GameCard title="Dungeon Wins" value={games.dungeonWins} color="text-red-400" bg="bg-red-500/10" />
          <GameCard title="Casino Wins" value={games.casinoWins} color="text-pink-400" bg="bg-pink-500/10" />
          <GameCard title="Total EXP" value={economy.exp.toLocaleString()} color="text-blue-400" bg="bg-blue-500/10" />
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-900/20 active:scale-95">
        Ikuti Pengguna
      </button>
    </div>
  );
}

function StatItem({ label, value, icon }: any) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-1">{icon}</div>
      <div className="font-bold text-lg text-white">{value.toLocaleString()}</div>
      <div className="text-xs text-slate-500 uppercase tracking-wider">{label}</div>
    </div>
  );
}

function GameCard({ title, value, color, bg }: any) {
  return (
    <div className={`p-4 rounded-2xl border border-slate-800 bg-slate-900/50 ${bg}`}>
      <p className="text-xs text-slate-400 mb-1">{title}</p>
      <p className={`text-xl font-bold ${color}`}>{value.toLocaleString()}</p>
    </div>
  );
}
