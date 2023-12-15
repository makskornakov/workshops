type ShowcaseAnimationDurationOptions =
  | {
      duration: number | { hold: number; move: number };
    }
  | {
      duration: number;
      /** From 0 to 1 */
      moveHoldRatio?: number;
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
