import { ProfileContainer, ProfileSectionContainer } from './profile.styled';
import { PageHeading } from '~/styles/shared';
// import { redirect } from 'next/navigation';
// import { getUser } from '../../utils/prismaUser';
import ProfileSideBar from './sideBar';

export default async function ProfileLayout({ children }: React.PropsWithChildren) {
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
