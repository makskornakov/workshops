export default function rotatingAnimation(
  currentVisibleStates: number,
  wordsQuantity: number,
  moveDuration: number,
  holdDuration: number,
  mainStepIndex: number,
) {
  const stepAmount = (currentVisibleStates + (wordsQuantity - currentVisibleStates)) * 2;
  const animationDurationSeconds = wordsQuantity * (moveDuration + holdDuration);

  // is the coefficient applied to the movementDuration
  const movePercent =
    (1 - Math.min(holdDuration, moveDuration) / Math.max(holdDuration, moveDuration)) *
    Math.sign(holdDuration - moveDuration);

  console.log('movePercent', movePercent);
  const oneStep = 100 / stepAmount;
  /** Calculus is movementDuration multiplied by its ratio to holdDuration */
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
    // maybe mainStepIndex has to be subtracted from total steps amount,because we are going backwards from 0 to 3 from example it will be -8 // if 11 speps
    const addedBeginningDelay =
      animationDurationSeconds * ((oneStep * 2 * (mainStepIndex - 1) - calculus) / 100);
    const delayBase = (2 * animationDurationSeconds) / stepAmount;
    const correctedBeginningDelay = Math.max(0, addedBeginningDelay);

    return `${delayBase * -index - correctedBeginningDelay}s`;
  }

  const animatedChildStylesObject = `
    &:not(:first-child) {
      position: absolute;
      left: 0;
    }
    display: inline-block;
  `;

  const animationKeyframes = `
    animation-duration: ${animationDurationSeconds}s;
    animation-iteration-count: infinite;
  `;

  return {
    steps,
    styles: `
      ${animatedChildStylesObject}
      ${animationKeyframes}
      ${[...Array(wordsQuantity)]
        .map((_val, index) => {
          return `
                &:nth-child(${index + 1}) {
                  animation-delay: ${getAnimationDelay(index)};
                }
              `;
        })
        .join('\n')}
      `,
  };
}
