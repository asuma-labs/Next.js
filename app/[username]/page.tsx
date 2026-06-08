import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { 
  Crown, Coins, Zap, Sword, ShieldAlert, Eye, Users, UserPlus, 
  Pencil, Book, Box, Settings as SettingsIcon, Terminal 
} from 'lucide-react';
import { SITE_URL } from '@/lib/config';
import { getServerViewerData } from '@/lib/auth-server';
import Link from 'next/link';

const DEFAULT_AVATAR_URL = `${SITE_URL}/icons/default-profile.jpg`;
const DEFAULT_BANNER_URL = `${SITE_URL}/icons/default-banner.jpg`;

async function getProfileData(username: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/${username}`, { 
      cache: 'no-store',
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  const data = await getProfileData(username);

  if (data?.success) {
    const user = data.data.profile;
    const eco = data.data.economy;
    return {
      title: `${user.name} (@${username}) | Asuma Bot`,
      description: user.bio || `Player Asuma MD | Level ${eco.level}`,
      openGraph: {
        title: `${user.name} | Asuma Bot`,
        description: user.bio || `Player Asuma Bot`,
        url: `${SITE_URL}/${username}`,
        type: 'profile',
        images: [{ url: user.profilePic ? `${SITE_URL}/${user.profilePic}` : DEFAULT_AVATAR_URL, width: 512, height: 512 }],
      },
    };
  }
  return { title: 'User Tidak Ditemukan | Asuma Bot' };
}

function ProfileTabs({ username, isOwner, activeTab }: { username: string, isOwner: boolean, activeTab: string }) {
  const tabs = [    { id: 'overview', label: 'Overview', icon: Book },
    ...(isOwner ? [{ id: 'bots', label: 'WhatsApp Bots', icon: Terminal }] : []),
    ...(isOwner ? [{ id: 'settings', label: 'Settings', icon: SettingsIcon }] : []),
  ];

  return (
    <div className="border-b border-border mb-6">
      <nav className="flex gap-6 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <Link
              key={tab.id}
              href={`/${username}?tab=${tab.id}`}
              className={`flex items-center gap-2 pb-3 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                isActive 
                  ? 'border-primary text-foreground' 
                  : 'border-transparent text-foreground/60 hover:text-foreground hover:border-foreground/30'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default async function UserProfilePage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ username: string }>,
  searchParams: Promise<{ tab?: string }>
}) {
  const { username } = await params;
  const { tab = 'overview' } = await searchParams;

  const profileData = await getProfileData(username);
  const viewerData = await getServerViewerData();

  const isOwner = viewerData?.profile?.name?.toLowerCase() === username.toLowerCase();

  if (!profileData?.success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-background">
        <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-6">          <ShieldAlert className="w-10 h-10 text-foreground/40" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">User Tidak Ditemukan</h1>
        <p className="text-foreground/60 mb-8">Username <span className="font-mono bg-accent px-2 py-0.5 rounded">{username}</span> tidak terdaftar.</p>
        <Link href="/" className="px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-all">
          Kembali ke Home
        </Link>
      </div>
    );
  }

  const { profile, economy, games, social } = profileData.data;
  const formatNumber = (num: number) => new Intl.NumberFormat('id-ID').format(num);
  
  const avatarUrl = profile.profilePic ? `${SITE_URL}/${profile.profilePic}` : DEFAULT_AVATAR_URL;
  const bannerUrl = profile.banner ? `${SITE_URL}/${profile.banner}` : DEFAULT_BANNER_URL;
  const socialData = social || { followers: 0, following: 0 };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="relative h-48 md:h-64 w-full overflow-hidden rounded-t-2xl border-x border-t border-border">
          <img src={bannerUrl} alt="Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 border-x border-b border-border rounded-b-2xl bg-background/50 backdrop-blur-sm p-6 md:p-8">
          
          <div className="lg:col-span-1 space-y-6">
            <div className="relative -mt-20 mb-4">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-background bg-accent shadow-xl">
                <img src={avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
              <p className="text-xl text-foreground/60 font-light">@{username}</p>
            </div>

            {isOwner && (
              <Link 
                href={`/${username}?tab=settings`}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors"
              >
                <Pencil className="w-4 h-4" /> Edit Profile
              </Link>
            )}
            <div className="space-y-4 text-sm text-foreground/80">
              {profile.bio && <p className="leading-relaxed">{profile.bio}</p>}
              
              <div className="flex items-center gap-4 text-foreground/60">
                <span className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
                  <Users className="w-4 h-4" /> 
                  <span className="font-semibold text-foreground">{socialData.followers}</span> followers
                </span>
                <span className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
                  <UserPlus className="w-4 h-4" /> 
                  <span className="font-semibold text-foreground">{socialData.following}</span> following
                </span>
              </div>

              <div className="flex items-center gap-2 text-foreground/60">
                <Eye className="w-4 h-4" /> 
                <span>{formatNumber(profile.profileViews || 0)} profile views</span>
              </div>

              {profile.vip && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-600 dark:text-yellow-400 text-xs font-bold border border-yellow-500/20 w-fit">
                  <Crown className="w-3.5 h-3.5" /> Premium VIP
                </span>
              )}
            </div>
          </div>

          <div className="lg:col-span-3">
            <ProfileTabs username={username} isOwner={isOwner} activeTab={tab} />

            {tab === 'overview' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {isOwner && (
                  <div className="p-5 rounded-xl border border-border bg-blue-500/5 dark:bg-blue-500/10">
                    <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-primary" /> Private Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-foreground/50 block text-xs uppercase">Serial Number</span>
                        <span className="font-mono text-foreground">{profile.serialNumber || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-foreground/50 block text-xs uppercase">Referral Code</span>
                        <span className="font-mono text-foreground">{profile.referralCode || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-foreground/50 block text-xs uppercase">Total Commands</span>
                        <span className="font-semibold text-foreground">{formatNumber(profile.tracking?.totalCommands || 0)}</span>
                      </div>                      <div>
                        <span className="text-foreground/50 block text-xs uppercase">Has Password</span>
                        <span className="font-semibold text-foreground">{profile.hasPassword ? '✅ Yes' : '❌ No'}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Box className="w-4 h-4" /> Game Statistics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl border border-border bg-accent/30 text-center">
                      <Crown className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                      <p className="text-2xl font-bold text-foreground">{economy.level}</p>
                      <p className="text-xs text-foreground/60">Level</p>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-accent/30 text-center">
                      <Coins className="w-6 h-6 mx-auto mb-2 text-green-500" />
                      <p className="text-2xl font-bold text-foreground">Rp {formatNumber(economy.money)}</p>
                      <p className="text-xs text-foreground/60">Money</p>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-accent/30 text-center">
                      <Zap className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                      <p className="text-2xl font-bold text-foreground">{formatNumber(economy.limit)}</p>
                      <p className="text-xs text-foreground/60">Limit</p>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-accent/30 text-center">
                      <Sword className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                      <p className="text-2xl font-bold text-foreground">{formatNumber(games.rpgWins)}</p>
                      <p className="text-xs text-foreground/60">RPG Wins</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab === 'bots' && isOwner && (
              <div className="p-8 rounded-xl border border-dashed border-border text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
                <Terminal className="w-12 h-12 mx-auto mb-4 text-foreground/30" />
                <h3 className="text-lg font-semibold text-foreground mb-2">WhatsApp Bot Management</h3>
                <p className="text-foreground/60 mb-6 max-w-md mx-auto">Kelola sesi WhatsApp bot, scan QR code, dan monitor status bot kamu di sini.</p>
                <button className="px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-all">
                  Connect New Bot
                </button>
              </div>
            )}

            {tab === 'settings' && isOwner && (              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="p-6 rounded-xl border border-border bg-accent/30">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Edit Profile</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-1.5">Bio</label>
                      <textarea 
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        rows={3}
                        defaultValue={profile.bio || ''}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                    <button className="px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-all">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {(tab === 'bots' || tab === 'settings') && !isOwner && (
              <div className="p-8 text-center text-foreground/60">
                <ShieldAlert className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Kamu tidak memiliki izin untuk melihat halaman ini.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
