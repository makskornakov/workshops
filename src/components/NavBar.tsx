import React from 'react';
import { Header, HeaderContainer, StyledLink } from './NavBar.styled';
import Link from 'next/link';
import SignOutButton from './SignOutButton';
import Image from 'next/image';
import { getUser } from '~/app/utils/prismaUser';
import LinksNav from './LinksNav';

import logo from '~/icons/logo.svg';

export default async function NavBar() {
  const user = await getUser();

  return (
    <Header>
      <HeaderContainer>
        <div style={{ alignItems: 'center', gap: '1rem' }}>
          <Link href={'/'}>
            <Image src={logo} alt={'logo'} width={40} height={40} />
          </Link>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Link href={'/'}>Gsw.st</Link>
            <Link
              href={'/'}
              style={{
                fontSize: '0.9rem',
                fontWeight: 300,
                color: '#c9c9c9',
              }}
            >
              Workshop Studio
            </Link>

            {/* {user ? <SignOutButton /> : <Link href={'/api/auth/signin'}>Sign in</Link>} */}
          </div>
        </div>
        <div>
          {user ? (
            <>
              <Link
                href={'/profile'}
                style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
              >
                {user.image && (
                  <Image src={user.image} alt={user.name + ' photo'} width={40} height={40} />
                )}
                <p>{user.name}</p>
              </Link>
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
