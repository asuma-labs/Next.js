// lib/auth.ts
import Cookies from 'js-cookie';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bot.asuma.my.id';
const TOKEN_NAME = 'asuma_token';

export function getToken(): string | null {
  return Cookies.get(TOKEN_NAME) || null;
}

export function setToken(token: string) {
  Cookies.set(TOKEN_NAME, token, { expires: 7, path: '/' });
}

export function removeToken() {
  Cookies.remove(TOKEN_NAME, { path: '/' });
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
