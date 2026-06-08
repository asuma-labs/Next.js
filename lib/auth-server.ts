import { cookies } from 'next/headers';
import { API_URL } from './config';

export async function getServerViewerData() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('asuma_token')?.value;
    
    if (!token) return null;

    const res = await fetch(`${API_URL}/api/dashboard/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      return data.success ? data.data : null;
    }
    return null;
  } catch (error) {
    console.error('Failed to get server viewer data:', error);
    return null;
  }
}
