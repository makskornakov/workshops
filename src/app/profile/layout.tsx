import { ProfileContainer, ProfileSectionContainer } from './profile.styled';
import ProfileSideBar from './sideBar';
import Heading from '~/components/layout/heading/Heading';

export default async function ProfileLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Heading title="Account Settings" noBackButton />
      <ProfileContainer>
        <ProfileSideBar />
        <ProfileSectionContainer>{children}</ProfileSectionContainer>
      </ProfileContainer>
    </>
  );
}
