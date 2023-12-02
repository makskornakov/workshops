import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { getUser, getUserAccounts } from '~/app/utils/prismaUser';
import prisma from '../../../../lib/prisma';

export default async function LoginConnections() {
  const user = await getUser();

  return (
    <>
      <h2>Login Connections</h2>
      <Link
        href={'/api/auth/signin'}
        style={{
          // color: 'blue',
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
      >
        Link another account
      </Link>
      <ProfileAccounts user={user} />
    </>
  );
}
async function ProfileAccounts({ user }: { user: Awaited<ReturnType<typeof getUser>> }) {
  const accounts = await getUserAccounts(user);

  if (!accounts) return null;

  return (
    <div>
      {accounts.map((account) => (
        <form
          key={account.id}
          action={async () => {
            'use server';

            const accounts = await getUserAccounts(user);
            if (!accounts) {
              throw new Error('No accounts whatsoever');
            }
            if (accounts.length === 1) {
              throw new Error('Cannot delete last account');
            }

            await prisma.account.delete({ where: { id: account.id } });
            revalidatePath('/profile', 'page');
          }}
        >
          <p>{account.provider}</p>
          <button disabled={accounts.length === 1}>Disconnect</button>
        </form>
      ))}
    </div>
  );
}
