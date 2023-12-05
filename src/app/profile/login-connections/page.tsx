import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { getUser, getUserAccounts } from '~/app/utils/prismaUser';
import prisma from '../../../../lib/prisma';
import { ProfileSection } from '../profile.styled';

export default async function LoginConnections() {
  const user = await getUser();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <h2
        style={{
          fontWeight: 400,
          margin: 'none',
        }}
      >
        Login Connections
      </h2>
      <p style={{ fontWeight: 300, fontSize: '0.9rem' }}>
        You can link your account to other services to use them for authentication. You can link
        multiple accounts.
      </p>
      <ProfileSection>
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
      </ProfileSection>
    </div>
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
