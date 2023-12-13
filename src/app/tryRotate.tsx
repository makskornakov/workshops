// All time (intervals) are in seconds.

import { styled } from '@linaria/react';

const howMuchWordsToUse = 5;
const hugeWordsList = [
  'Workshops',
  'Lessons',
  'Materials',
  'Lectures',
  'Courses',
  'Classes',
  'LOH',
] as const;

export const triedWords = hugeWordsList.slice(0, howMuchWordsToUse);

const config = {
  stepDuration: 1.5,
  frontFacingWordsQuantity: 3,
  words: triedWords,
} as const;

const directCalculationsFromConfig = {
  wordDelay: config.stepDuration * 2, // 2 here because #1 is word staying, #2 is word moving to next position.
  frontFacingStepsQuantity: config.frontFacingWordsQuantity * 2 - 1,
  totalStepsQuantity: config.words.length * 2,
  backFacingWordsQuantity: config.words.length - config.frontFacingWordsQuantity,
} as const;

const returnedForCss = {
  totalAnimationDuration: config.stepDuration * directCalculationsFromConfig.totalStepsQuantity,
} as const;

function getRemainingCoefficientForAllFrontFacingSteps() {
  const backFacingStepsQuantity = directCalculationsFromConfig.backFacingWordsQuantity * 2 + 1;

  const backFacingCoefficientFromTotal =
    backFacingStepsQuantity / directCalculationsFromConfig.totalStepsQuantity;

  const remainingCoefficientForAllFrontFacingSteps = 1 - backFacingCoefficientFromTotal; // 1 here is just 100%

  return { remainingCoefficientForAllFrontFacingSteps } as const;
}

const { remainingCoefficientForAllFrontFacingSteps } =
  getRemainingCoefficientForAllFrontFacingSteps();

const oneStepPercentage =
  (remainingCoefficientForAllFrontFacingSteps /
    directCalculationsFromConfig.frontFacingStepsQuantity) *
  100;

// const start = -3;
// const end = 4;
/** This are just valid */
const keyframePoints = {
  1: `${0}%, ${oneStepPercentage * 1}%`, // We cannot modify 0%, because it's the starting point, the center.
  2: `${oneStepPercentage * 2}%, ${oneStepPercentage * 3}%`,
  3: `${oneStepPercentage * 4}%`, // We cannot modify this, because it's the point at which the word disappears

  4: `${100 - oneStepPercentage * 3}%`, // We cannot modify this, because it's where the word STARTS appearing
  5: `${100 - oneStepPercentage * 2}%, ${100 - oneStepPercentage * 1}%`,
};

// const keyframePoints = {
//   1: `${0}%, ${oneStepPercentage * 1}%`, // We cannot modify 0%, because it's the starting point, the center.
//   2: `${oneStepPercentage * 2}%, ${oneStepPercentage * 3}%`,
//   3: `${oneStepPercentage * 4}%`, // We cannot modify this, because it's the point at which the word disappears

//   4: `${oneStepPercentage * 7}%`, // We cannot modify this, because it's where the word STARTS appearing
//   5: `${oneStepPercentage * 8}%, ${oneStepPercentage * 9}%`,
// };

// const moveCoefficient = 1;
// const keyframePoints = {
//   1: 'from', // 0
//   2: `${oneStepPercentage * moveCoefficient}%, ${oneStepPercentage * 2}%`, // it is subtracted from the beginning tim of teh hold step which makes move step shorter
//   3: `${oneStepPercentage * (2 + moveCoefficient)}%, ${oneStepPercentage * 4}%`, //2
//   4: `${oneStepPercentage * (4 + moveCoefficient)}%, ${oneStepPercentage * 6}%`, //3
//   5: `${oneStepPercentage * (6 + moveCoefficient)}%, to`, // 4,5
// } as const;

console.log('arts keyframePoints', keyframePoints);

// const howMuchWordsDoesStartSkip = 2;

export const TriedRotatingWordsContainer = styled.div`
  position: relative;
  display: inline;

  > span {
    &:not(:first-child) {
      position: absolute;
      left: 0;
    }

    display: inline-block;
    animation: rotate-word-try ${returnedForCss.totalAnimationDuration}s infinite;
    transform-origin: left;

    @keyframes rotate-word-try {
      ${keyframePoints['4']} {
        opacity: 0;
        transform: translateY(-140%) scale(0);
        transform-origin: left;
      }
      ${keyframePoints['5']} {
        opacity: 0.3;
        transform: translateY(-70%) scale(0.5);
        transform-origin: left;
      }
      ${keyframePoints['1']} {
        opacity: 1;
        transform: none;
        transform-origin: left;
      }
      ${keyframePoints['2']} {
        opacity: 0.3;
        transform: translateY(70%) scale(0.5);
        transform-origin: left;
      }
      ${keyframePoints['3']} {
        opacity: 0;
        transform: translateY(140%) scale(0);
        transform-origin: left;
      }
    }

    /* @keyframes rotate-word {
      ${keyframePoints['1']} {
        opacity: 0;
        transform: translateY(-140%) scale(0);
        transform-origin: left;
      }
      ${keyframePoints['2']} {
        opacity: 0.3;
        transform: translateY(-70%) scale(0.5);
        transform-origin: left;
      }
      ${keyframePoints['3']} {
        opacity: 1;
        transform: none;
      }
      ${keyframePoints['4']} {
        opacity: 0.3;
        transform: translateY(70%) scale(0.5);
        transform-origin: left;
      }
      ${keyframePoints['5']} {
        opacity: 0;
        transform: translateY(140%) scale(0);
        transform-origin: left;
      }
    } */

    ${[...Array(config.words.length)]
      .map((_val, index) => {
        return `
          &:nth-child(${index + 1}) {
            animation-delay: ${-directCalculationsFromConfig.wordDelay * index}s;
          }
        `;
      })
      .join('\n')}
  }
`;
