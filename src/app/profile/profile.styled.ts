import { styled } from '@linaria/react';

import { SmallLinkStyle } from '~/components/layout/navbar/NavBar.styled';
import { css } from '~/utils/styleUtils';

export const ProfileContainer = styled.div`
  /* outline: 1px solid red; */
  width: 80%;
  /* height: 100%; */

  display: flex;
  margin: 4rem auto;
  gap: 5%;
`;

export const ProfileSectionContainer = styled.div`
  /* outline: 1px solid blue; */

  width: 70%;
  display: flex;
  /* padding-bottom: 2rem; */
  flex-direction: column;
  gap: 1rem;
`;

export const ProfileSidebar = styled.div`
  /* outline: 1px solid green; */

  width: 25%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  & > a {
    ${SmallLinkStyle}
  }
`;

const sharedSectionStyle = css`
  /* outline: 1px solid yellow; */

  width: 100%;
  /* min-height: 16rem; */
  background: none;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  display: flex;
  /* gap: 1rem; */
  position: relative;
  /* padding-bottom: 3rem; */

  h2 {
    font-size: 1.2rem;
  }
  h2,
  h3 {
    font-weight: 400;
  }
  h3 {
    font-size: 0.95rem;
  }
`;

export const ProfileSection = styled.section`
  /* padding-bottom: 3rem; */
  ${sharedSectionStyle}

  flex-direction: column;
`;

export const ProfileSectionInside = styled.div`
  /* outline: 1px solid pink; */
  padding: 1.5rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    font-size: 0.9rem;
    font-weight: 300;
  }
`;

export const ProfileSectionFooter = styled.div`
  /* make it on the bottom and 100% width */
  /* outline: 1px solid red; */

  /* position: absolute; */
  /* bottom: 0; */
  border-top: 1px solid var(--border-color);
  /* left: 0; */
  font-weight: 300;
  font-size: 0.9rem;
  color: var(--tertiary-color);

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  padding: 0 1.5rem;

  /* outline: 1px solid limegreen; */

  width: 100%;
  height: 2.5rem;
`;

export const ProfileForm = styled.form`
  /* outline: 1px solid red; */

  display: flex;
  flex-direction: column;
  gap: 1rem;

  input,
  textarea {
    background: none;
    width: 20rem;
    height: 2rem;
    color: var(--main-color);
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    padding: 0.5rem;
    font-size: 0.9rem;
    font-weight: 200;
    transition: border 0.2s ease-in-out;

    &:focus {
      outline: none;
      border: 1px solid var(--secondary-color);
    }
  }

  button {
    width: 6rem;
    height: 2rem;
    border: 1px solid;
    border-color: var(--border-color);
    border-radius: 0.5rem;
    background: none;

    color: var(--border-color);
    cursor: pointer;
    font-weight: 300;
    font-size: 1.15rem;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      border-color: var(--secondary-color);
      color: var(--secondary-color);
      /* background-color: var(--secondary-color); */
    }

    &:disabled {
      color: var(--tertiary-color);
      border-color: var(--tertiary-color);
      /* background-color: var(--tertiary-color); */
      cursor: not-allowed;

      &:hover {
        color: var(--tertiary-color);
        border-color: var(--tertiary-color);
        /* background-color: var(--tertiary-color); */
      }
    }
  }
`;

export const ConnectionsWrapper = styled.div`
  /* outline: 1px solid red; */

  /* margin-top: 1.5rem; */
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export const ConnectedAccounts = styled.div`
  /* outline: 1px solid limegreen; */

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ConnectedAccountForm = styled.form`
  svg {
    height: 1.5rem;
    width: 1.5rem;
  }

  display: flex;
  align-items: center;
  column-gap: 1rem;
  span {
    font-size: 0.9rem;
    font-weight: 300;
    color: var(--secondary-color);
  }
  > div {
    > p:last-child {
      color: var(--tertiary-color);
    }
  }
`;
