import { revalidatePath } from 'next/cache';
import { getUser, getUserAccounts } from '~/utils/prismaUser';
import prisma from '../../../../lib/prisma';
import {
  ConnectedAccountForm,
  ConnectedAccounts,
  ProfileSection,
  ProfileSectionFooter,
  ProfileSectionInside,
} from '../profile.styled';
import { getProviders } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { ConnectionButtons } from './ConnectionButtons';
import { StyledButton } from '~/styles/shared';
import Link from 'next/link';

export default async function LoginConnections() {
  const user = await getUser();
  const providers = await getProviders();
  const accounts = await getUserAccounts(user);

  // find accounts that is github and get github data
  const ghAccount = accounts?.find((acc) => acc.provider === 'github');
  const ghData = ghAccount ? await getGitHubData(ghAccount.providerAccountId) : undefined;

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
      <ProfileSection>
        <ProfileSectionInside>
          <h2
            style={{
              margin: 'none',
            }}
          >
            Add new connection
          </h2>

          {providers && <ConnectionButtons providers={providers} />}
        </ProfileSectionInside>
        <ProfileSectionFooter>
          <p>
            Some text about how to link accounts. Lorem ipsum dolor sit amet consectetur adipisicing
          </p>
        </ProfileSectionFooter>
      </ProfileSection>

      <ProfileSection>
        <ProfileSectionInside>
          <h2>Linked accounts:</h2>
          <ProfileAccounts user={user} accounts={accounts} ghData={ghData} />
        </ProfileSectionInside>
        <ProfileSectionFooter>
          <p>We will display the connection date in the future.</p>
        </ProfileSectionFooter>
      </ProfileSection>
    </>
  );
}

/** Hydration error somewhere here */
async function ProfileAccounts({
  user,
  accounts,
  ghData,
}: {
  user: Awaited<ReturnType<typeof getUser>>;
  accounts: Awaited<ReturnType<typeof getUserAccounts>>;
  ghData: Awaited<ReturnType<typeof getGitHubData>> | undefined;
}) {
  if (!accounts) return null;

  return (
    <ConnectedAccounts>
      {accounts.map((account) => {
        return (
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
            <div>
              <p>{account.provider[0].toUpperCase() + account.provider.slice(1)}</p>
              {account.name && (
                <p>
                  {account.name}
                  {account.provider === 'github' && ghData?.login && (
                    <>
                      {' '}
                      <Link
                        href={`https://github.com/${ghData.login}`}
                        target="_blank"
                        style={{
                          textDecoration: 'underline',
                        }}
                      >
                        (@{ghData.login})
                      </Link>
                    </>
                  )}
                </p>
              )}
            </div>

            <div
              style={{
                marginLeft: 'auto',
                display: 'flex',
                columnGap: '1rem',
                alignItems: 'center',
              }}
            >
              {account.created_at && (
                <span>Connected {displayConnectionDate(account.created_at)} ago</span>
              )}
              <StyledButton disabled={accounts.length === 1} small red>
                Disconnect
              </StyledButton>
            </div>
          </ConnectedAccountForm>
        );
      })}
    </ConnectedAccounts>
  );
}

function displayConnectionDate(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffInDays = diff / (1000 * 3600 * 24);
  const diffInHours = diff / (1000 * 3600);
  const diffInMinutes = diff / (1000 * 60);
  const diffInSeconds = diff / 1000;

  if (diffInSeconds < 60) {
    return `${Math.floor(diffInSeconds)}s`;
  }
  if (diffInMinutes < 60) {
    return `${Math.floor(diffInMinutes)}m`;
  }
  if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h`;
  }
  return `${Math.floor(diffInDays)}d`;
}

async function getGitHubData(providerAccountId: string): Promise<{ login: string; name: string }> {
  const profileData = await fetch(`https://api.github.com/user/${providerAccountId}`, {
    next: {
      revalidate: 60 * 60 * 10,
    },
  });

  const json = await profileData.json();

  return json;
}
