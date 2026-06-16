/*import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_ROUTES = ['/dashboard'];
const AUTH_ROUTES = ['/login'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('asuma_token')?.value;
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_ROUTES.some(r => pathname.startsWith(r));
  const isAuthRoute = AUTH_ROUTES.some(r => pathname.startsWith(r));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
};
*/
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_ROUTES = ['/login'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('asuma_token')?.value;
  const { pathname } = request.nextUrl;
  const isAuthRoute = AUTH_ROUTES.some(r => pathname.startsWith(r));

  if (isAuthRoute && token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload && payload.name) {
        return NextResponse.redirect(new URL(`/${payload.name}`, request.url));
      }
    } catch(e) {
      // fallback
    }
  }

  // Dashboard protection for paths previously matched by PROTECTED_ROUTES
  // No longer strictly needed since route is dynamic, but we can't protect `/[username]` 
  // since it serves public profiles too. The page component itself handles unauthorized.

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
};
