export { auth as middleware } from '@/lib/auth';

export const config = {
  matcher: [
    '/cart/:path*',
    '/checkout/:path*',
    '/account/:path*',
    '/orders/:path*',
    '/dashboard/:path*',
  ],
};
