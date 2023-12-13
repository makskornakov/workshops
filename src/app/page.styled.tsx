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
];

const wordsQuantity = words.length;
const currentVisibleStates = 4; // 4 main one + 1 for the last one to hide

const holdDuration = 4; // seconds
const moveDuration = 1; // seconds

const stepAmount = (currentVisibleStates + (wordsQuantity - currentVisibleStates)) * 2;
const animationDurationSeconds = wordsQuantity * (moveDuration + holdDuration);

const movePercent =
  (1 - Math.min(holdDuration, moveDuration) / Math.max(holdDuration, moveDuration)) *
  Math.sign(holdDuration - moveDuration);

console.log('movePercent', movePercent);
const oneStep = 100 / stepAmount;
const calculus = oneStep * (movePercent === 1 ? 0.999999999 : movePercent); // ? restrict 1 in future or IDK

function createSteps(steps: number) {
  const result = {} as { [key: number]: string };
  result[1] = 'from';
  for (let i = 1; i < steps; i++) {
    result[i + 1] = `${oneStep * (i * 2 - 1) - calculus}%, ${oneStep * (i * 2)}%`;
  }
  result[steps + 1] = `${oneStep * (steps * 2 - 1) - calculus}%, to`;
  return result;
}

const steps = createSteps(currentVisibleStates);
console.log('MAX steps', steps);

function getAnimationDelay(index: number) {
  const addedBeggingDelay = animationDurationSeconds * ((oneStep * 3 - calculus) / 100);
  const delayBase = (2 * animationDurationSeconds) / stepAmount;

  return `${delayBase * -index - addedBeggingDelay}s`;
}
// const testAnimationDelay = getAnimationDelay(1);
// console.log('testAnimationDelay', testAnimationDelay);

export const RotatingWordsContainer = styled.div`
  position: relative;
  display: inline;

  > span {
    &:not(:first-child) {
      position: absolute;
      left: 0;
    }
    display: inline-block;
    animation: rotate-word ${animationDurationSeconds}s infinite linear;
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

    ${[...Array(wordsQuantity)]
      .map((_val, index) => {
        return `
            &:nth-child(${index + 1}) {
              animation-delay: ${getAnimationDelay(index)};
            }
          `;
      })
      .join('\n')}
  }
`;
