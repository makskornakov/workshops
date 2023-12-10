'use client';
import Link from 'next/link';
import { LinkContainer } from './NavBar.styled';
import { usePathname } from 'next/navigation';

const links = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/materials',
    label: 'Materials',
  },
];

const userLinks = [
  {
    href: '/workshops',
    label: 'Workshops',
  },

  {
    href: '/profile',
    label: 'Profile',
  },
];

export default function LinksNav({ isUser }: { isUser: boolean }) {
  const pathname = usePathname();
  const resolvedPathname = pathname.split('/');

  const linksToRender = isUser ? [...links, ...userLinks] : links;
  return (
    <LinkContainer>
      {/* <Link href={'/'} style={pathname === '/' ? { color: '#fff' } : {}}>
        Home
      </Link>
      {isUser && (
        <Link href={'/profile'} style={resolvedPathname[1] === 'profile' ? { color: '#fff' } : {}}>
          Profile
        </Link>
      )} */}
      {linksToRender.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          style={resolvedPathname[1] === link.href.split('/')[1] ? { color: '#fff' } : {}}
        >
          {link.label}
        </Link>
      ))}
    </LinkContainer>
  );
}
