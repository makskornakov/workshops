import { Mansalva } from 'next/font/google';
import { HomeHeadingContainer, HomeMainContainer, RotatingWordsContainer } from './home.styled';
import { homeWords as words } from './home.styled';
import { styled } from '@linaria/react';

const bungeeHairline = Mansalva({ subsets: ['latin'], weight: '400' });

export default async function Home() {
  return (
    <>
      <HomeMainContainer>
        <HomeHeadingContainer>
          <h1 className={bungeeHairline.className}>
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
          </h1>
        </HomeHeadingContainer>
        <HomeContentContainer>
          <AboutContainer>
            <div>
              <h2>What is it?</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi rerum consequuntur
                magnam qui labore blanditiis hic, debitis laboriosam repudiandae illum voluptatibus
                magni quo tempora obcaecati ea fuga dignissimos! Ea, labor.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi rerum consequuntur
                magnam qui labore blanditiis hic, debitis laboriosam repudiandae illum voluptatibus
                magni quo tempora obcaecati ea fuga dignissimos! Ea, labore.
              </p>
            </div>
            <div></div>
          </AboutContainer>
        </HomeContentContainer>
      </HomeMainContainer>
    </>
  );
}

const HomeContentContainer = styled.div`
  /* outline: 1px solid red; */

  display: flex;
  flex-direction: column;
  padding: 0 10%;
  gap: 2rem;

  /* & > p {
    width: 50rem;
  } */
`;

const AboutContainer = styled.div`
  /* outline: 1px solid blue; */

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  /* when wrap justifies content center */
  /* align-content: center; */
  column-gap: 2rem;

  /* first dov */
  & > div:first-child {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    /* outline: 1px solid green; */
    min-width: 780px;
    width: 49rem;

    & > h2 {
      font-size: 1.5rem;
      font-weight: 300;
    }

    & > p {
      font-size: 1rem;
      font-weight: 200;
      white-space: pre-wrap;
    }
  }

  /* second div */
  & > div:last-child {
    /* outline: 1px solid yellow; */
    max-width: 30rem;
    min-width: 20rem;
    height: 20rem;
    flex-grow: 1;
  }
`;
