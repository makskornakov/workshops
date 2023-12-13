// All time (intervals) are in seconds.

import { styled } from '@linaria/react';

const howMuchWordsToUse = 6;
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
  stepDuration: 0.85,
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
console.log('returnedForCss', returnedForCss);

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
// const keyframePoints = {
//   1: `${0}%, ${oneStepPercentage * 1}%`, // We cannot modify 0%, because it's the starting point, the center.
//   2: `${oneStepPercentage * 2}%, ${oneStepPercentage * 3}%`,
//   3: `${oneStepPercentage * 4}%`, // We cannot modify this, because it's the point at which the word disappears

//   4: `${100 - oneStepPercentage * 3}%`, // We cannot modify this, because it's where the word STARTS appearing
//   5: `${100 - oneStepPercentage * 2}%, ${100 - oneStepPercentage * 1}%`,
// };

// ! -1 to 1, NEVER 1
//? it will put 0% for the 2nd step, etc.
/**
 * #### Can be a number from `-1` (including) to `1` (excluding).
 *
 * `0` is neutral. (50% rotate, 50% hold)
 *
 * `-1` is non-stop (if timing-function is linear, ofc). (100% rotate, no hold)
 *
 * With this logic, `1` would be a paused animation, but actually `1` just messes everything up, so don't set 1 or anything higher.
 *
 * @todo rename to `somethingBalance` (like balance between between left and right ear in headphones, 'cause it works almost the same way)
 */
const holdCoefficient = 0.15; // ? Hold time will be increase with this coefficient
const calculus = oneStepPercentage * holdCoefficient;

const additionToAnimationDelay =
  calculus > 0 ? (returnedForCss.totalAnimationDuration / 100) * calculus : 0;

function implementFirstCalculus() {
  if (calculus <= 0) {
    return 0 - calculus;
  } else {
    return 100 - calculus;
  }
}

const shiftEveryPoint = calculus < 0 ? calculus : 0;

const keyframePoints = {
  1: `${implementFirstCalculus() + shiftEveryPoint}%, ${oneStepPercentage * 1 + shiftEveryPoint}%`,
  2: `${oneStepPercentage * 2 - calculus + shiftEveryPoint}%, ${
    oneStepPercentage * 3 + shiftEveryPoint
  }%`,
  3: `${oneStepPercentage * 4 - calculus + shiftEveryPoint}%`,

  4: `${100 - oneStepPercentage * 3 + shiftEveryPoint}%`,
  5: `${100 - oneStepPercentage * 2 - calculus + shiftEveryPoint}%, ${
    100 - oneStepPercentage * 1 + shiftEveryPoint
  }%`,
};

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
        /* transform-origin: left; */
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

    ${[...Array(config.words.length)]
      .map((_val, index) => {
        return `
          &:nth-child(${index + 1}) {
            animation-delay: ${
              -directCalculationsFromConfig.wordDelay * index + additionToAnimationDelay
            }s;
          }
        `;
      })
      .join('\n')}
  }
`;
