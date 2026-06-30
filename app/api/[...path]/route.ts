import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from '@/lib/config';

export const dynamic = 'force-dynamic';

async function handleProxy(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const relativePath = '/' + path.join('/');
  
  const searchParams = request.nextUrl.search;
  const targetUrl = `https://db.asuma.my.id${relativePath}${searchParams}`;

  try {
    const headers = new Headers();
    for (const [key, value] of request.headers.entries()) {
      const lower = key.toLowerCase();
      if (
        !['host', 'connection', 'content-length', 'origin', 'referer', 'sec-fetch', 'sec-ch-'].some(prefix => 
          lower.startsWith(prefix)
        )
      ) {
        headers.set(key, value);
      }
    }

    const fetchOptions: RequestInit = {
      method: request.method,
      headers,
      cache: 'no-store',
    };

    if (!['GET', 'HEAD'].includes(request.method) && request.body) {
      fetchOptions.body = request.body;
      (fetchOptions as any).duplex = 'half';
    }

    const res = await fetch(targetUrl, fetchOptions);

    const responseHeaders = new Headers();
    res.headers.forEach((value, key) => {
      const lower = key.toLowerCase();
      if (!['content-encoding', 'transfer-encoding'].includes(lower)) {
        responseHeaders.set(key, value);
      }
    });

    const requestOrigin = request.headers.get('origin') || '*';
    responseHeaders.set('Access-Control-Allow-Origin', requestOrigin);
    responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, X-CSRF-Token');
    responseHeaders.set('Access-Control-Allow-Credentials', 'true');

    return new NextResponse(res.body, { 
      status: res.status, 
      headers: responseHeaders 
    });

  } catch (error: any) {
    console.error(`Proxy Error (${targetUrl}):`, error);
    return NextResponse.json(
      { success: false, error: 'proxy_error', message: error.message },
      { status: 502 }
    );
  }
}

export const { GET, POST, PUT, DELETE, PATCH } = {
  GET: handleProxy,
  POST: handleProxy,
  PUT: handleProxy,
  DELETE: handleProxy,
  PATCH: handleProxy,
};

export async function OPTIONS(request: NextRequest) {
  const requestOrigin = request.headers.get('origin') || '*';
  
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': requestOrigin,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept, X-CSRF-Token',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}
