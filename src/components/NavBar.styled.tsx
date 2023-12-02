import { CSSProperties, css } from '@linaria/core';
import { styled } from '@linaria/react';
import Link from 'next/link';

export const Header = styled.header`
  background: #222;

  display: flex;
  column-gap: 20px;
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
