import { styled } from '@linaria/react';
import { showcaseAnimation } from './animation';

export const homeWords = [
  'Workshops',
  'Lessons',
  'Materials',
  'Lectures',
  // 'Courses',
  // 'Classes',
  'Activities',
  // 'Events',
];
// * match Arts animation

const {
  keyframePoints: myKeyframePoints,
  styles: { baseStyles: myBaseStyles },
} = showcaseAnimation({
  keyframesQuantity: 5,
  elementQuantity: homeWords.length,
  duration: 1.7,
  moveHoldRatio: 0.45,
});

export const HomeMainContainer = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  row-gap: 2rem;
`;

export const HomeHeadingContainer = styled.div`
  /* outline: 1px solid yellow; */

  /* margin-top: 5rem; */
  width: 100%;
  padding: 0 10%;
  height: 20rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  /* justify-content: center; */

  > h1 {
    /* outline: 1px solid red; */

    font-size: 3.5rem;
    display: flex;
    flex-direction: row;
    column-gap: 1.5rem;
    /* flex-wrap: nowrap; */
    font-weight: 300;
  }
`;

export const RotatingWordsContainer = styled.div`
  position: relative;
  display: flex;

  > span {
    /* outline: 1px solid red; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  > * {
    ${myBaseStyles}

    animation-name: rotate-word;

    /* keyframes */
    @keyframes rotate-word {
      ${myKeyframePoints[0]} {
        opacity: 0;
        transform: translateY(-100%) scale(0);
        transform-origin: left;
      }
      ${myKeyframePoints[1]} {
        opacity: 0.3;
        transform: translateY(-75%) scale(0.5);
        transform-origin: left;
      }
      ${myKeyframePoints[2]} {
        opacity: 1;
        transform: none;
      }
      ${myKeyframePoints[3]} {
        opacity: 0.3;
        transform: translateY(75%) scale(0.5);
        transform-origin: left;
      }
      ${myKeyframePoints[4]} {
        opacity: 0;
        transform: translateY(100%) scale(0);
        transform-origin: left;
      }
    }
  }
`;
