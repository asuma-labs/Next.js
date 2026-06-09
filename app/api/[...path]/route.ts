import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from '@/lib/config';

export const dynamic = 'force-dynamic';

async function handleProxy(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const relativePath = path.join('/');
  
  // Assemble the destination URL
  const searchParams = request.nextUrl.search;
  const targetUrl = `${API_URL}/api/${relativePath}${searchParams}`;
  
  // Extract and filter headers to pass to the destination
  const headers = new Headers();
  request.headers.forEach((value, key) => {
    const lowerKey = key.toLowerCase();
    // Keep standard and authorization headers, filter browser connection controls
    if (
      !lowerKey.startsWith('host') &&
      !lowerKey.startsWith('content-length') &&
      !lowerKey.startsWith('connection') &&
      !lowerKey.startsWith('sec-') &&
      !lowerKey.startsWith('cookie')
    ) {
      headers.set(key, value);
    }
  });

  // Always specify standard Content-Type if missing for JSON POSTs
  if (!headers.has('content-type') && ['POST', 'PUT', 'PATCH'].includes(request.method)) {
    headers.set('content-type', 'application/json');
  }

  // Handle request body
  let body: any = null;
  if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
    try {
      body = await request.text();
    } catch (e) {
      // Ignored
    }
  }

  try {
    const res = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
      cache: 'no-store',
    });

    const resContentType = res.headers.get('content-type') || '';
    
    // Read response body appropriately
    let responseBody;
    if (resContentType.includes('application/json')) {
      const json = await res.json();
      responseBody = JSON.stringify(json);
    } else {
      responseBody = await res.text();
    }

    // Prepare response headers
    const resHeaders = new Headers();
    res.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (!['transfer-encoding', 'content-encoding', 'content-length'].includes(lowerKey)) {
        resHeaders.set(key, value);
      }
    });

    // Ensure robust CORS headers for our proxy response
    resHeaders.set('Access-Control-Allow-Origin', '*');
    resHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    resHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return new NextResponse(responseBody, {
      status: res.status,
      headers: resHeaders,
    });
  } catch (error: any) {
    console.error(`Proxy failure for ${targetUrl}:`, error);
    return NextResponse.json(
      { success: false, error: 'connection_failed', message: `Proxy connection to source failed: ${error.message}` },
      { status: 502 }
    );
  }
}

export async function GET(request: NextRequest, context: any) {
  return handleProxy(request, context);
}

export async function POST(request: NextRequest, context: any) {
  return handleProxy(request, context);
}

export async function PUT(request: NextRequest, context: any) {
  return handleProxy(request, context);
}

export async function DELETE(request: NextRequest, context: any) {
  return handleProxy(request, context);
}

export async function PATCH(request: NextRequest, context: any) {
  return handleProxy(request, context);
}

export async function OPTIONS() {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return new NextResponse(null, { status: 204, headers });
}
