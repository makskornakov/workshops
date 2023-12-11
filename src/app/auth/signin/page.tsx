import { getProviders } from 'next-auth/react';
import { SignInButtons } from './SignInButtons';

import { LoginForm } from '~/app/auth/signin/signIn.styled';
import { getUser } from '~/utils/prismaUser';
import { redirect } from 'next/navigation';

export default async function SignIn({
  searchParams,
}: {
  searchParams: Record<'error' | 'callbackUrl', string | undefined>;
}) {
  console.log('searchParams', searchParams);

  const user = await getUser();
  if (user) {
    redirect(searchParams.callbackUrl || '/profile');
  }

  const providers = await getProviders();

  if (!providers) {
    return <>Sorry, no providers</>;
  }

  return (
    <LoginForm>
      <h1>Sign In to Workshops</h1>
      {searchParams.error && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '.5rem',
            alignItems: 'center',
          }}
        >
          {searchParams.error === 'OAuthAccountNotLinked' ? (
            <>
              <p
                style={{
                  borderBottom: '1px solid #e32323',
                }}
              >
                This provider is not linked yet
              </p>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: '#c9c9c9',
                }}
              >
                Sign in with the same provider and then link accounts
              </p>
            </>
          ) : (
            searchParams.error
          )}
        </div>
      )}
      <SignInButtons providers={providers} />
    </LoginForm>
  );
}
