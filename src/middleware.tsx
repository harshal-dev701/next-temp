// // middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { ACCESS_TOKEN } from './global/constants';
// import jwt from 'jsonwebtoken';

// // Public routes that don't require authentication
// const publicRoutes: string[] = [
//   '/login',
//   '/signup',
//   '/404',
//   '/forgotPassword',
//   '/email-sent-confirm',
//   '/reset-password',
//   '/newpassword',
//   '/pricing'
// ];

// // Function to validate JWT token
// function isValidToken(token: string): boolean {
//   try {
//     const secret = process.env.JWT_SECRET;
//     console.log('secret---------->', secret);
//     if (!secret) {
//       console.error('JWT_SECRET is not defined');
//       return false;
//     }
//     const decoded = jwt.verify(token, secret);
//     return !!decoded;
//   } catch (error) {
//     return false;
//   }
// }

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // Skip middleware for API routes
//   if (pathname.startsWith('/api/')) {
//     return NextResponse.next();
//   }

//   // Skip middleware for static files and Next.js internals
//   if (
//     pathname.startsWith('/_next') ||
//     pathname.startsWith('/favicon.ico') ||
//     pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js|woff|woff2|ttf|eot)$/)
//   ) {
//     return NextResponse.next();
//   }

//   // Get the access token from cookies
//   const token = req.cookies.get(ACCESS_TOKEN)?.value || '';
//   console.log('isValidToken(token)---------->', isValidToken(token));

//   // Validate token if it exists
//   const isAuthenticated = token ? isValidToken(token) : false;

//   // Check if current path is a public route (exact match or starts with route + '/')
//   const isPublicRoute = publicRoutes.some((route) => {
//     if (route === '/') {
//       return pathname === '/';
//     }
//     return pathname === route || pathname.startsWith(route + '/');
//   });

//   // If user is authenticated and tries to access login/signup, redirect to home
//   if (isAuthenticated && (pathname === '/login' || pathname === '/signup')) {
//     return NextResponse.redirect(new URL('/', req.url));
//   }

//   // If user is not authenticated and tries to access protected route, redirect to login
//   if (!isAuthenticated && !isPublicRoute) {
//     const loginUrl = new URL('/login', req.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - files with extensions (static files)
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'
//   ]
// };

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import  jwt from 'jsonwebtoken';
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
const apiPublicRoutes = ['/api/auth/login', '/api/auth/register', '/api/auth/logout', '/api/auth/forgot-password', '/api/auth/reset-password', '/api/auth/verify-otp'];

// Validate JWT
function isValidToken(token: string) {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) return false;
    const decoded = jwt.decode(token, { complete: true });
    console.log('decoded---------->', decoded);
    return decoded;
  } catch {
    return false;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get(ACCESS_TOKEN)?.value || '';
  const decoded = token ? isValidToken(token) : false;
  console.log('decoded', decoded);
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
