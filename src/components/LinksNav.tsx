'use client';
import Link from 'next/link';
import { LinkContainer } from './NavBar.styled';
import { usePathname } from 'next/navigation';

export default function LinksNav({ isUser }: { isUser: boolean }) {
  const pathname = usePathname();
  const resolvedPathname = pathname.split('/');

  return (
    <LinkContainer>
      <Link href={'/'} style={pathname === '/' ? { color: '#fff' } : {}}>
        Home
      </Link>
      {isUser && (
        <Link href={'/profile'} style={resolvedPathname[1] === 'profile' ? { color: '#fff' } : {}}>
          Profile
        </Link>
      )}
    </LinkContainer>
  );
}
