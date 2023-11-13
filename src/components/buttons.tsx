'use client';
import React from 'react';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';

const SigninButton = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') return <h1> loading... please wait</h1>;
  if (status === 'authenticated') {
    if (session && session.user) {
      return (
        <div>
          <p>{session.user.name}</p>
          {session.user.image && (
            <Image
              src={session.user.image}
              alt={session.user.name + ' photo'}
              width={100}
              height={100}
            />
          )}
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      );
    }
  } else return <button onClick={() => signIn()}>Sign In</button>;
};

export default SigninButton;
