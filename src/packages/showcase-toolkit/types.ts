type ShowcaseAnimationDurationWithValues = {
  duration: number | { hold: number; move: number };
};
type ShowcaseAnimationDurationWithRatio = {
  duration: number;
  /**
   * From 0 to 1
   * @default 0.5
   */
  moveHoldRatio?: number;
};
type ShowcaseAnimationPossibleDurationOptions =
  | ShowcaseAnimationDurationWithValues
  | ShowcaseAnimationDurationWithRatio;

export function getIsDurationRatioable(
  options: ShowcaseAnimationOptions,
): options is ShowcaseAnimationBasicOptions & ShowcaseAnimationDurationWithRatio {
  return typeof options.duration === 'number';
}

export type ShowcaseAnimationOptions = ShowcaseAnimationPossibleDurationOptions &
  ShowcaseAnimationBasicOptions;

type ShowcaseAnimationBasicOptions = {
  keyframesQuantity: number;
  elementQuantity: number;
  /** @default 0 */
  startFromKeyframePoint?: number;
};

export type ShowcaseAnimationFunction = (params: ShowcaseAnimationOptions) => {
  keyframePoints: string[];
  baseStyles: string;
};
