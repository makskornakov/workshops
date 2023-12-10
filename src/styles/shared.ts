import { styled } from '@linaria/react';
import Link from 'next/link';
import { css } from '~/utils/styleUtils';

export const PageHeading = styled.h1`
  /* outline: 1px solid pink; */

  font-weight: 400;
  padding: 2rem 10%;
  width: 100%;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
`;

export const LinkButtonStyle = css`
  background: none;
  color: var(--secondary-color);

  border-radius: 0.25rem;
  border: 1px solid var(--secondary-color);
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition-duration: 0.2s;
  transition-property: color, border-color;

  &:hover {
    color: var(--main-color);
    border-color: var(--main-color);
  }

  &:disabled {
    border-color: var(--tertiary-color);
    color: var(--tertiary-color);
    cursor: not-allowed;

    &:hover {
      color: var(--tertiary-color);
      border-color: var(--tertiary-color);
    }
  }
`;

export const StyledButton = styled.button<{ small?: boolean; red?: boolean }>`
  /* outline: 1px solid yellow; */

  ${LinkButtonStyle}

  font-size: ${({ small }) => (small ? '.75rem' : '.8rem')};
  padding: ${({ small }) => (small ? '0.4rem 0.75rem' : '0.5rem 1rem')};
  border-color: ${(props) => (props.red ? '#F02E2E' : 'initial')};
`;

export const StyledLink = styled(Link)`
  /* outline: 1px solid limegreen; */

  ${LinkButtonStyle}
`;
