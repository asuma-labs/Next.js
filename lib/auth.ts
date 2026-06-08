// lib/auth.ts
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bot.asuma.my.id';

export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('asuma_token');
  }
  return null;
}

export function setToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('asuma_token', token);
  }
}

export function removeToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('asuma_token');
  }
}

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
    
    // Jika token expired atau invalid, hapus token dan redirect ke login
    if (res.status === 401) {
      removeToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      throw new Error('Unauthorized');
    }
    
    return await res.json();
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
}
