type ShowcaseAnimationDurationOptions =
  | {
      duration: number | { hold: number; move: number };
    }
  | {
      duration: number;
      moveHoldBalance?: number;
    };

type ShowcaseAnimationOptions = ShowcaseAnimationDurationOptions & {
  elementQuantity: number;
  /** @default 0 */
  startFromKeyframePoint?: number;
};

export type ShowcaseAnimationFunction = (params: ShowcaseAnimationOptions) => {
  keyframePoints: string[];
  baseStyles: string;
};
