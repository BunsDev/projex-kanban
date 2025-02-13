// import { createClient } from '@/utils/supabase/server';
// import { users, type IUser } from '@/utils/users';
import { ProfileForm } from './ProfileForm';
import { redirect } from 'next/navigation';
import { getUser } from '@/utils/clerk/users';
import { users } from '@/utils/users';

export default async function ProfilePage() {
  // const supabase = await createClient();

  const user = await getUser();
  if (!user) redirect('/sign-in');

  const userData = await users.getUser(user.id);
  if (!userData) redirect('/sign-in');

  return <ProfileForm initialData={userData} />;
}
