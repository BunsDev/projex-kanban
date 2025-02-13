import { createClient } from '@/utils/supabase/server';
import { users } from '@/utils/users';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    const next = requestUrl.searchParams.get('next') || '/projects';

    // if (!code) {
    //   console.error('No code provided in callback');
    //   throw new Error('No code provided');
    // }

    // const supabase = await createClient();
    // const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    // if (error) {
    //   console.error('Auth error:', error);
    //   // return the user to an error page with instructions (from supabase docs)
    //   return NextResponse.redirect(`${origin}/auth/auth-code-error`)
    //   // throw error;

    // }

    // Capture user details after successful OAuth
    // if (data.user) {
    //   try {
    //     await users.captureUserDetails(data.user);
    //   } catch (error) {
    //     console.error('Error capturing user details:', error);
    //     // Don't throw here - we still want to complete the auth flow
    //   }
    // }

    //* https://supabase.com/docs/guides/auth/social-login/auth-google#application-code
    // if (!error) {
    //   const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
    //   const isLocalEnv = process.env.NODE_ENV === 'development'
    //   // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
    //   isLocalEnv ? NextResponse.redirect(`${origin}${next}`) : 
    //   forwardedHost ? NextResponse.redirect(`https://${forwardedHost}${next}`) 
    //     : NextResponse.redirect(`${origin}${next}`)
    // }
    // *

    // Redirect to the intended page
    return NextResponse.redirect(new URL(next, requestUrl.origin));
  } catch (error) {
    console.error('Callback error:', error);
    // Add error to the URL so we can display it
    const errorUrl = new URL('/auth/auth-error', request.url);
    errorUrl.searchParams.set('error', 'Failed to sign in');
    return NextResponse.redirect(errorUrl);
  }
}