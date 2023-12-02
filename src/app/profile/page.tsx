import Image from 'next/image';
import Link from 'next/link';
import prisma from '../../../lib/prisma';
import { redirect } from 'next/navigation';
import { getUser, getUserAccounts } from '../utils/prismaUser';
import { revalidatePath } from 'next/cache';

export default async function Profile() {
  const user = await getUser();
  if (!user) {
    redirect('/api/auth/signin');
  }
  return (
    user && (
      <div>
        <h1>Use profile & settings</h1>
        <h2>Profile</h2>
        {user.image && (
          <Image src={user.image} alt={user?.name + ' photo'} width={100} height={100} />
        )}
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>

        <form
          action={async (formData) => {
            'use server';

            const newName = formData.get('name');
            if (!newName || typeof newName !== 'string' || newName.length < 3) {
              throw new Error('Name validation failed');
            }

            const user = await getUser();
            if (!user) {
              throw new Error('Session or user is not present');
            }
            if (typeof user.email !== 'string') {
              throw new Error("User's email type is invalid");
            }

            if (newName === user.name) {
              // бля а как выбросить ошибку и куда ана паппадёт
              return;
            }

            await prisma.user.update({
              data: { name: newName },
              where: { email: user.email },
              // TODO throw error if user not found
            });

            revalidatePath('/profile', 'page');
          }}
        >
          <input type="text" name="name" defaultValue={user.name ?? ''} />
          <button type="submit">Submit</button>
        </form>

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
      </div>
    )
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
