import React from 'react';
import { Header, HeaderContainer, LogoLink } from './NavBar.styled';
import Link from 'next/link';
import { SignInButton, SignOutButton } from './AuthButtons';
import Image from 'next/image';
import { getUser } from '~/utils/prismaUser';
import LinksNav from './LinksNav';

export default async function NavBar() {
  const user = await getUser();

  return (
    <Header>
      <HeaderContainer>
        <div style={{ alignItems: 'center', gap: '1rem' }}>
          <LogoLink href={'/'} />
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
                  <div
                    style={{
                      borderRadius: '50%',
                      overflow: 'hidden',
                      width: '3rem',
                      height: '3rem',
                      position: 'relative',
                    }}
                  >
                    <Image
                      src={user.image}
                      alt={user.name + ' photo'}
                      fill
                      quality={50}
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                )}
                <p>{user.name}</p>
                <SignOutButton />
              </Link>
            </>
          ) : (
            // pathname is not /auth/signin
            <SignInButton />
          )}
        </div>
      </HeaderContainer>
      <LinksNav isUser={!!user} />
    </Header>
  );
}
