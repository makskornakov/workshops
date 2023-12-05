import React from 'react';
import { Header, HeaderContainer, LinkContainer, StyledLink } from './NavBar.styled';
import Link from 'next/link';
import SignOutButton from './SignOutButton';
import Image from 'next/image';
import { getUser } from '~/app/utils/prismaUser';
import LinksNav from './LinksNav';

export default async function NavBar() {
  const user = await getUser();

  return (
    <Header>
      <HeaderContainer>
        <div style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <Link href={'/'}>Gsw.st</Link>
          <Link
            href={'/'}
            style={{
              fontSize: '0.9rem',
              color: '#c9c9c9',
            }}
          >
            Workshop Studio
          </Link>

          {/* {user ? <SignOutButton /> : <Link href={'/api/auth/signin'}>Sign in</Link>} */}
        </div>
        <div>
          {user ? (
            <>
              {user.image && (
                <Image src={user.image} alt={user.name + ' photo'} width={40} height={40} />
              )}
              <p>{user.name}</p>
              {/* <StyledLink href={'/profile'}>Profile</StyledLink> */}
              <SignOutButton />
            </>
          ) : (
            <>
              <StyledLink href={'/api/auth/signin'}>Sign in</StyledLink>
            </>
          )}
        </div>
      </HeaderContainer>
      <LinksNav isUser={!!user} />
    </Header>
  );
}
