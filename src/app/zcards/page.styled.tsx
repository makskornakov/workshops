import { showcaseAnimation } from '../animation';
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
const {
  styles: { baseStyles },
  keyframePoints,
} = showcaseAnimation(11, words.length, 1, 3);

export const RotatingWordsContainer = styled.div`
  width: 100%;
  height: 100%;

  /* background-color: #ff121245; */
  position: relative;
  overflow: hidden;
  /* display: flex; */
  /* any first level child */

  > * {
    ${baseStyles}

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
      ${keyframePoints[0]} {
        opacity: 0;
        transform: translate(-60%, -25%);
        /* transform-origin: left; */
      }
      ${keyframePoints[1]} {
        opacity: 0.3;
        transform: translate(-30%, -25%);
        /* transform-origin: left; */
      }
      ${keyframePoints[2]} {
        opacity: 1;
        transform: translate(0%, -25%);
      }
      ${keyframePoints[3]} {
        /* opacity: 0.3; */
        transform: translate(30%, -25%);
        /* transform-origin: left; */
      }
      ${keyframePoints[4]} {
        /* opacity: 0; */
        transform: translate(30%, 0%);
        /* transform-origin: left; */
      }

      /* ? Main */
      ${keyframePoints[5]} {
        /* opacity: 0; */
        transform: translate(0%, 0%);
        /* transform-origin: left; */
      }
      ${keyframePoints[6]} {
        /* opacity: 0; */
        transform: translate(-30%, 0%);
        /* transform-origin: left; */
      }
      ${keyframePoints[7]} {
        /* opacity: 0; */
        transform: translate(-30%, 25%);
        /* transform-origin: left; */
      }
      ${keyframePoints[8]} {
        opacity: 1;
        transform: translate(0%, 25%);
        /* transform-origin: left; */
      }
      ${keyframePoints[9]} {
        opacity: 0.3;
        transform: translate(30%, 25%);
        /* transform-origin: left; */
      }
      ${keyframePoints[10]} {
        opacity: 0;
        transform: translate(60%, 25%);
        /* transform-origin: left; */
      }
    }
  }
`;
