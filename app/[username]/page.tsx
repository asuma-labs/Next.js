// app/[username]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Crown, Coins, Zap, Sword, ShieldAlert, ArrowLeft, Eye, Users, UserPlus } from 'lucide-react';
import { API_URL } from '@/lib/config'; 
import Link from 'next/link';

const DEFAULT_AVATAR_URL = 'https://asuma.my.id/icons/default-profile.jpg';
const DEFAULT_BANNER_URL = 'https://asuma.my.id/icons/default-banner.jpg';

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  
  try {
    const res = await fetch(`${API_URL}/api/profile/${username}`, { cache: 'no-store' });
    const data = await res.json();

    if (data.success) {
      const user = data.data.profile;
      const eco = data.data.economy;
      const social = data.data.social;
      
      const imageUrl = user.profilePic ? `https://asuma.my.id/${user.profilePic}` : DEFAULT_AVATAR_URL;

      return {
        title: `${user.name} (@${username}) | Asuma Bot Profile`,
        description: user.bio || `Player Asuma MD | Level ${eco.level} | ${social.followers} Followers`,
        openGraph: {
          title: `${user.name} | Asuma Bot`,
          description: user.bio || `Player Asuma Bot - Level ${eco.level}`,
          url: `https://asuma.my.id/${username}`,
          type: 'profile',
          images: [
            {
              url: imageUrl,
              width: 512,
              height: 512,
              alt: `${user.name} Profile Picture`,
            },
          ],
        },
        twitter: {
          card: 'summary_large_image',
          title: `${user.name} | Asuma Bot`,
          description: user.bio || `Player Asuma Bot - Level ${eco.level}`,
          images: [imageUrl],
        },
      };
    }
  } catch (error) {    console.error('Failed to fetch metadata:', error);
  }

  return {
    title: 'User Tidak Ditemukan | Asuma Bot',
    description: 'Profil pengguna yang Anda cari tidak terdaftar di Asuma Bot.',
  };
}

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  const res = await fetch(`${API_URL}/api/profile/${username}`, { 
    cache: 'no-store' 
  });
  
  const data = await res.json();

  if (!data.success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-background">
        <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-6">
          <ShieldAlert className="w-10 h-10 text-foreground/40" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">User Tidak Ditemukan</h1>
        <p className="text-foreground/60 mb-8 max-w-md">
          Username <span className="font-mono bg-accent px-2 py-0.5 rounded text-foreground/80">{username}</span> tidak terdaftar di database Asuma.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Home
        </Link>
      </div>
    );
  }

  const { profile, economy, games, social } = data.data;
  const formatNumber = (num: number) => new Intl.NumberFormat('id-ID').format(num);
  
  const avatarUrl = profile.profilePic ? `https://asuma.my.id/${profile.profilePic}` : '/icons/default-profile.jpg';
  const bannerUrl = profile.banner ? `https://asuma.my.id/${profile.banner}` : '/icons/default-banner.jpg';

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <Link 
          href="/"           className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Home
        </Link>

        {/* Banner + Profile Header */}
        <div className="relative overflow-hidden rounded-3xl border border-border bg-background/50 backdrop-blur-md">
          {/* Banner */}
          <div className="relative h-48 md:h-56 overflow-hidden">
            <img 
              src={bannerUrl} 
              alt="Banner" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>

          {/* Profile Info */}
          <div className="relative px-6 md:px-8 pb-6 -mt-16">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-4">
              {/* Avatar */}
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-4 border-background bg-accent shadow-xl shrink-0">
                <img 
                  src={avatarUrl} 
                  alt={profile.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left md:pb-2">
                <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">{profile.name}</h1>
                  {profile.vip && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-600 dark:text-yellow-400 text-xs font-bold border border-yellow-500/20">
                      <Crown className="w-3.5 h-3.5" /> VIP
                    </span>
                  )}
                </div>
                
                <p className="text-foreground/70 text-base leading-relaxed max-w-xl">
                  {profile.bio || 'Player Asuma MD'}
                </p>

                {/* Social Stats */}
                <div className="flex items-center justify-center md:justify-start gap-6 mt-4 text-sm">
                  <span className="flex items-center gap-1.5 text-foreground/60">
                    <Users className="w-4 h-4" /> 
                    <span className="font-semibold text-foreground">{social.followers}</span> Followers
                  </span>                  <span className="flex items-center gap-1.5 text-foreground/60">
                    <UserPlus className="w-4 h-4" /> 
                    <span className="font-semibold text-foreground">{social.following}</span> Following
                  </span>
                  <span className="flex items-center gap-1.5 text-foreground/60">
                    <Eye className="w-4 h-4" /> 
                    <span className="font-semibold text-foreground">{formatNumber(profile.profileViews)}</span> Views
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl border border-border bg-background/50 backdrop-blur-sm hover:border-green-500/30 transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-green-500/10 text-green-500 group-hover:scale-110 transition-transform">
                <Coins className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-foreground/60">Total Money</span>
            </div>
            <p className="text-2xl font-bold text-foreground">Rp {formatNumber(economy.money)}</p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-background/50 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-foreground/60">Sisa Limit</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{formatNumber(economy.limit)}</p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-background/50 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform">
                <Sword className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-foreground/60">RPG Wins</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{formatNumber(games.rpgWins)}</p>
          </div>
        </div>

        {/* Game Stats */}
        <div className="p-6 rounded-2xl border border-border bg-background/50 backdrop-blur-sm">
          <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wider mb-4">Statistik Permainan</h3>          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-xl bg-accent/50 border border-border/50">
              <p className="text-2xl font-bold text-foreground">{games.dungeonWins}</p>
              <p className="text-xs text-foreground/60 mt-1">Dungeon Clears</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-accent/50 border border-border/50">
              <p className="text-2xl font-bold text-foreground">{games.casinoWins}</p>
              <p className="text-xs text-foreground/60 mt-1">Casino Wins</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-accent/50 border border-border/50 col-span-2 md:col-span-1">
              <p className="text-2xl font-bold text-foreground">{economy.level}</p>
              <p className="text-xs text-foreground/60 mt-1">Current Level</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
