import Heading from '~/components/layout/heading/Heading';
import { HomeContainer, RotatingWordsContainer, words } from './page.styled';
import { TriedRotatingWordsContainer, triedWords } from './tryRotate';

export default async function Home() {
  // const words = ['Workshops', 'Lessons', 'Materials', 'Lectures', 'Courses', 'Classes', 'LOH'];
  // const words = ['Workshops'];
  return (
    <>
      <Heading title="Home" noBackButton />
      <HomeContainer>
        <div>
          <h1>
            Create{' '}
            <RotatingWordsContainer>
              {words.map((word) => (
                <span key={word}>{word}</span>
              ))}
            </RotatingWordsContainer>{' '}
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
        </div>
      </HomeContainer>
    </>
  );
}
