'use client';
import { signOut } from 'next-auth/react';
import { StyledButton } from './NavBar.styled';

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
