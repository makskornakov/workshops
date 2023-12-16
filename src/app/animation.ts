import {
  ShowcaseAnimationOptions,
  getIsDurationRatioable,
} from '~/packages/showcase-toolkit/types';

export function showcaseAnimation({ elementQuantity, ...rest }: ShowcaseAnimationOptions) {
  const { animationDurationSeconds, getAnimationDelay, keyframePoints } = showcaseAnimationCore({
    elementQuantity,
    ...rest,
  });
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

export function showcaseAnimationCore(options: ShowcaseAnimationOptions) {
  const { hold, move }: { hold: number; move: number } = processDurationOptions(options);

  const { keyframesQuantity, elementQuantity, startFromKeyframePoint } = options;

  /** because the core of our logic is that 1 keyframe is used for seamless transition from 100 back to 0 */
  const visibleKeyframesQuantity = keyframesQuantity - 1;
  const stepAmount = (visibleKeyframesQuantity + (elementQuantity - visibleKeyframesQuantity)) * 2;
  const animationDurationSeconds = elementQuantity * (move + hold);

  const mainStepIndex = startFromKeyframePoint ?? Math.floor(keyframesQuantity / 2) + 1;
  console.log('mainStepIndex', mainStepIndex);
  // is the coefficient applied to the movementDuration
  const movePercent = (1 - Math.min(hold, move) / Math.max(hold, move)) * Math.sign(hold - move);

  console.log('movePercent', movePercent);
  const oneStep = 100 / stepAmount;
  /** Calculus is movementDuration multiplied by its ratio to holdDuration */
  const calculus = oneStep * (movePercent === 1 ? 0.999999999 : movePercent); // ? restrict 1 in future or IDK

  console.log('calculus', calculus);

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

  const keyframePoints = createKeyframePoints(visibleKeyframesQuantity, oneStep, calculus);
  console.log('keyframePoints', keyframePoints);

  return {
    keyframePoints,
    animationDurationSeconds,
    getAnimationDelay,
  };
}

function processDurationOptions(options: ShowcaseAnimationOptions): { hold: number; move: number } {
  // TODO? set options.moveHoldRatio to 0.5 by default
  if (getIsDurationRatioable(options)) {
    const move = options.duration * (options.moveHoldRatio ?? 0.5);
    const hold = options.duration - move;

    return { hold, move };
  }

  if (typeof options.duration === 'number') {
    const halfDuration = options.duration / 2;
    return {
      hold: halfDuration,
      move: halfDuration,
    };
  } else {
    return options.duration;
  }
}

function createKeyframePoints(visibleKeyframesQuantity: number, oneStep: number, calculus: number) {
  const mainKeyframes = [...Array(visibleKeyframesQuantity - 1)].map((_val, index) => {
    const endHoldIndex = (index + 1) * 2;

    return `${oneStep * (endHoldIndex - 1) - calculus}%, ${oneStep * endHoldIndex}%`;
  });

  const lastKeyframePoint = `${oneStep * (visibleKeyframesQuantity * 2 - 1) - calculus}%, to`;
  const result = ['from', ...mainKeyframes, lastKeyframePoint];

  return result;
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

// Tools
export function splitKeyframe(keyframe: string) {
  return keyframe.split(', ') as [string, string];
}
