'use client';
import Link from 'next/link';
import { PageHeading, ProfileContainer, ProfileSidebar } from './profile.styled';
import { usePathname } from 'next/navigation';

export default function ProfileLayout({ children }: React.PropsWithChildren) {
  const pathname = usePathname();

  return (
    <>
      <PageHeading>Account Settings</PageHeading>
      <ProfileContainer>
        <ProfileSidebar>
          <Link href={'/profile'} style={{ color: pathname === '/profile' ? '#fff' : '#a8a8a8' }}>
            General
          </Link>
          <Link
            href={'/profile/login-connections'}
            style={{ color: pathname === '/profile/login-connections' ? '#fff' : '#a8a8a8' }}
          >
            Login Connections
          </Link>
          <Link
            href={'/profile/workshop-settings'}
            style={{ color: pathname === '/profile/workshop-settings' ? '#fff' : '#a8a8a8' }}
          >
            Workshop Settings
          </Link>
        </ProfileSidebar>
        <div>{children}</div>
      </ProfileContainer>
    </>
  );
}
