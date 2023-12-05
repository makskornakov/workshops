import { redirect } from 'next/navigation';
import { PageHeading } from '../profile/profile.styled';
import { getUser } from '../utils/prismaUser';

export default async function Workshops() {
  const user = await getUser();

  if (!user) {
    redirect('/api/auth/signin');
  }
  return (
    <>
      <PageHeading>Workshop builder</PageHeading>
    </>
  );
}
