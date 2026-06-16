'use client';

import { Crown, Coins, Zap, Sword, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function PublicProfile({ publicData, username }: { publicData: any, username: string }) {
  const { profile, economy, games, social } = publicData;
  const formatNumber = (num: number) => new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(num || 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-gradient-to-br from-zinc-50 via-slate-100 to-indigo-50/50 dark:from-[#060D1F] dark:via-[#0A1628] dark:to-[#0D1B2E] transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-550 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
          </Link>
        </motion.div>

        {/* Banner & Header Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/70 dark:bg-zinc-90 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-3xl overflow-hidden shadow-sm backdrop-blur-xs"
        >
          <div className="h-48 md:h-64 bg-zinc-200 dark:bg-zinc-805 relative w-full overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-400 to-indigo-550 opacity-80" />
            <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/asuma/1920/1080')] opacity-50 mix-blend-overlay object-cover w-full h-full" />
          </div>
          
          <div className="px-6 md:px-10 pb-10">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-end -mt-20 md:-mt-24 mb-6 relative">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-4 border-white dark:border-zinc-900 bg-white dark:bg-zinc-800 overflow-hidden shadow-xl shrink-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={profile.profilePic || `https://api.dicebear.com/7.x/notionists/svg?seed=${username}`} alt={profile.name} className="w-full h-full object-cover" />
              </motion.div>
              <div className="flex-1 text-center md:text-left pt-4">
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">{profile.name}</h1>
                  {profile.vip && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-450 text-xs font-bold border border-amber-200 dark:border-amber-805/50">
                      <Crown className="w-3.5 h-3.5" /> VIP
                    </span>
                  )}
                </div>
                <p className="text-zinc-500 font-medium">@{username.toLowerCase()}</p>
              </div>
              
              <div className="flex gap-3 mt-4 md:mt-0">
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold text-sm hover:opacity-90 transition-opacity shadow-xs"
                >
                  Follow
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800/50 font-semibold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-xs"
                >
                  Message
                </motion.button>
              </div>
            </div>
            
            <p className="text-zinc-750 dark:text-zinc-300 max-w-2xl text-center md:text-left leading-relaxed">
              {profile.bio || 'This user has not set a bio yet.'}
            </p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mt-6 pt-6 border-t border-zinc-150 dark:border-zinc-800/80">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-zinc-900 dark:text-white">{formatNumber(social?.following || 0)}</span>
                <span className="text-zinc-500 text-sm font-medium">Following</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-zinc-900 dark:text-white">{formatNumber(social?.followers || 0)}</span>
                <span className="text-zinc-500 text-sm font-medium">Followers</span>
              </div>
              <div className="flex items-center gap-2">
                 <span className="font-bold text-lg text-zinc-900 dark:text-white">{formatNumber(profile.profileViews || 0)}</span>
                 <span className="text-zinc-500 text-sm font-medium">Profile Views</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <motion.div variants={itemVariants}>
              <StatCard icon={Coins} title="Balance" value={`Rp ${formatNumber(economy.money)}`} subtle="Coins in wallet" color="emerald" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard icon={Zap} title="Energy Limit" value={formatNumber(economy.limit)} subtle="Daily stamina" color="sky" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard icon={Sword} title="Battles Won" value={formatNumber(games.rpgWins)} subtle="RPG stats" color="violet" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard icon={Crown} title="Dungeons" value={formatNumber(games.dungeonWins)} subtle="Cleared floors" color="amber" />
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-center min-h-[200px]"
          >
            <div className="relative z-10 flex flex-col items-center text-center gap-2">
              <span className="text-sm font-bold uppercase tracking-widest opacity-70">Current Level</span>
              <span className="text-7xl font-black tracking-tighter">{economy.level || 1}</span>
              <div className="w-full h-2 bg-white/20 dark:bg-zinc-900/20 rounded-full mt-4 overflow-hidden">
                 <div className="h-full bg-white dark:bg-zinc-900 rounded-full" style={{ width: `${Math.min(((economy.exp || 0) / (economy.level * 100)) * 100, 100)}%` }} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest opacity-60 mt-1">{economy.exp || 0} / {economy.level * 100} XP</span>
            </div>
            {/* Background flourish */}
            <div className="absolute top-0 right-0 p-12 opacity-5 translate-x-12 -translate-y-12 pattern-grid-lg" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, subtle, color }: any) {
  const colorStyles: any = {
    emerald: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-400/10 border-emerald-200 dark:border-emerald-400/25',
    sky: 'text-sky-600 bg-sky-50 dark:text-sky-400 dark:bg-sky-400/10 border-sky-200 dark:border-sky-400/25',
    violet: 'text-violet-600 bg-violet-50 dark:text-violet-400 dark:bg-violet-400/10 border-violet-200 dark:border-violet-400/25',
    amber: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-400/10 border-amber-200 dark:border-amber-400/25',
  };

  return (
    <motion.div 
      whileHover={{ y: -5, transition: { duration: 0.18 } }}
      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${colorStyles[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-zinc-500 font-medium text-sm mb-1">{title}</p>
        <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{value}</p>
        <p className="text-xs text-zinc-400 mt-1">{subtle}</p>
      </div>
    </motion.div>
  );
}
