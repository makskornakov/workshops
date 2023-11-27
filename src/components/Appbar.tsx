import React from 'react';
import SigninButton from './buttons';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '~/app/utils/authOptions';
import prisma from '../../lib/prisma';

const Appbar = async () => {
  const session = await getServerSession(authOptions);
  // console.log(session);
  const accounts = session
    ? await prisma.account.findMany({
        where: {
          user: {
            email: session?.user?.email,
          },
        },
      })
    : null;
  // console.log('accounts', accounts);
  return (
    <header>
      {accounts && (
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
      )}
      <SigninButton />
    </header>
  );
};

export default Appbar;
