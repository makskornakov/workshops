export function showcaseAnimation(
  keyframesQuantity: number, // total amount of states in the animation ex 5 for H and 11 for zcards
  elementQuantity: number,
  moveDuration: number,
  holdDuration: number,
  startFromKeyframePoint?: number,
) {
  const { animationDurationSeconds, getAnimationDelay, keyframePoints } = showcaseAnimationCore(
    keyframesQuantity,
    elementQuantity,
    moveDuration,
    holdDuration,
    startFromKeyframePoint,
  );
  const styles = showcaseAnimationPreparedStyles({
    animationDurationSeconds,
    elementQuantity,
    getAnimationDelay,
  });

  return {
    keyframePoints,
    styles,

    calculations: {
      animationDurationSeconds,
      getAnimationDelay,
    },
  };
}

export function showcaseAnimationCore(
  keyframesQuantity: number, // total amount of states in the animation ex 5 for H and 11 for zcards
  elementQuantity: number,
  moveDuration: number,
  holdDuration: number,
  startFromKeyframePoint?: number,
) {
  const currentVisibleStates = keyframesQuantity - 1;
  const stepAmount = (currentVisibleStates + (elementQuantity - currentVisibleStates)) * 2;
  const animationDurationSeconds = elementQuantity * (moveDuration + holdDuration);

  const mainStepIndex = startFromKeyframePoint ?? Math.floor(keyframesQuantity / 2) + 1;
  console.log('mainStepIndex', mainStepIndex);
  // is the coefficient applied to the movementDuration
  const movePercent =
    (1 - Math.min(holdDuration, moveDuration) / Math.max(holdDuration, moveDuration)) *
    Math.sign(holdDuration - moveDuration);

  console.log('movePercent', movePercent);
  const oneStep = 100 / stepAmount;
  /** Calculus is movementDuration multiplied by its ratio to holdDuration */
  const calculus = oneStep * (movePercent === 1 ? 0.999999999 : movePercent); // ? restrict 1 in future or IDK

  function createKeyframePoints(steps: number) {
    const result = {} as { [key: number]: string };
    result[1] = 'from';
    for (let i = 1; i < steps; i++) {
      result[i + 1] = `${oneStep * (i * 2 - 1) - calculus}%, ${oneStep * (i * 2)}%`;
    }
    result[steps + 1] = `${oneStep * (steps * 2 - 1) - calculus}%, to`;
    return result;
  }
  console.log('calculus', calculus);

  const keyframePoints = createKeyframePoints(currentVisibleStates);
  console.log('MAX steps', keyframePoints);

  function getAnimationDelay(index: number) {
    // maybe mainStepIndex has to be subtracted from total steps amount,because we are going backwards from 0 to 3 from example it will be -8 // if 11 speps
    // const defaultMainIndex = Math.floor(stepAmount / 2) + 1;
    // console.log('stepAmount', stepAmount);
    // console.log('defaultMainIndex', defaultMainIndex);
    const addedBeginningDelay =
      animationDurationSeconds * ((oneStep * 2 * (mainStepIndex - 2) + (oneStep - calculus)) / 100); //? now its correct and we start from the start of hold position
    const delayBase = (2 * animationDurationSeconds) / stepAmount;
    // console.log('delayBase', delayBase);
    // console.log('addedBeginningDelay', addedBeginningDelay);

    const correctedBeginningDelay = Math.max(0, addedBeginningDelay);

    return `${delayBase * -index - correctedBeginningDelay}s`;
  }

  return {
    keyframePoints,
    animationDurationSeconds,
    getAnimationDelay,
  };
}

export function showcaseAnimationPreparedStyles({
  animationDurationSeconds,
  elementQuantity,
  getAnimationDelay,
}: {
  animationDurationSeconds: number;
  elementQuantity: number;
  getAnimationDelay: (index: number) => string;
}) {
  const childStyles = `
    &:not(:first-child) {
      position: absolute;
      left: 0;
    }
    display: inline-block;
  `;

  const animationProperties = `
    animation-duration: ${animationDurationSeconds}s;
    animation-iteration-count: infinite;
  `;

  const childrenDelays = [...Array(elementQuantity)]
    .map((_val, index) => {
      return `
        &:nth-child(${index + 1}) {
          animation-delay: ${getAnimationDelay(index)};
        }
      `;
    })
    .join('\n');

  const baseStyles = `
    ${childStyles}
    ${animationProperties}
    ${childrenDelays}
  `;

  return {
    childStyles,
    animationProperties,
    childrenDelays,

    baseStyles,
  };
}
