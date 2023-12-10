'use client';
import { getProviders, signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { LoginProviderButton } from '~/components/signIn.styled';
import { ConnectionsWrapper } from '../profile.styled';
export function ConnectionButtons({
  providers,
}: {
  providers: NonNullable<Awaited<ReturnType<typeof getProviders>>>;
}) {
  return (
    <ConnectionsWrapper>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          {provider.id !== 'email' && (
            <LoginProviderButton
              onClick={() => signIn(provider.id, { callbackUrl: '/profile/login-connections' })}
              bg={provider.id == 'github' ? '#555' : 'white'}
              color={provider.id == 'github' ? 'white' : 'black'}
              small
            >
              {provider.id === 'github' && <FaGithub />}
              {provider.id === 'google' && <FcGoogle />}
              {provider.name}
            </LoginProviderButton>
          )}
        </div>
      ))}
    </ConnectionsWrapper>
  );
}
