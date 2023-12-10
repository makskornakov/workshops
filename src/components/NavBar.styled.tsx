import { CSSProperties } from '@linaria/core';
import { styled } from '@linaria/react';
import Link from 'next/link';

export const Header = styled.header`
  border-bottom: 1px solid #333333;

  position: sticky;
  top: 0;
  padding: 1rem 1.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
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
export const SmallLinkStyle: CSSProperties = {
  color: '#b5b5b5',
  textDecoration: 'none',
  fontSize: '0.9rem',
  fontWeight: 300,
  transition: 'all 0.2s ease-in-out',

  '&:hover': {
    color: '#fff',
  },
};
export const LinkContainer = styled.nav`
  padding: 0.25rem 0.75rem;
  /* background: blue; */
  display: flex;
  align-items: flex-start;
  column-gap: 1.5rem;

  > a {
    ${SmallLinkStyle};
  }
`;

const LinkButtonStyle: CSSProperties = {
  background: 'none',
  color: '#b1b1b1',
  borderColor: ' #b1b1b1',

  borderStyle: 'solid',
  borderWidth: '1px',
  borderRadius: '0.25rem',
  fontSize: '.8rem',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  transitionDuration: '0.2s',
  transitionProperty: 'color, border-color',

  '&:hover': {
    // background: '#333',
    color: '#ddd',
    borderColor: '#ddd',
  },

  '&:disabled': {
    background: '#222',
    borderColor: '#b1b1b1',
    color: '#b1b1b1',
    cursor: 'not-allowed',

    '&:hover': {
      background: '#222',
      color: '#b1b1b1',
    },
  },
};

export const StyledButton = styled.button<{ small?: boolean; red?: boolean }>`
  ${LinkButtonStyle};
  font-size: ${({ small }) => (small ? '.75rem' : '.8rem')};
  padding: ${({ small }) => (small ? '0.4rem 0.75rem' : '0.5rem 1rem')};
  border-color: ${(props) => (props.red ? '#F02E2E' : '#b1b1b1')};
  /* color  : ${({ red }) => (red ? '#d20000' : '#000')}; */
`;

export const StyledLink = styled(Link)`
  ${LinkButtonStyle};
`;
