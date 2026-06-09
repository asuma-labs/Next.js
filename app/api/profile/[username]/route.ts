import { NextResponse } from 'next/server';
import { API_URL } from '@/lib/config';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  try {
    const res = await fetch(`${API_URL}/api/profile/${username}`, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Asuma-Bot-Web/1.0',
      },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { success: false, error: 'backend_error', details: text.substring(0, 200) },
        { status: res.status }
      );
    }

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await res.text();
      return NextResponse.json(
        { success: false, error: 'invalid_response', details: text.substring(0, 200) },
        { status: 500 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'fetch_error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
