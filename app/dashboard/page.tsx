import { redirect } from 'next/navigation';
import { getServerViewerData } from '@/lib/auth-server';

export default async function DashboardRedirect() {
  const viewer = await getServerViewerData();
  
  if (viewer?.profile?.name) {
    redirect(`/${viewer.profile.name}`);
  }
  
  redirect('/login');
}
