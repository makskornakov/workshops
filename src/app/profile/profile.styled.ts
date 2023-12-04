import { styled } from '@linaria/react';
import { css } from '@linaria/core';
import { SmallLinkStyle } from '~/components/NavBar.styled';

export const PageHeading = styled.h1`
  /* outline: 1px solid pink; */
  font-weight: 400;
  padding: 2rem 7rem;
  width: 100%;
  border-bottom: 1px solid #333333;
`;

export const ProfileContainer = styled.div`
  /* outline: 1px solid red; */
  /* width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
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

export const ProfileSection = styled.section`
  /* outline: 1px solid blue; */
  width: 100%;
  min-height: 10rem;
  background: none;
  border: 1px solid #333333;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

export const AvatarSection = styled.section`
  /* outline: 1px solid blue; */
  width: 100%;
  min-height: 10rem;
  background: none;
  border: 1px solid #333333;
  border-radius: 0.5rem;
  padding: 1.5rem;
  display: flex;

  flex-direction: row;
  /* align-items: center; */
  justify-content: space-between;
  > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    p {
      font-size: 0.9rem;
      font-weight: 300;
    }
  }
  h2 {
    font-weight: 400;
  }
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
