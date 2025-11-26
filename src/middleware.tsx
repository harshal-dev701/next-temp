// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ACCESS_TOKEN } from './global/constants';
import jwt from 'jsonwebtoken';

// Public routes that don't require authentication
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

// Function to validate JWT token
function isValidToken(token: string): boolean {
  try {
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET || process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET is not defined');
      return false;
    }
    const decoded = jwt.verify(token, secret);
    return !!decoded;
  } catch (error) {
    return false;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip middleware for API routes
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Skip middleware for static files and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next();
  }

  // Get the access token from cookies
  const token = req.cookies.get(ACCESS_TOKEN)?.value || '';

  // Validate token if it exists
  const isAuthenticated = token ? true : false;

  // Check if current path is a public route (exact match or starts with route + '/')
  const isPublicRoute = publicRoutes.some((route) => {
    if (route === '/') {
      return pathname === '/';
    }
    return pathname === route || pathname.startsWith(route + '/');
  });

  // If user is authenticated and tries to access login/signup, redirect to home
  if (isAuthenticated && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // If user is not authenticated and tries to access protected route, redirect to login
  if (!isAuthenticated && !isPublicRoute) {
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
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'
  ]
};
