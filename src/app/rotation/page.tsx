import Heading from '~/components/layout/heading/Heading';
import { showcaseAnimation } from '../animation';
import { TriedRotatingWordsContainer, triedWords } from '../tryRotate';
import { styled } from '@linaria/react';
import { ScaleYRotation } from '~/packages/showcase-toolkit/components/ScaleYRotation';

const words = [
  'Workshops',
  'Lessons',
  'Materials',
  'Lectures',
  'Courses',
  'Classes',
  'Activities',
  'Events',
];
// * match Arts animation

const {
  keyframePoints: myKeyframePoints,
  styles: { baseStyles: myBaseStyles },
} = showcaseAnimation({
  keyframesQuantity: 5,
  elementQuantity: words.length,
  duration: 1.7,
  moveHoldRatio: 0.45,
});

const {
  keyframePoints: myKeyframePoints2,
  styles: { baseStyles: myBaseStyles2 },
} = showcaseAnimation({
  keyframesQuantity: 4,
  elementQuantity: words.length,
  duration: 1.7,
  moveHoldRatio: 0.45,
});

const RotatingWordsContainer = styled.div`
  position: relative;
  display: inline;

  > * {
    ${myBaseStyles}

    /* animation-timing-function: linear; */
    animation-name: rotate-word;

    /* keyframes */
    @keyframes rotate-word {
      ${myKeyframePoints[0]} {
        opacity: 0;
        transform: translateY(-140%) scale(0);
        transform-origin: left;
      }
      ${myKeyframePoints[1]} {
        opacity: 0.3;
        transform: translateY(-70%) scale(0.5);
        transform-origin: left;
      }
      ${myKeyframePoints[2]} {
        opacity: 1;
        transform: none;
      }
      ${myKeyframePoints[3]} {
        opacity: 0.3;
        transform: translateY(70%) scale(0.5);
        transform-origin: left;
      }
      ${myKeyframePoints[4]} {
        opacity: 0;
        transform: translateY(140%) scale(0);
        transform-origin: left;
      }
    }
  }
`;

const SecondRotatingWordsContainer = styled.div`
  position: relative;
  display: inline;

  > * {
    ${myBaseStyles2}

    animation-timing-function: linear;
    animation-name: rotate-word2;

    /* keyframes */
    @keyframes rotate-word2 {
      ${myKeyframePoints2[0]} {
        opacity: 0;
        transform: translateY(-140%) scale(0);
        transform-origin: left;
      }
      ${myKeyframePoints2[1]} {
        opacity: 0.3;
        transform: translateY(-70%) scale(0.5);
        transform-origin: left;
      }
      ${myKeyframePoints2[2]} {
        opacity: 1;
        transform: none;
      }
      /* ${myKeyframePoints2[3]} {
        opacity: 0.3;
        transform: translateY(70%) scale(0.5);
        transform-origin: left;
      } */
      ${myKeyframePoints2[3]} {
        opacity: 0;
        transform: translateY(140%) scale(0);
        transform-origin: left;
      }
    }
  }
`;

export default async function Home() {
  return (
    <>
      <Heading title="Home" noBackButton />
      <main
        style={{
          width: '100%',
          minHeight: '50vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div>
          <h1>
            Create {/* add animaitionStyles */}
            <RotatingWordsContainer>
              {words.map((word) => (
                <span key={word}>{word}</span>
              ))}
            </RotatingWordsContainer>{' '}
            in minutes
          </h1>
          <br />
          <br />
          <br />
          <br />
          <h1>
            Create{' '}
            <SecondRotatingWordsContainer>
              {words.map((word) => (
                <span key={word}>{word}</span>
              ))}
            </SecondRotatingWordsContainer>{' '}
            in minutes
          </h1>

          <h1 style={{ marginTop: 100 }}>
            Create{' '}
            <TriedRotatingWordsContainer>
              {triedWords.map((word) => (
                <span key={word}>{word}</span>
              ))}
            </TriedRotatingWordsContainer>{' '}
            in minutes
          </h1>

          <h2 style={{ marginTop: 100 }}>
            digital products <ScaleYRotation /> for you
          </h2>
        </div>
      </main>
    </>
  );
}
