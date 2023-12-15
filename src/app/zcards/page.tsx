import Heading from '~/components/layout/heading/Heading';
import { RotatingWordsContainer, words } from './page.styled';

export default async function Home() {
  const pathWidth = '2px';
  const pathColor = '#fff';

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
        <div style={{ opacity: 0.2 }}>
          <div
            style={{
              position: 'absolute',
              width: '80%',
              height: pathWidth,
              top: '10rem',
              left: 0,
              backgroundColor: pathColor,
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: pathWidth,
              height: '25%',
              top: '25%',
              right: '18rem',
              backgroundColor: pathColor,
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '60%',
              height: pathWidth,
              left: '20%',
              top: 'calc(50% - 0.5rem)',
              backgroundColor: pathColor,
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: pathWidth,
              height: '25%',
              top: '50%',
              left: '18rem',
              backgroundColor: pathColor,
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '80%',
              height: pathWidth,
              bottom: '25%',
              right: '0',
              backgroundColor: pathColor,
            }}
          />
        </div>
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
