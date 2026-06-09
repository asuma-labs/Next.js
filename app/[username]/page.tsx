import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Crown, Coins, Zap, Sword, ShieldAlert, ArrowLeft, Eye, Users, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  
  // Mocking profile data for the template since the actual API needs a real backend
  const data = {
    success: true,
    data: {
      profile: {
        name: username.charAt(0).toUpperCase() + username.slice(1),
        bio: 'Tech enthusiast and open source contributor. Love building with Next.js.',
        vip: true,
        profileViews: 12543,
      },
      economy: {
        level: 84,
        money: 2500000,
        limit: 500,
      },
      games: {
        rpgWins: 342,
        dungeonWins: 120,
        casinoWins: 45
      },
      social: {
        followers: 1200,
        following: 54
      }
    }
  };

  const { profile, economy, games, social } = data.data;
  const formatNumber = (num: number) => new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(num);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
        </Link>

        {/* Banner & Header Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
          <div className="h-48 md:h-64 bg-zinc-200 dark:bg-zinc-800 relative w-full overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-400 to-indigo-500 opacity-80" />
            <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/asuma/1920/1080')] opacity-50 mix-blend-overlay object-cover w-full h-full" />
          </div>
          
          <div className="px-6 md:px-10 pb-10">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-end -mt-20 md:-mt-24 mb-6 relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-4 border-white dark:border-zinc-900 bg-white dark:bg-zinc-800 overflow-hidden shadow-xl shrink-0">
                <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${username}`} alt={profile.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-center md:text-left pt-4">
                <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{profile.name}</h1>
                  {profile.vip && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold border border-amber-200 dark:border-amber-800/50">
                      <Crown className="w-3.5 h-3.5" /> VIP
                    </span>
                  )}
                </div>
                <p className="text-zinc-500 font-medium">@{username.toLowerCase()}</p>
              </div>
              
              <div className="flex gap-3 mt-4 md:mt-0">
                <button className="px-6 py-2.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium text-sm hover:opacity-90 transition-opacity">
                  Follow
                </button>
                <button className="px-6 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-700 font-medium text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                  Message
                </button>
              </div>
            </div>
            
            <p className="text-zinc-700 dark:text-zinc-300 max-w-2xl text-center md:text-left leading-relaxed">
              {profile.bio}
            </p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg">{formatNumber(social.following)}</span>
                <span className="text-zinc-500 text-sm">Following</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg">{formatNumber(social.followers)}</span>
                <span className="text-zinc-500 text-sm">Followers</span>
              </div>
              <div className="flex items-center gap-2">
                 <span className="font-semibold text-lg">{formatNumber(profile.profileViews)}</span>
                 <span className="text-zinc-500 text-sm">Profile Views</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard icon={Coins} title="Balance" value={`$${formatNumber(economy.money)}`} subtle="Coins in wallet" color="emerald" />
            <StatCard icon={Zap} title="Energy Limit" value={formatNumber(economy.limit)} subtle="Daily stamina" color="sky" />
            <StatCard icon={Sword} title="Battles Won" value={formatNumber(games.rpgWins)} subtle="RPG stats" color="violet" />
            <StatCard icon={Crown} title="Dungeons" value={formatNumber(games.dungeonWins)} subtle="Cleared floors" color="amber" />
          </div>
          
          <div className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-center min-h-[200px]">
            <div className="relative z-10 flex flex-col items-center text-center gap-2">
              <span className="text-sm font-semibold uppercase tracking-widest opacity-70">Current Level</span>
              <span className="text-7xl font-black tracking-tighter">{economy.level}</span>
              <div className="w-full h-2 bg-white/20 dark:bg-zinc-900/20 rounded-full mt-4 overflow-hidden">
                 <div className="h-full bg-white dark:bg-zinc-900 w-3/4 rounded-full" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest opacity-60 mt-1">2,400 / 3,000 XP</span>
            </div>
            {/* Background flourish */}
            <div className="absolute top-0 right-0 p-12 opacity-5 translate-x-12 -translate-y-12 pattern-grid-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, subtle, color }: any) {
  const colorStyles: any = {
    emerald: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-400/10 border-emerald-200 dark:border-emerald-400/20',
    sky: 'text-sky-600 bg-sky-50 dark:text-sky-400 dark:bg-sky-400/10 border-sky-200 dark:border-sky-400/20',
    violet: 'text-violet-600 bg-violet-50 dark:text-violet-400 dark:bg-violet-400/10 border-violet-200 dark:border-violet-400/20',
    amber: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-400/10 border-amber-200 dark:border-amber-400/20',
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 flex flex-col gap-4 shadow-sm hover:translate-y-[-2px] transition-transform">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${colorStyles[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-zinc-500 font-medium text-sm mb-1">{title}</p>
        <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{value}</p>
        <p className="text-xs text-zinc-400 mt-1">{subtle}</p>
      </div>
    </div>
  );
}
