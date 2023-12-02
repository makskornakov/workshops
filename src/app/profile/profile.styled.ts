import { styled } from '@linaria/react';

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
  gap: 3rem;
  margin: 4rem 7rem;
`;

export const ProfileSection = styled.section`
  /* outline: 1px solid blue; */
  width: 100%;
  min-height: 10rem;
  background: none;
  border: 1px solid #b1b1b1;
  border-radius: 0.25rem;
  padding: 1rem;
  display: flex;
`;

export const ProfileSidebar = styled.div`
  width: 15rem;
  /* outline: 1px solid green; */
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
