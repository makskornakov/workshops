'use client';
import { signOut } from 'next-auth/react';
import { StyledButton } from '~/styles/shared';

export default function SignOutButton() {
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
