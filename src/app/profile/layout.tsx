import Link from 'next/link';
import {
  PageHeading,
  ProfileContainer,
  ProfileSectionContainer,
  ProfileSidebar,
} from './profile.styled';
import { redirect, usePathname } from 'next/navigation';
import { getUser } from '../utils/prismaUser';
import ProfileSideBar from './sideBar';

export default async function ProfileLayout({ children }: React.PropsWithChildren) {
  // const pathname = usePathname();
  const user = await getUser();

  if (!user) {
    redirect('/api/auth/signin');
  }
  return (
    <>
      <PageHeading>Account Settings</PageHeading>
      <ProfileContainer>
        <ProfileSideBar />
        <ProfileSectionContainer>{children}</ProfileSectionContainer>
      </ProfileContainer>
    </>
  );
}
