'use client';
import Link from 'next/link';
import { LinkContainer } from './NavBar.styled';
import { usePathname } from 'next/navigation';

export default function LinksNav({ isUser }: { isUser: boolean }) {
  const pathname = usePathname();
  const resolvedPathname = pathname.split('/');

  return (
    <LinkContainer>
      <Link href={'/'} style={{ color: pathname === '/' ? '#fff' : '#a8a8a8' }}>
        Home
      </Link>
      {isUser && (
        <Link
          href={'/profile'}
          style={{ color: resolvedPathname[1] === 'profile' ? '#fff' : '#a8a8a8' }}
        >
          Profile
        </Link>
      )}
    </LinkContainer>
  );
}
