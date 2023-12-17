'use client';
import Link from 'next/link';
import { LinkContainer } from './NavBar.styled';
import { usePathname } from 'next/navigation';
import { colorVar } from '~/utils/colors';

const links = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/materials',
    label: 'Materials',
  },
  // Development temporarily links
  {
    href: '/zcards',
    label: 'ZCards',
  },
  {
    href: '/rotation',
    label: 'Rotation',
  },
];

const userLinks = [
  // {
  //   href: '/workshops',
  //   label: 'Workshops',
  // },

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
      {linksToRender.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          style={
            resolvedPathname[1] === link.href.split('/')[1] ? { color: colorVar('main-color') } : {}
          }
        >
          {link.label}
        </Link>
      ))}
    </LinkContainer>
  );
}
