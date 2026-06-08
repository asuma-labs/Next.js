// app/api/profile/[username]/route.ts
import { NextResponse } from 'next/server';
import { API_URL } from '@/lib/config';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  
  console.log('🔍 API Proxy: Fetching profile for', username);
  console.log('🔍 API Proxy: Backend URL:', `${API_URL}/api/profile/${username}`);
  
  try {
    const res = await fetch(`${API_URL}/api/profile/${username}`, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Asuma-Bot-Web/1.0',
      },
    });
    
    console.log('🔍 API Proxy: Response status:', res.status, res.statusText);
    
    const contentType = res.headers.get('content-type');
    console.log('🔍 API Proxy: Content-Type:', contentType);
    
    if (!res.ok) {
      const text = await res.text();
      console.error('❌ API Proxy: Error response:', text.substring(0, 500));
      return NextResponse.json(
        { success: false, error: 'backend_error', details: text.substring(0, 200) },
        { status: res.status }
      );
    }
    
    if (!contentType || !contentType.includes('application/json')) {
      const text = await res.text();
      console.error('❌ API Proxy: Not JSON response:', text.substring(0, 500));
      return NextResponse.json(
        { success: false, error: 'invalid_response', details: text.substring(0, 200) },
        { status: 500 }
      );
    }
    
    const data = await res.json();
    console.log('✅ API Proxy: Success, data:', JSON.stringify(data).substring(0, 200));
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ API Proxy: Fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'fetch_error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
