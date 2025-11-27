import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN } from '@/global/constants';

// Public frontend routes
const publicRoutes = [
  '/login',
  '/signup',
  '/404',
  '/forgotPassword',
  '/email-sent-confirm',
  '/reset-password',
  '/newpassword',
  '/pricing'
];

// Backend API public routes
const apiPublicRoutes = [
  '/api/auth/login',
  '/api/auth/signup',
  '/api/auth/logout',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/api/auth/verify-otp'
];

// Validate JWT
function isValidToken(token: string) {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) return false;
    const decoded = jwt.decode(token, { complete: true });
    return decoded;
  } catch {
    return false;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get(ACCESS_TOKEN)?.value || '';
  const decoded = token ? isValidToken(token) : false;
  const isAuthenticated = !!decoded;

  // --------------------------
  // 🔹 Backend API Middleware
  // --------------------------
  if (pathname.startsWith('/api/')) {
    // Allow public API routes
    if (apiPublicRoutes.includes(pathname)) {
      return NextResponse.next();
    }

    // Block if API route is protected
    if (!isAuthenticated) {
      return NextResponse.json({ message: 'Unauthorized - Token missing or invalid' }, { status: 401 });
    }

    // Attach userId to request (backend can read it)
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-user-id', (decoded as any).userId);

    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    });
  }

  // --------------------------
  // 🔹 Frontend Route Middleware
  // --------------------------

  // Skip static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next();
  }

  // Check public frontend routes
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(route + '/'));

  // Redirect logged-in users away from login/register
  if (isAuthenticated && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Redirect guests to login for protected frontend pages
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

// Match ALL routes except static
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)']
};
