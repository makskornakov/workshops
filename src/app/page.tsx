import { Mansalva } from 'next/font/google';
import { HomeHeadingContainer, HomeMainContainer, RotatingWordsContainer } from './home.styled';
import { homeWords as words } from './home.styled';

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
      </HomeMainContainer>
    </>
  );
}
