'use client';
import { getProviders, signIn } from 'next-auth/react';
import SignInEmail from '~/app/auth/signin/EmailForm';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { LoginProviderButton } from '~/app/auth/signin/signIn.styled';

export function SignInButtons({
  providers,
}: {
  providers: NonNullable<Awaited<ReturnType<typeof getProviders>>>;
}) {
  // console.log('providers', providers);
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          {provider.id === 'email' ? (
            <SignInEmail />
          ) : (
            <LoginProviderButton
              onClick={() => signIn(provider.id, { callbackUrl: '/profile' })}
              bg={provider.id == 'github' ? '#555' : 'white'}
              color={provider.id == 'github' ? 'white' : 'black'}
            >
              {provider.id === 'github' && <FaGithub />}
              {provider.id === 'google' && <FcGoogle />}Sign in with {provider.name}
            </LoginProviderButton>
          )}
        </div>
      ))}
    </>
  );
}
