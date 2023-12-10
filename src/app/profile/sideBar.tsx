'use client';
import Link from 'next/link';
import { ProfileSidebar } from './profile.styled';
import { usePathname } from 'next/navigation';

const links = [
  {
    href: '/profile',
    label: 'General',
  },
  {
    href: '/profile/login-connections',
    label: 'Login Connections',
  },
  {
    href: '/profile/workshop-settings',
    label: 'Workshop Settings',
  },
];

export default function ProfileSideBar() {
  const pathname = usePathname();
  return (
    <ProfileSidebar>
      {links.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          style={pathname === link.href ? { color: 'var(--main-color)' } : {}}
        >
          {link.label}
        </Link>
      ))}
    </ProfileSidebar>
  );
}
