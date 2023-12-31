import { styled } from '@linaria/react';

export const MaterialEditorForm = styled.form`
  /* outline: 1px solid red; */

  width: 80%;
  margin: 3rem auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  padding-bottom: 3.5rem;

  & > div {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    & > div {
      display: flex;
      flex-direction: column;
      row-gap: 0.5rem;
      /* here it is */
    }
  }

  & > div:first-child {
    & section {
      /* outline: 1px solid red; */
      border: 1px solid #333333;
      border-radius: 0.25rem;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      row-gap: 1rem;
    }

    width: 35%;
  }

  & > div:nth-child(2) {
    /* outline: 1px solid yellow; */

    width: 60%;
  }

  & > div:last-child {
    /* outline: 1px solid green; */

    width: 100%;
    position: absolute;
    height: 3rem;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    & > p {
      font-size: 0.9rem;
      font-weight: 300;
      color: #b1b1b1;
    }
  }

  label {
    color: #b1b1b1;
    font-weight: 300;
    font-size: 0.95rem;

    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;

    /* & > input,
    & > section {
      margin-top: 0.5rem;
    } */
  }

  input,
  textarea {
    background: none;
    width: 100%;
    height: 2rem;
    color: #ffffff;
    border: 1px solid #333333;
    border-radius: 0.25rem;
    padding: 0.5rem;
    font-size: 0.9rem;
    font-weight: 200;
    transition: border 0.2s ease-in-out;

    &:focus {
      outline: none;
      border: 1px solid #b1b1b1;
    }
  }

  textarea {
    min-height: 4rem;
    max-height: 8rem;
    resize: vertical;
  }

  button {
    width: 6rem;
    height: 2rem;
    border: 1px solid #333333;
    border-radius: 0.5rem;
    background-color: #ffffff;
    color: #333333;
    cursor: pointer;
    font-weight: 300;
    font-size: 1.15rem;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: #b1b1b1;
    }

    &:disabled {
      background-color: #b1b1b1;
      cursor: not-allowed;
    }
  }
`;

export const SelectWrapLabel = styled.label`
  position: relative;

  select {
    background: none;
    appearance: none;
    width: 100%;

    color: #ffffff;
    border: 1px solid;
    border-color: #333333;
    border-radius: 0.25rem;
    padding: 0.5rem;
    font-size: 0.9rem;
    position: relative;
    font-weight: 200;
    transition: border 0.2s ease-in-out;
    font-family: inherit;
    cursor: pointer;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    top: 35%;
    right: 1.5rem;

    border: solid;
    border-color: #b1b1b1;
    border-width: 0 1px 1px 0;
    padding: 0.3rem;

    transform: rotate(45deg) translateY(-50%);
    transition-duration: 0.2s;
    transition-property: border-color;
  }

  &:focus-within {
    select {
      outline: none;
      border-color: #b1b1b1;
    }

    &::after {
      border-color: #ffffff;
    }
  }

  &:hover {
    select {
      border-color: #b1b1b1;
    }

    &::after {
      border-color: #ffffff;
    }
  }
`;
