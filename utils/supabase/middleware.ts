import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// paths that don't require authentication
const publicPaths = [
  '/', // Landing page
  '/sign-in', // Auth pages
  '/sign-up',
  '/forgot-password',
  '/auth/callback',
  '/auth/reset-password',
  '/auth/auth-error',
  '/profile/:id', // Public profile pages - using path pattern
];

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value, options } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          supabaseResponse = NextResponse.next({
            request,
          });
          for (const { name, value, options } of cookiesToSet) {
            supabaseResponse.cookies.set(name, value, options);
          }
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const currentPath = request.nextUrl.pathname;
  const nextPath =
    currentPath === '/sign-in' || currentPath === '/sign-up'
      ? request.nextUrl.searchParams.get('next') || '/' // Default to landing page
      : currentPath;

  // Check if the current path matches any public path pattern
  const isPublicPath = publicPaths.some((path) => {
    // Convert path pattern to regex
    const pattern = path.replace(':id', '[^/]+');
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(currentPath);
  });

  if (!session && !isPublicPath) {
    // no user, redirect to sign-in page with current path as next
    const url = request.nextUrl.clone();
    url.pathname = '/sign-in';
    url.searchParams.set('next', currentPath);
    return NextResponse.redirect(url);
  }

  if (
    session &&
    (currentPath === '/sign-in' || currentPath === '/sign-up')
  ) {
    // For logged in users trying to access auth pages, redirect to the next path
    const url = new URL(nextPath, request.url);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
