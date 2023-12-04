import { css } from '@linaria/core';
import { styled } from '@linaria/react';

export const UploadWrapper = styled.div`
  /* outline: 1px solid red; */

  width: 6rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.5rem;

  > span {
    font-weight: 300;
    font-size: 0.8rem;
    color: #b1b1b1;
  }
`;
export const MainUploadLabel = styled.label`
  /* outline: 1px solid yellow; */
  width: 100%;
  height: 6rem;
  display: grid;
  position: relative;
  place-items: center;
  cursor: pointer;
  /* border-radius: 50%; */

  /* spin animation */
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  > img {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;

    transition: filter 0.2s ease-in-out;
    /* hover filter small darken overlay */
    &:hover {
      filter: brightness(0.8);
    }
  }
  > div {
    display: none;
    width: 100%;
    height: 6rem;
    z-index: 1;
    width: 70%;
    height: 70%;

    > svg {
      width: 100%;
      height: 100%;

      animation: spin 2s linear infinite;
      filter: drop-shadow(0 0 0.5rem #000);
    }
  }
`;
