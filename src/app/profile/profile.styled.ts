import { styled } from '@linaria/react';
import { CSSProperties, css } from '@linaria/core';
import { SmallLinkStyle } from '~/components/NavBar.styled';

export const PageHeading = styled.h1`
  /* outline: 1px solid pink; */
  font-weight: 400;
  padding: 2rem 7rem;
  width: 100%;
  border-bottom: 1px solid #333333;
`;

export const ProfileContainer = styled.div`
  display: flex;
  gap: 4rem;
  margin: 4rem 7rem;
`;

export const ProfileSectionContainer = styled.div`
  /* outline: 1px solid blue; */
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const sharedSectionStyle: CSSProperties = {
  width: '100%',
  minHeight: '10rem',
  background: 'none',
  border: '1px solid #333333',
  borderRadius: '0.5rem',
  padding: '1.5rem',
  display: 'flex',

  '> div': {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',

    p: {
      fontSize: '0.9rem',
      fontWeight: 300,
    },
  },
  h2: {
    fontWeight: 400,
  },
};

export const ProfileSection = styled.section`
  /* outline: 1px solid red; */

  ${sharedSectionStyle}

  flex-direction: column;
`;
export const AvatarSection = styled.section`
  /* outline: 1px solid blue; */
  ${sharedSectionStyle}

  flex-direction: row;
  justify-content: space-between;
`;

export const ProfileSidebar = styled.div`
  width: 15rem;
  /* outline: 1px solid green; */
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  & > a {
    ${SmallLinkStyle}
  }
`;
