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

export const LoginProviderButton = styled.button<{ bg: string; color?: string; small?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.5rem;
  font-size: ${(props) => (props.small ? '0.9rem' : '1.2rem')};
  width: ${(props) => (props.small ? '7rem' : 'auto')};
  column-gap: 0.75rem;
  cursor: pointer;
  outline: none;
  /* padding: 0.75rem 1.5rem; */
  padding: ${(props) => (props.small ? '0.5rem 1rem' : '0.75rem 1.5rem')};
  background: ${(props) => props.bg};
  color: ${(props) => props.color ?? 'black'};

  transition-property: filter;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;

  svg {
    height: 1.5rem;
    width: 1.5rem;
  }

  &:hover {
    /* slight transparent film on the button */
    filter: brightness(0.7);

    /* background: repeating-linear-gradient(#fff, #fff 0.5px, #000 0.5px, #000 1px); */
  }
`;

export const EmailFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > * {
    margin: 0.5rem;
  }
  & input {
    border: 1px solid black;
    outline: none;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
  }
`;
