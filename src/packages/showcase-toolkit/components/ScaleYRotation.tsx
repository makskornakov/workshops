import { styled } from '@linaria/react';
import { showcaseAnimation, splitKeyframe } from '~/app/animation';

const words = ['tailored', 'crafted', 'tuned'];

const {
  keyframePoints,
  styles: { baseStyles },
} = showcaseAnimation({
  elementQuantity: words.length,
  keyframesQuantity: 3,
  duration: 5 / 3,
  moveHoldRatio: 0.666,
});

console.log('keyframePoints', keyframePoints);

// from; 25%; 35%; 55%, to

export const RotatingWordsInSubheadingContainer = styled.span`
  display: inline-grid;
  position: relative;
  font-weight: 300;

  > span {
    ${baseStyles}
    /* display: initial; */

    animation-name: topToBottom;
    animation-timing-function: ease-in-out;
    transform: scaleY(0);
  }

  @keyframes topToBottom {
    ${keyframePoints[0]} {
      transform: scaleY(0);
      transform-origin: bottom;
    }
    ${splitKeyframe(keyframePoints[1])[0]} {
      transform: scaleY(1);
    }
    ${splitKeyframe(keyframePoints[1])[1]} {
      transform: scaleY(1);
      transform-origin: top;
    }
    ${keyframePoints[2]} {
      transform: scaleY(0);
    }
  }
`;

export function ScaleYRotation() {
  return (
    <RotatingWordsInSubheadingContainer>
      {words.map((word) => (
        <span key={word}>{word}</span>
      ))}
    </RotatingWordsInSubheadingContainer>
  );
}
