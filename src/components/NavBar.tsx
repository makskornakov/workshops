import React from 'react';
import { Header, StyledLink } from './NavBar.styled';
import Link from 'next/link';
import SignOutButton from './SignOutButton';
import Image from 'next/image';
import { getUser } from '~/app/utils/prismaUser';

export default async function NavBar() {
  const user = await getUser();

  return (
    <Header>
      <div>
        <Link href={'/'}>Gsw.st</Link>
        {/* {user ? <SignOutButton /> : <Link href={'/api/auth/signin'}>Sign in</Link>} */}
      </div>
      <div>
        {user ? (
          <>
            {user.image && (
              <Image src={user.image} alt={user.name + ' photo'} width={40} height={40} />
            )}
            <p>{user.name}</p>
            <StyledLink href={'/profile'}>Profile</StyledLink>
            <SignOutButton />
          </>
        ) : (
          <>
            <StyledLink href={'/api/auth/signin'}>Sign in</StyledLink>
          </>
        )}
      </div>
    </Header>
  );
}
