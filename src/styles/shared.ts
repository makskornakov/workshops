import { styled } from '@linaria/react';
import Link from 'next/link';
import { colorVar } from '~/utils/colors';
import { css } from '~/utils/styleUtils';

export const PageHeading = styled.h1`
  /* outline: 1px solid pink; */

  font-weight: 400;
  padding: 2rem 10%;
  width: 100%;
  border-bottom: 1px solid ${colorVar('border-color')};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
`;

// const mainLinkColorStyles = `color: ${colorVar('secondary-color')}; border-color: ${colorVar(
//   'secondary-color',
// )};`;

// const hoverLinkColorStyles = `color: ${colorVar('main-color')}; border-color: ${colorVar(
//   'main-color',
// )};`;

// const disabledLinkColorStyles = `color: ${colorVar('tertiary-color')}; border-color: ${colorVar(
//   'tertiary-color',
// )};`;

const joinedLinkColorStyles = `
color: ${colorVar('secondary-color')};
border-color: ${colorVar('secondary-color')};

&:hover {
  color: ${colorVar('main-color')};
  border-color: ${colorVar('main-color')};
}

&:disabled {
  &, &:hover {
    color: ${colorVar('tertiary-color')};
    border-color: ${colorVar('tertiary-color')};
  }
}


`;

const linkButtonStyle = css`
  background: none;

  border-radius: 0.25rem;
  border: 1px solid;

  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition-duration: 0.2s;
  transition-property: color, border-color;

  ${joinedLinkColorStyles}

  &:disabled {
    cursor: not-allowed;
  }
`;
// console.log('linkButtonStyle', linkButtonStyle);

export const StyledButton = styled.button<{ small?: boolean; red?: boolean }>`
  /* outline: 1px solid yellow; */

  ${linkButtonStyle}

  font-size: ${({ small }) => (small ? '.75rem' : '.8rem')};
  padding: ${({ small }) => (small ? '0.4rem 0.75rem' : '0.5rem 1rem')};
  border-color: ${(props) => (props.red ? '#F02E2E' : 'initial')};
`;

export const StyledLink = styled(Link)`
  /* outline: 1px solid limegreen; */

  ${linkButtonStyle}
`;
