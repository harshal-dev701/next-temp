// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ACCESS_TOKEN } from './global/constants';

// Public routes that don't require authentication (excluding home page)
const publicRoutes: string[] = [
  '/login',
  '/signup',
  '/404',
  '/forgotPassword',
  '/email-sent-confirm',
  '/reset-password',
  '/newpassword',
  '/pricing'
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Get the access token from cookies
  const token = req.cookies.get(ACCESS_TOKEN)?.value;


  // Skip middleware for API routes
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Check if current path is a public route
  const isPublicRoute = publicRoutes.some((route) => 
    pathname === route || pathname.startsWith(route)
  );

  // If user has token and tries to access login/signup, redirect to home
  if (token && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // If user doesn't have token and tries to access protected route, redirect to login
  if (!token && !isPublicRoute) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - files with extensions (static files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};
