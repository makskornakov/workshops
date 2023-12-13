import { styled } from '@linaria/react';

//#region FROM RIGHTSHIFT.DEV
const oneRotatingWordAnimationDuration = 5 / 3;
/** @todo de-hardcode */
const rotatingWordsQuantity = 3;
const rotatingWordsAnimationDuration = oneRotatingWordAnimationDuration * rotatingWordsQuantity;
/** If this is 0, the animation will start from blank to appear. If positive — the appearance from blank will take longer. If negative — decreases the blank time to the point there's no blank at all. */
const rotatingWordsSharedAnimationDelay =
  (-rotatingWordsAnimationDuration / rotatingWordsQuantity) * 0.57;

const percentsNeededToHideAndWaitWhileOtherLettersRotate = 15 * rotatingWordsQuantity;
const keyframeOfHideStart = 100 - percentsNeededToHideAndWaitWhileOtherLettersRotate;
const keyframeOfHideStartString = `${keyframeOfHideStart}%`;
const keyframeOfAppearFinishString = `${keyframeOfHideStart / 2.2}%`;
const keyframeOfStayFinishString = `${keyframeOfHideStart * (7 / 11)}%`;

export const RotatingWordsInSubheadingContainer = styled.span`
  display: inline-grid;
  position: relative;

  > span {
    animation: topToBottom ${rotatingWordsAnimationDuration}s ease-in-out infinite
      ${rotatingWordsSharedAnimationDelay}s;
    transform: scaleY(0);

    &:not(:first-child) {
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  span:nth-child(2) {
    animation-delay: ${`${
      rotatingWordsAnimationDuration / rotatingWordsQuantity + rotatingWordsSharedAnimationDelay
    }s`};
  }
  span:nth-child(3) {
    animation-delay: ${`${
      (rotatingWordsAnimationDuration / rotatingWordsQuantity) * 2 +
      rotatingWordsSharedAnimationDelay
    }s`};
  }

  @keyframes topToBottom {
    from {
      transform: scaleY(0);
      transform-origin: bottom;
    }
    ${keyframeOfAppearFinishString} {
      transform: scaleY(1);
    }
    ${keyframeOfStayFinishString} {
      transform: scaleY(1);
      transform-origin: top;
    }
    ${keyframeOfHideStartString},
    to {
      transform: scaleY(0);
    }
  }
`;
//#endregion

const currentRealStates = 4; // 4 main one + 1 for the last one to hide

const animationDurationSeconds = 15;
const wordsQuantity = 5;

const stepAmount = (currentRealStates + (wordsQuantity - currentRealStates)) * 2;
// const stepAmount = 10;
const stepAmountTestString = `${stepAmount}`;
const oneStep = 100 / stepAmount;

const oneWaitStep = oneStep * 0.4;
const oneMoveStep = oneStep * 0.6;
const totalStep = oneMoveStep + oneWaitStep;

const oneStepTestString = `${oneStep}`;
const totalWaitStepsTestString = `${totalStep}`;

// one step is 7.142857142857143 if there are 7 words and 5 steps (4 main ones + 1 for the last one to hide)

// const waitMoveRatio = 0.4;

//( oneStep + moveStepAmplifier) + (oneStep  + waitStepAmplifier) = oneStep * 2
// oneStep + moveStepAmplifier has to be in ratio (waitMoveRatio) with oneStep + waitStepAmplifier
// one of them has to be negative on the other positive

// ? By what value would you like the movement time (from hold to hold) to be multiplied?

// ! -1 to 1, NEVER 1
//? it will put 0% for the 2nd step, etc.
const holdCoefficient = 0; // ? Hold time will be increase with this coefficient
const calculus = oneStep * holdCoefficient;
const steps = {
  1: 'from', // 0
  2: `${oneStep - calculus}%, ${oneStep * 2}%`, // it is subtracted from the beginning tim of teh hold step which makes move step shorter
  3: `${oneStep * 3 - calculus}%, ${oneStep * 4}%`, //2
  4: `${oneStep * 5 - calculus}%, ${oneStep * 6}%`, //3
  5: `${oneStep * 7 - calculus}%, to`, // 4,5
} as const;
console.log('maximus steps', steps);

//! rescale the steps by ratio, but preserve the ration of 70-0 = 0-10 + (wordAmount - stepAmount)
// ? which means we need a function that will smartly rescale the steps, preserving their consistency in length and ratio
// ? we also have to make sure that the animation is centered and has changed equally on both sides (beginning and end)
//  which makes the possible solution complicated

function getAnimationDelay(index: number) {
  // with 4 words and duration 8, delayBase should be 2
  // with 5 words and duration 8, delayBase should be ?
  // 8 / 9

  // index 0, delay 0
  // index 1, delay 8 * 0,1111111111
  // index 2, delay 8 * 0,1111111111 * 3 //multiplier
  // index 3, delay 8 * 0,1111111111 * 5
  // index 4, delay 8 * 0,1111111111 * 7

  // const delayBase = animationDurationSeconds * (oneStep / 50);
  const addedBeggingDelay = animationDurationSeconds * ((oneStep * 3 - calculus) / 100);
  const string = `${oneStep - calculus}`;
  const delayBase = (2 * animationDurationSeconds) / stepAmount;
  // const delayBase = stepDuration * (index -1) * 2 + 1
  const delayBaseTestString = `${delayBase}`;
  // const delayBaseTestString2 = `${delayBas2e}`;

  return `${delayBase * -index - addedBeggingDelay}s`;
}
const testAnimationDelay = getAnimationDelay(1);
console.log('testAnimationDelay', testAnimationDelay);

// const interpolationType = moveCoefficient === -1 ? 'linear' : '';
export const RotatingWordsContainer = styled.div`
  position: relative;
  display: inline;

  > span {
    &:not(:first-child) {
      position: absolute;
      left: 0;
    }
    display: inline-block;
    animation: rotate-word ${animationDurationSeconds}s infinite;
    @keyframes rotate-word {
      ${steps['1']} {
        opacity: 0;
        transform: translateY(-140%) scale(0);
        transform-origin: left;
      }
      ${steps['2']} {
        opacity: 0.3;
        transform: translateY(-70%) scale(0.5);
        transform-origin: left;
      }
      ${steps['3']} {
        opacity: 1;
        transform: none;
      }
      ${steps['4']} {
        opacity: 0.3;
        transform: translateY(70%) scale(0.5);
        transform-origin: left;
      }
      ${steps['5']} {
        opacity: 0;
        transform: translateY(140%) scale(0);
        transform-origin: left;
      }
    }

    /* delay should be  */

    /* 12.5 */

    /* const delayConstant = 100 / stepAmount(x) * 2 / 100 * animationDurationSeconds; y

     */
    ${[...Array(wordsQuantity)]
      .map((_val, index) => {
        // because it is 2 steps
        // -2
        return `
            &:nth-child(${index + 1}) {
              animation-delay: ${getAnimationDelay(index)};
            }
          `;
      })
      .join('\n')}
  }
`;

export const HomeContainer = styled.main`
  width: 100%;
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
