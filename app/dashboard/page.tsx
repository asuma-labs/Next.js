// app/(dashboard)/dashboard/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, apiFetch } from '@/lib/auth';

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }

    apiFetch('/api/dashboard/me')
      .then(res => {
        if (res.success && res.data?.profile?.name) {
          router.replace(`/${res.data.profile.name}`);
        } else {
          router.push('/login');
        }
      })
      .catch(() => router.push('/login'));
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-zinc-300 border-t-zinc-900" />
    </div>
  );
}
