'use client';

import Cookies from 'js-cookie';
import { API_URL } from './config';

export { API_URL };

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
    // Route through local /api/ proxy relative URL to avoid CORS and failed fetches inside client iframe
    const targetUrl = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;
    const res = await fetch(targetUrl, { ...options, headers });

    if (res.status === 401) {
      removeToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      throw new Error('Unauthorized');
    }

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
       throw new Error(`Server returned unexpected response (Status: ${res.status}).`);
    }

    return await res.json();
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
}
