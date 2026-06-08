import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function DashboardRedirect() {
  const cookieStore = await cookies();
  const token = cookieStore.get('asuma_token')?.value;
  
  if (!token) {
    redirect('/login');
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      redirect('/login');
    }

    const data = await res.json();
    
    if (data.success && data.data?.profile?.name) {
      redirect(`/${data.data.profile.name}`);
    } else {
      redirect('/login');
    }
  } catch (error) {
    console.error('Dashboard redirect error:', error);
    redirect('/login');
  }
}
