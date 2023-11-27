import { css } from '@linaria/core';
import { styled } from '@linaria/react';

export const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  & > * {
    margin: 0.5rem;
  }
`;

export const LoginProviderButton = styled.button<{ bg: string; color?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background: ${(props) => props.bg};
  color: ${(props) => props.color ?? 'black'};
`;
