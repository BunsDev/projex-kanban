import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { ProjectSettingsForm } from './ProjectSettingsForm';
import { SettingsLayout } from './SettingsLayout';
import { getUser } from '@/utils/clerk/users';

interface Props {
  params: Promise<{ projectId: string }>;
}

export default async function SettingsPage({ params }: Props) {
  const { projectId } = await params;
  const supabase = await createClient();
  const user = await getUser();
  if (!user) redirect('/sign-in');

  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single();

  if (error || !project) redirect('/projects');

  return (
    <SettingsLayout title="Project Settings">
      <ProjectSettingsForm project={project} />
    </SettingsLayout>
  );
}
