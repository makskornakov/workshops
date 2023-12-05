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
  minHeight: '16rem',
  background: 'none',
  border: '1px solid #333333',
  borderRadius: '0.5rem',
  padding: '1.5rem',
  display: 'flex',
  position: 'relative',

  h2: {
    fontWeight: 400,
  },
};

export const ProfileSection = styled.section`
  /* outline: 1px solid red; */

  ${sharedSectionStyle}

  flex-direction: column;
`;

export const ProfileSectionInside = styled.div`
  /* outline: 1px solid red; */
  height: 80%;
  min-height: 10rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    font-size: 0.9rem;
    font-weight: 300;
  }
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

export const ProfileSectionFooter = styled.div`
  /* make it on the bottom and 100% width */
  position: absolute;
  bottom: 0;
  border-top: 1px solid #333333;
  left: 0;
  font-weight: 300;
  font-size: 0.9rem;
  color: #b1b1b1;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  padding: 0 1.5rem;

  /* outline: 1px solid limegreen; */

  width: 100%;
  height: 20%;
`;
