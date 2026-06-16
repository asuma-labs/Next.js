import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import { API_URL, SITE_URL } from '@/lib/config';
import PrivateDashboard from './PrivateDashboard';
import PublicProfile from './PublicProfile';

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  
  try {
    const res = await fetch(`${API_URL}/api/profile/${username}`, { next: { revalidate: 60 } });
    if (!res.ok) return { title: 'Not Found' };
    
    const json = await res.json();
    if (!json.success || !json.data) return { title: 'Not Found' };
    
    const profile = json.data.profile;
    const title = `${profile.name} • Asuma`;
    const description = profile.bio || `View ${profile.name}'s profile on Asuma.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/${username}`,
        siteName: 'Asuma Bot',
      },
      twitter: {
        card: 'summary',
        title,
        description,
      },
      alternates: {
        canonical: `${SITE_URL}/${username}`,
      }
    };
  } catch (error) {
    return { title: `${username} • Asuma` };
  }
}

export default async function ProfileRoute({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  
  const cookieStore = await cookies();
  const token = cookieStore.get('asuma_token')?.value;
  
  let isOwner = false;
  let privateData = null;

  if (token) {
    try {
      const dbRes = await fetch(`${API_URL}/api/dashboard/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        cache: 'no-store'
      });
      
      if (dbRes.ok) {
        const dbJson = await dbRes.json();
        if (dbJson.success && dbJson.data?.profile?.name?.toLowerCase() === username.toLowerCase()) {
          isOwner = true;
          privateData = dbJson.data;
        }
      }
    } catch (e) {
      // Ignore
    }
  }

  if (isOwner && privateData) {
    return <PrivateDashboard userData={privateData} />;
  }

  // Fallback to Public Profile
  let publicData = null;
  let hasError = false;
  let is404 = false;

  try {
    const pubRes = await fetch(`${API_URL}/api/profile/${username}`, { cache: 'no-store' });
    if (!pubRes.ok) {
      if (pubRes.status === 404) {
        is404 = true;
      } else {
        hasError = true;
      }
    } else {
      const pubJson = await pubRes.json();
      if (!pubJson.success || !pubJson.data) {
        is404 = true;
      } else {
        publicData = pubJson.data;
      }
    }
  } catch (e) {
    hasError = true;
  }

  if (is404) {
    return notFound();
  }

  if (hasError) {
    return <div className="p-8 text-red-500">Failed to load profile.</div>;
  }

  return <PublicProfile publicData={publicData} username={username} />;
}
