'use client';
import { getProviders, signIn } from 'next-auth/react';
import SignInEmail from '~/components/emailForm';

export function SignInButtons({
  providers,
}: {
  providers: NonNullable<Awaited<ReturnType<typeof getProviders>>>;
}) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          {provider.type === 'email' ? (
            <SignInEmail />
          ) : (
            <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
          )}
        </div>
      ))}
    </>
  );
}
