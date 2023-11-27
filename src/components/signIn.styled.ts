import { css } from '@linaria/core';
import { styled } from '@linaria/react';

export const LoginForm = styled.div`
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > h1 {
    margin-bottom: 2rem;
  }
  & > * {
    margin: 0.5rem;
  }
`;

export const LoginProviderButton = styled.button<{ bg: string; color?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  column-gap: 0.5rem;
  cursor: pointer;
  outline: none;
  padding: 0.5rem 1rem;
  background: ${(props) => props.bg};
  color: ${(props) => props.color ?? 'black'};
`;

export const EmailFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* padding: 1rem; */

  & > * {
    margin: 0.5rem;
  }
  & input {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
  }
`;
