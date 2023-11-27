import { getServerSession } from 'next-auth';
import { authOptions } from '../utils/authOptions';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '../../../lib/prisma';
import ErrorBoundary from 'next/dist/client/components/error-boundary';

export default async function Profile() {
  const session = await getServerSession(authOptions);
  return (
    session && (
      <div>
        <h1>Use profile & settings</h1>
        <h2>Profile</h2>
        {session?.user?.image && (
          <Image
            src={session?.user?.image}
            alt={session?.user?.name + ' photo'}
            width={100}
            height={100}
          />
        )}
        <p>Name: {session?.user?.name}</p>
        <p>Email: {session?.user?.email}</p>

        <form
          action={async (formData) => {
            'use server';

            const newName = formData.get('name');
            if (!newName || typeof newName !== 'string' || newName.length < 3) {
              throw new Error('Name validation failed');
            }

            const session = await getServerSession(authOptions);
            if (!session?.user) {
              throw new Error('Session or user is not present');
            }
            if (typeof session.user.email !== 'string') {
              throw new Error("User's email type is missing");
            }

            if (newName === session?.user?.name) {
              // бля а как выбросить ошибку и куда ана паппадёт
              return;
            }

            const updatedUser = await prisma.user.update({
              data: { name: newName },
              where: { email: session.user.email },
              // throw error if user not found
            });
          }}
        >
          <input type="text" name="name" defaultValue={session.user?.name ?? ''} />
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
      </div>
    )
  );
}
