// app/[username]/_components/PublicProfileView.tsx
'use client';

import { User, Crown, Trophy, Users, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface PublicProfileViewProps {
  userData: {
    profile: {
      name: string;
      bio: string;
      vip: boolean;
      profilePic: string | null;
      banner: string | null;
      profileViews: number;
    };
    economy: {
      level: number;
      exp: number;
    };
    games: {
      rpgWins: number;
      dungeonWins: number;
      casinoWins: number;
    };
    social: {
      followers: number;
      following: number;
    };
  };
}

export default function PublicProfileView({ userData }: PublicProfileViewProps) {
  const { profile, economy, games, social } = userData;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="p-4 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700">
          <User className="w-12 h-12 text-zinc-600 dark:text-zinc-300" />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            {profile.name}
            {profile.vip && (
              <Crown className="w-5 h-5 text-amber-500" />
            )}
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            {profile.bio || 'Player Asuma MD'}
          </p>
          <div className="flex items-center gap-4 mt-2 text-sm text-zinc-400">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {social.followers} followers
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {profile.profileViews || 0} views
            </span>
          </div>
        </div>
        {profile.vip && (
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-700 dark:text-amber-400 text-sm font-semibold border border-amber-500/20">
            <Crown className="w-4 h-4" /> Premium
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-center">
          <h3 className="text-sm font-medium text-zinc-500">Level</h3>
          <p className="mt-2 text-3xl font-bold">{economy.level || 1}</p>
          <p className="text-xs text-zinc-400 mt-1">Exp: {economy.exp || 0}</p>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-center">
          <h3 className="text-sm font-medium text-zinc-500">RPG Wins</h3>
          <p className="mt-2 text-3xl font-bold">{games.rpgWins || 0}</p>
          <p className="text-xs text-zinc-400 mt-1">🏆 Dungeon: {games.dungeonWins || 0}</p>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-center">
          <h3 className="text-sm font-medium text-zinc-500">Casino Wins</h3>
          <p className="mt-2 text-3xl font-bold">{games.casinoWins || 0}</p>
          <p className="text-xs text-zinc-400 mt-1">🎰 Total games</p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
        <p className="text-sm text-zinc-500">
          Ini adalah profile publik dari {profile.name}
        </p>
      </div>
    </motion.div>
  );
}
