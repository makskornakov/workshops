import { styled } from '@linaria/react';

export const UploadWrapper = styled.div`
  /* outline: 1px solid red; */

  width: 10rem;
  min-height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.75rem;

  > span {
    font-weight: 300;
    font-size: 0.8rem;
    color: #b1b1b1;
  }

  > div {
    display: flex;
    width: 9rem;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const UploadButton = styled.button<{ red?: boolean }>`
  /* outline: 1px solid red; */
  width: 4rem;
  height: 1.5rem;
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => (props.red ? '#F02E2E' : '#17FA57')};
  border-radius: 0.5rem;
  background: none;
  color: #c1c1c1;
  font-size: 0.7rem;
  font-weight: 300;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #333333;
    color: #ffffff;
  }

  &:disabled {
    border-color: #c1c1c1;
    color: #c1c1c1;
    cursor: not-allowed;

    &:hover {
      background: none;
      color: #c1c1c1;
    }
  }
`;

export const MainUploadLabel = styled.label`
  /* outline: 1px solid yellow; */
  width: 6rem;
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
      filter: brightness(0.7);
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
