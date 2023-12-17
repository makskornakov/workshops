import Heading from '~/components/layout/heading/Heading';
import { showcaseAnimation } from './animation';
import { styled } from '@linaria/react';
import { Mansalva } from 'next/font/google';

const bungeeHairline = Mansalva({ subsets: ['latin'], weight: '400' });

const words = [
  'Workshops',
  'Lessons',
  'Materials',
  'Lectures',
  // 'Courses',
  // 'Classes',
  'Activities',
  // 'Events',
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

const MyHeading = styled.h1`
  /* outline: 1px solid red; */

  font-size: 3.5rem;
  display: flex;
  flex-direction: row;
  column-gap: 1.5rem;
  /* flex-wrap: nowrap; */
  font-weight: 300;
`;

const RotatingWordsContainer = styled.div`
  position: relative;
  display: flex;

  > span {
    /* outline: 1px solid red; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  > * {
    ${myBaseStyles}

    animation-name: rotate-word;

    /* keyframes */
    @keyframes rotate-word {
      ${myKeyframePoints[0]} {
        opacity: 0;
        transform: translateY(-100%) scale(0);
        transform-origin: left;
      }
      ${myKeyframePoints[1]} {
        opacity: 0.3;
        transform: translateY(-75%) scale(0.5);
        transform-origin: left;
      }
      ${myKeyframePoints[2]} {
        opacity: 1;
        transform: none;
      }
      ${myKeyframePoints[3]} {
        opacity: 0.3;
        transform: translateY(75%) scale(0.5);
        transform-origin: left;
      }
      ${myKeyframePoints[4]} {
        opacity: 0;
        transform: translateY(100%) scale(0);
        transform-origin: left;
      }
    }
  }
`;

export default async function Home() {
  return (
    <>
      {/* <Heading title="Home" noBackButton /> */}
      <main
        style={{
          width: '100%',
          minHeight: '20rem',
          borderBlock: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div>
          <MyHeading className={bungeeHairline.className}>
            <span>Create</span>
            <RotatingWordsContainer>
              {words.map((word) => (
                <span key={word}>
                  {/* span for each letter */}
                  {word.split('').map((letter) => (
                    <span key={letter}>{letter}</span>
                  ))}
                </span>
              ))}
            </RotatingWordsContainer>
            <span>In</span>
            <span>Minutes</span>
          </MyHeading>
        </div>
      </main>
    </>
  );
}
