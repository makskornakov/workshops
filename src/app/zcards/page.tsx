import Heading from '~/components/layout/heading/Heading';
import { RotatingWordsContainer, words } from './page.styled';

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
