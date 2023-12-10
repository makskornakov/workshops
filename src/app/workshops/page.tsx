import { redirect } from 'next/navigation';
import { getUser } from '../../utils/prismaUser';
import WorkshopForm from './WorkshopForm';

export default async function Workshops() {
  const user = await getUser();

  if (!user) {
    redirect('/api/auth/signin');
  }
  return <WorkshopForm />;
}
