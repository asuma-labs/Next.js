// app/[username]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { getToken, apiFetch } from '@/lib/auth';
import DashboardView from './_components/DashboardView';
import PublicProfileView from './_components/PublicProfileView';

export default function UserPage() {
  const params = useParams<{ username: string }>();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      const username = params.username;

      try {
        const publicRes = await fetch(`https://bot.asuma.my.id/api/profile/${username}`);
        if (!publicRes.ok) throw new Error('User not found');
        const publicData = await publicRes.json();

        if (token) {
          const privateRes = await apiFetch('/api/dashboard/me');
          if (privateRes.success && privateRes.data?.profile?.name === username) {
            setIsOwner(true);
            setUserData(privateRes.data);
            setLoading(false);
            return;
          }
        }

        setIsOwner(false);
        setUserData(publicData.data);
      } catch (err) {
        setError('User tidak ditemukan atau terjadi kesalahan');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-red-500 font-medium">{error}</p>
        <button 
          onClick={() => router.push('/')}
          className="px-6 py-2.5 bg-zinc-900 text-white font-medium rounded-xl"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 w-full pb-20 px-4">
      {isOwner ? (
        <DashboardView userData={userData} />
      ) : (
        <PublicProfileView userData={userData} />
      )}
    </div>
  );
}
