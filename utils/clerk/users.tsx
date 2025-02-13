import { currentUser } from '@clerk/nextjs/server';

export async function getUser() {
  const user = await currentUser();
  return user;
}
