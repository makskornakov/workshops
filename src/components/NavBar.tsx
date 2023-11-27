import React from 'react';
import SigninButton from './buttons';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '~/app/utils/authOptions';
import prisma from '../../lib/prisma';
import { Header } from './NavBar.styled';
import Link from 'next/link';
import SignOutButton from './SignOutButton';
import { imageConfigDefault } from 'next/dist/shared/lib/image-config';
import Image from 'next/image';

export default async function NavBar() {
  const session = await getServerSession(authOptions);
  // console.log(session);
  // const accounts = session
  //   ? await prisma.account.findMany({
  //       where: {
  //         user: {
  //           email: session?.user?.email,
  //         },
  //       },
  //     })
  //   : null;
  // console.log('accounts', accounts);
  return (
    <Header>
      <div>
        <Link href={'/'}>Workshops.io</Link>
        {session?.user ? <SignOutButton /> : <Link href={'/api/auth/signin'}>Sign in</Link>}
      </div>
      <div>
        {session && (
          <>
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt={session.user.name + ' photo'}
                width={40}
                height={40}
              />
            )}
            <p>{session.user?.name}</p>
            <p>{session.user?.email}</p>
          </>
        )}
      </div>

      {/* {accounts && (
        <>
          <h2>Connected accounts</h2>
          {accounts.map((account) => {
            return (
              <div key={account.id}>
                <p>{account.provider}</p>
                <form>
                  <button
                    disabled={accounts.length === 1}
                    formAction={async () => {
                      'use server';
                      console.log('gonna delete account');
                      if (accounts.length === 1) {
                        // TODO fetch the accounts in here again instead of using an old value
                        console.log('cannot delete the only thing keeping the account alive');
                        return;
                      }
                      const deleted = await prisma.account.delete({
                        where: {
                          id: account.id,
                        },
                      });
                      console.log('deleted', deleted);
                    }}
                  >
                    Disconnect
                  </button>
                </form>
              </div>
            );
          })}
        </>
      )} */}
      {/* <SigninButton /> */}
    </Header>
  );
}
