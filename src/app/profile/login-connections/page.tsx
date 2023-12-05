import { revalidatePath } from 'next/cache';
// import Link from 'next/link';
import { getUser, getUserAccounts } from '~/app/utils/prismaUser';
import prisma from '../../../../lib/prisma';
import {
  ConnectedAccountForm,
  ConnectedAccounts,
  ProfileSection,
  ProfileSectionFooter,
  ProfileSectionInside,
} from '../profile.styled';
import { getProviders, signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
// import { LoginProviderButton } from '~/components/signIn.styled';
import { ConnectionButtons } from './ConnectionButtons';
import { StyledButton } from '~/components/NavBar.styled';

export default async function LoginConnections() {
  const user = await getUser();
  const providers = await getProviders();

  return (
    <>
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
      </div>
      <ProfileSection style={{ minHeight: '10rem' }}>
        <h2>Add new connection</h2>
        {/* <Link
          href={'/api/auth/signin'}
          style={{
            // color: 'blue',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          Link another account
        </Link> */}
        {providers && <ConnectionButtons providers={providers} />}

        <ProfileSectionFooter>
          <p>
            Some text about how to link accounts. Lorem ipsum dolor sit amet consectetur adipisicing
          </p>
        </ProfileSectionFooter>
      </ProfileSection>
      <ProfileSection style={{ minHeight: '10rem' }}>
        <ProfileSectionInside>
          <h2>Linked accounts:</h2>
          <ProfileAccounts user={user} />
        </ProfileSectionInside>
        <ProfileSectionFooter>
          <p>We will display the connection date in the future.</p>
        </ProfileSectionFooter>
      </ProfileSection>
    </>
  );
}

async function ProfileAccounts({ user }: { user: Awaited<ReturnType<typeof getUser>> }) {
  const accounts = await getUserAccounts(user);

  if (!accounts) return null;

  return (
    <ConnectedAccounts>
      {accounts.map((account) => (
        <ConnectedAccountForm
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
          {account.provider === 'github' && <FaGithub />}
          {account.provider === 'google' && <FcGoogle />}
          <p>{account.provider[0].toUpperCase() + account.provider.slice(1)}</p>
          <StyledButton disabled={accounts.length === 1} small red>
            Disconnect
          </StyledButton>
        </ConnectedAccountForm>
      ))}
    </ConnectedAccounts>
  );
}
