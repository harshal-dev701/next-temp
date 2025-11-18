// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ACCESS_TOKEN } from './global/constants';

const publicRoutes: string[] = ['/login', '/signup'];

export function middleware(req: NextRequest) {
  const token = req.cookies.get(ACCESS_TOKEN)?.value;
  const { pathname } = req.nextUrl;

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute = !isPublicRoute;

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
