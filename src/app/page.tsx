import Heading from '~/components/layout/heading/Heading';
import rotatingAnimation from './animation';
import { TriedRotatingWordsContainer, triedWords } from './tryRotate';
import { styled } from '@linaria/react';

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
const totalDuration = 0.85 * 2;
const ratio = 0.45;

const moveDuration = totalDuration * ratio;
const stayDuration = totalDuration - moveDuration;
// *

const myAnimation = rotatingAnimation(5, words.length, moveDuration, stayDuration, 3);
const mySteps = myAnimation.steps;
const myStyles = myAnimation.styles;

const myAnimation2 = rotatingAnimation(4, words.length, 1, 4);
const mySteps2 = myAnimation2.steps;
const myStyles2 = myAnimation2.styles;

const RotatingWordsContainer = styled.div`
  position: relative;
  display: inline;

  > * {
    ${myStyles}

    /* animation-timing-function: linear; */
    animation-name: rotate-word;

    /* keyframes */
    @keyframes rotate-word {
      ${mySteps['1']} {
        opacity: 0;
        transform: translateY(-140%) scale(0);
        transform-origin: left;
      }
      ${mySteps['2']} {
        opacity: 0.3;
        transform: translateY(-70%) scale(0.5);
        transform-origin: left;
      }
      ${mySteps['3']} {
        opacity: 1;
        transform: none;
      }
      ${mySteps['4']} {
        opacity: 0.3;
        transform: translateY(70%) scale(0.5);
        transform-origin: left;
      }
      ${mySteps['5']} {
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
    ${myStyles2}

    animation-timing-function: linear;
    animation-name: rotate-word2;

    /* keyframes */
    @keyframes rotate-word2 {
      ${mySteps2['1']} {
        opacity: 0;
        transform: translateY(-140%) scale(0);
        transform-origin: left;
      }
      ${mySteps2['2']} {
        opacity: 0.3;
        transform: translateY(-70%) scale(0.5);
        transform-origin: left;
      }
      ${mySteps2['3']} {
        opacity: 1;
        transform: none;
      }
      /* ${mySteps2['4']} {
        opacity: 0.3;
        transform: translateY(70%) scale(0.5);
        transform-origin: left;
      } */
      ${mySteps2['4']} {
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
          {/* <br />
          <br />
          <br />
          <br />
          <h1>
            Create
            <SecondRotatingWordsContainer>
              {words.map((word) => (
                <span key={word}>{word}</span>
              ))}
            </SecondRotatingWordsContainer>{' '}
            in minutes
          </h1> */}

          <h1 style={{ marginTop: 100 }}>
            Create{' '}
            <TriedRotatingWordsContainer>
              {triedWords.map((word) => (
                <span key={word}>{word}</span>
              ))}
            </TriedRotatingWordsContainer>{' '}
            in minutes
          </h1>
        </div>
      </main>
    </>
  );
}
