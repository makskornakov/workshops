'use client';
import { signIn, signOut } from 'next-auth/react';
import { StyledButton } from '~/styles/shared';
import { usePathname } from 'next/navigation';

export function SignOutButton() {
  return (
    <StyledButton
      onClick={() => {
        signOut();
      }}
    >
      Sign out
    </StyledButton>
  );
}

export function SignInButton() {
  const pathname = usePathname();
  return pathname === '/auth/signin' ? null : (
    <StyledButton
      onClick={() => {
        signIn();
      }}
    >
      Sign in
    </StyledButton>
  );
}
