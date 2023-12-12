import { styled } from '@linaria/react';
import Link from 'next/link';
import { colorVar } from '~/utils/colors';
import { css } from '~/utils/styleUtils';

export const Header = styled.header`
  border-bottom: 1px solid ${colorVar('border-color')};

  position: sticky;
  top: 0;
  padding: 1rem 1.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;
export const LogoLink = styled(Link)`
  width: 3rem;
  height: 3rem;

  background-image: url('/light-favicon.svg');
  @media (prefers-color-scheme: dark) {
    background-image: url('/dark-favicon.svg');
  }

  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export const HeaderContainer = styled.div`
  /* background: red; */
  width: 100%;
  column-gap: 20px;
  display: flex;
  min-height: 2.5rem;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: center;
    column-gap: 1rem;
  }
`;

// const smallLinkStyleColor = `color: ${colorVar('secondary-color')}`;

// const smallLinkStyleHoverColor = `color: ${colorVar('main-color')};`;

const jointSmallLinkStyle = `
  color: ${colorVar('secondary-color')};

  &:hover {
    color: ${colorVar('main-color')};
  }
`;

export const smallLinkStyle = css`
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 300;
  transition: all 0.2s ease-in-out;
  ${jointSmallLinkStyle}
`;

export const LinkContainer = styled.nav`
  padding: 0.25rem 0rem;
  /* background: blue; */
  display: flex;
  align-items: flex-start;
  column-gap: 1.5rem;

  > a {
    ${smallLinkStyle}
  }
`;
