import rotatingAnimation from '../animation';
import { styled } from '@linaria/react';

export const words = [
  'Workshops',
  'Lessons',
  'Materials',
  'Lectures',
  'Courses',
  'Classes',
  'Activities',
  'Events',
  'Nine',
  'Ten',
  'Eleven',
];
const myAnimation = rotatingAnimation(11, words.length, 1, 3);
const mySteps = myAnimation.steps;
const myStyles = myAnimation.styles;
export const RotatingWordsContainer = styled.div`
  width: 100%;
  height: 100%;

  /* background-color: #ff121245; */
  position: relative;
  overflow: hidden;
  /* display: flex; */
  /* any first level child */

  > * {
    ${myStyles}

    /* background-color: #12d4ff6f; */
    width: 100%;
    height: 100%;
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: center; */

    & > div {
      outline: 1px solid cyan;
      width: 10rem;
      height: 5rem;
      /* height: 0; */
      margin: auto;
      margin-top: calc(40vh - 2.5rem);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    animation-timing-function: linear;
    animation-name: rotate-word;
    /* transform: translateY(50%) !important; */
    /* keyframes */
    @keyframes rotate-word {
      ${mySteps['1']} {
        opacity: 0;
        transform: translate(-60%, -25%);
        /* transform-origin: left; */
      }
      ${mySteps['2']} {
        opacity: 0.3;
        transform: translate(-30%, -25%);
        /* transform-origin: left; */
      }
      ${mySteps['3']} {
        opacity: 1;
        transform: translate(0%, -25%);
      }
      ${mySteps['4']} {
        /* opacity: 0.3; */
        transform: translate(30%, -25%);
        /* transform-origin: left; */
      }
      ${mySteps['5']} {
        /* opacity: 0; */
        transform: translate(30%, 0%);
        /* transform-origin: left; */
      }

      /* ? Main */
      ${mySteps['6']} {
        /* opacity: 0; */
        transform: translate(0%, 0%);
        /* transform-origin: left; */
      }
      ${mySteps['7']} {
        /* opacity: 0; */
        transform: translate(-30%, 0%);
        /* transform-origin: left; */
      }
      ${mySteps['8']} {
        /* opacity: 0; */
        transform: translate(-30%, 25%);
        /* transform-origin: left; */
      }
      ${mySteps['9']} {
        opacity: 1;
        transform: translate(0%, 25%);
        /* transform-origin: left; */
      }
      ${mySteps['10']} {
        opacity: 0.3;
        transform: translate(30%, 25%);
        /* transform-origin: left; */
      }
      ${mySteps['11']} {
        opacity: 0;
        transform: translate(60%, 25%);
        /* transform-origin: left; */
      }
    }
  }
`;