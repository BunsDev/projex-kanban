import { users, type IUser } from '@/utils/users';
import { createClient } from '@/utils/supabase/server';
import { notFound, redirect } from 'next/navigation';
import { ProfileView } from './ProfileView';
import { currentUser } from '@clerk/nextjs/server';

// async function getUser(profileId: string): Promise<IUser> {
//   try {
//     const user = await users.getUser(profileId);
//     if (!user) throw new Error('User not found');
//     return user;
//   } catch (error) {
//     notFound();
//   }
// }

export default async function ProfileViewingPage({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) {
  const { profileId } = await params;

  // const user = await getUser(profileId);
  const user = await currentUser();
  if (!user) redirect('/sign-in');
  const isOwnProfile = user?.id === profileId;

  return <ProfileView user={user} isOwnProfile={isOwnProfile} />;
}
