'use client';
import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { UserMenu } from './UserMenu';
import Link from 'next/link';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
// import { createClient } from '@/utils/supabase/client';
import type { User } from '@clerk/nextjs/server';
import { currentUser } from '@clerk/nextjs/server';
import { usePathname } from 'next/navigation';
import { useAccessStore } from '@/stores/useAccessStore';

interface HeaderProps {
  className?: string;
}

// const supabase = createClient();
// 
export const Header = ({ className }: HeaderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  useEffect(() => {
    // Get initial session
    // const getUser = async () => {
    //   const user = await currentUser();
    //   setUser(user);
    //   setIsLoading(false);
    // };
    // getUser();

    // Listen for auth changes
  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_event, session) => {
  //     if (!se ssion) {
  //       useAccessStore.getState().reset(); // Reset when session ends
  //     }
  //     setUser(session?.user ?? null);
  //   });

  //   return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link
          href={user ? '/projects' : '/'}
          className="flex items-center space-x-2 font-bold text-xl hover:text-primary transition-colors"
        >
          ProjeX
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <UserMenu user={user} />
          ) : (
            <div className="flex items-center gap-3">
              {isLandingPage && (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/sign-in">Sign in</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/sign-up">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          )}
          <div className="border-l pl-4 dark:border-gray-800">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
