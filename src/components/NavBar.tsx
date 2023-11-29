import React from 'react';
import { Header } from './NavBar.styled';
import Link from 'next/link';
import SignOutButton from './SignOutButton';
import Image from 'next/image';
import { getUser } from '~/app/utils/prismaUser';

export default async function NavBar() {
  const user = await getUser();

  return (
    <Header>
      <div>
        <Link href={'/'}>Workshops.io</Link>
        {user ? <SignOutButton /> : <Link href={'/api/auth/signin'}>Sign in</Link>}
      </div>
      <div>
        {user && (
          <>
            {user.image && (
              <Image src={user.image} alt={user.name + ' photo'} width={40} height={40} />
            )}
            <p>{user.name}</p>
            <Link href={'/profile'}>Profile</Link>
          </>
        )}
      </div>
    </Header>
  );
}
