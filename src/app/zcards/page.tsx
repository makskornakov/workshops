import Heading from '~/components/layout/heading/Heading';
import rotatingAnimation from '../animation';
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
  'Nine',
  'Ten',
  'Eleven',
];

const myAnimation = rotatingAnimation(10, words.length, 1, 2, 6);
const mySteps = myAnimation.steps;
const myStyles = myAnimation.styles;

const RotatingWordsContainer = styled.div`
  width: 100%;
  height: 100%;

  /* background-color: #ff121245; */
  position: relative;
  overflow: hidden;
  /* display: flex; */
  /* any first level child */

  > * {
    ${myStyles}

    /* background-color: #12d4ff6f; */
    width: 100%;
    height: 100%;
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: center; */

    & > div {
      outline: 1px solid cyan;
      width: 10rem;
      height: 5rem;
      /* height: 0; */
      margin: auto;
      margin-top: calc(40vh - 2.5rem);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    animation-timing-function: linear;
    animation-name: rotate-word;
    /* transform: translateY(50%) !important; */
    /* keyframes */
    @keyframes rotate-word {
      ${mySteps['1']} {
        opacity: 0;
        transform: translate(-140%, -25%);
        /* transform-origin: left; */
      }
      ${mySteps['2']} {
        opacity: 0.3;
        transform: translate(-30%, -25%);
        /* transform-origin: left; */
      }
      ${mySteps['3']} {
        opacity: 1;
        transform: translate(0%, -25%);
      }
      ${mySteps['4']} {
        /* opacity: 0.3; */
        transform: translate(30%, -25%);
        /* transform-origin: left; */
      }
      ${mySteps['5']} {
        /* opacity: 0; */
        transform: translate(30%, 0%);
        /* transform-origin: left; */
      }

      /* ? Main */
      ${mySteps['6']} {
        /* opacity: 0; */
        transform: translate(0%, 0%);
        /* transform-origin: left; */
      }
      ${mySteps['7']} {
        /* opacity: 0; */
        transform: translate(-30%, 0%);
        /* transform-origin: left; */
      }
      ${mySteps['8']} {
        /* opacity: 0; */
        transform: translate(-30%, 25%);
        /* transform-origin: left; */
      }
      ${mySteps['9']} {
        /* opacity: 0; */
        transform: translate(0%, 25%);
        /* transform-origin: left; */
      }
      ${mySteps['10']} {
        /* opacity: 0; */
        transform: translate(30%, 25%);
        /* transform-origin: left; */
      }
      ${mySteps['11']} {
        /* opacity: 0; */
        transform: translate(140%, 25%);
        /* transform-origin: left; */
      }
    }
  }
`;
export default async function Home() {
  return (
    <>
      <Heading title="Home" noBackButton />

      <div
        style={{
          border: '1px solid red',
          marginBottom: '3rem',
          position: 'relative',
          width: '100vw',
          height: '80vh',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '80%',
            height: '1rem',
            top: '9rem',
            backgroundColor: '#ff121245',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '1rem',
            height: '25%',
            top: '25%',
            right: '18rem',
            backgroundColor: '#ff121245',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '60%',
            height: '1rem',
            left: '20%',
            top: 'calc(50% - 0.5rem)',
            backgroundColor: '#ff121245',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '1rem',
            height: '25%',
            top: '50%',
            left: '18rem',
            backgroundColor: '#ff121245',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '80%',
            height: '1rem',
            bottom: '9rem',
            right: '0',
            backgroundColor: '#ff121245',
          }}
        />
        <RotatingWordsContainer>
          {words.map((word) => (
            <div key={word}>
              <div>
                <span>{word}</span>
              </div>
            </div>
          ))}
        </RotatingWordsContainer>{' '}
      </div>
    </>
  );
}
