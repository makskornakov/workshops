'use client';
import Link from 'next/link';
import { ProfileSidebar } from './profile.styled';
import { usePathname } from 'next/navigation';

export default function ProfileSideBar() {
  const pathname = usePathname();
  return (
    <ProfileSidebar>
      <Link href={'/profile'} style={pathname === '/profile' ? { color: '#fff' } : {}}>
        General
      </Link>
      <Link
        href={'/profile/login-connections'}
        style={pathname === '/profile/login-connections' ? { color: '#fff' } : {}}
      >
        Login Connections
      </Link>
      <Link
        href={'/profile/workshop-settings'}
        style={pathname === '/profile/workshop-settings' ? { color: '#fff' } : {}}
      >
        Workshop Settings
      </Link>
    </ProfileSidebar>
  );
}
