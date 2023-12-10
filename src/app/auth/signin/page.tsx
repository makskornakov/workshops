import { getProviders } from 'next-auth/react';

// import { authOptions } from '~/app/api/auth/[...nextauth]/route';
// import { redirect } from 'next/navigation';
import { SignInButtons } from './SignInButtons';

import { LoginForm } from '~/components/signIn.styled';
import { getUser } from '~/app/utils/prismaUser';
import { redirect } from 'next/navigation';

export default async function SignIn({
  searchParams,
}: {
  searchParams: Record<'error' | 'callbackUrl', string | undefined>;
}) {
  console.log('searchParams', searchParams);

  const user = await getUser();
  if (user) {
    redirect('/profile/login-connections');
  }
  // const session = await getServerSession(authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  // if (session) {
  //   redirect('/');
  // }

  const providers = await getProviders();
  // console.log('providers', providers);
  if (!providers) {
    return <>Sorry, no providers</>;
  }
  // if (searchParams.error) {
  // redirect to auth/error?error=...
  // console.log('searchParams.error', searchParams.error);
  // redirect(`/auth/error?error=${searchParams.error}`);
  // }
  return (
    <LoginForm>
      <h1>Sign In to Workshops</h1>
      {searchParams.error && <p>Error: {searchParams.error}</p>}
      <SignInButtons providers={providers} />
    </LoginForm>
  );
}
