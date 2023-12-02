import { CSSProperties, css } from '@linaria/core';
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
  background: '#222',
  color: '#fff',
  border: '1px solid #fff',
  borderRadius: '5px',
  fontSize: '.8rem',
  padding: '10px 20px',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    background: '#333',
  },
};

export const StyledButton = styled.button`
  ${LinkButtonStyle};
`;

export const StyledLink = styled(Link)`
  ${LinkButtonStyle};
`;
