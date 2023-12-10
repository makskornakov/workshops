import { Body, Container, Head, Heading, Html, Link, Text } from '@react-email/components';

export default function MagicLinkEmail({ url, host }: { url: string; host: string }) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container
          style={{
            ...container,
          }}
        >
          {/* line break symbol, then host */}
          <Heading style={{ ...h1, textAlign: 'center' }}>
            <h1>Login to Workshop platform</h1>
            <h2> {host}</h2>
          </Heading>

          <Link
            href={url}
            target="_blank"
            style={{
              ...link,
              textAlign: 'center',
              display: 'block',
              marginBottom: '16px',
            }}
          >
            Login with Email
          </Link>

          <Text
            style={{
              ...text,
              color: '#ababab',
              marginTop: '14px',
              textAlign: 'center',
              marginBottom: '16px',
            }}
          >
            If you didn&apos;t try to login, you can safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#ffffff',
};

const container = {
  margin: '0 auto',
};

const h1 = {
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
};

const link = {
  margin: 'auto',
  width: '200px',
  padding: '12px 24px',
  border: '1.5px solid #4af500',
  borderRadius: '5px',
  color: 'black',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '18px',
  textDecoration: 'underline',
};

const text = {
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
};

// const footer = {
//   color: '#898989',
//   fontFamily:
//     "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
//   fontSize: '12px',
//   lineHeight: '22px',
//   marginTop: '12px',
//   marginBottom: '24px',
// };

// const code = {
//   display: 'inline-block',
//   padding: '16px 4.5%',
//   width: '90.5%',
//   backgroundColor: '#f4f4f4',
//   borderRadius: '5px',
//   border: '1px solid #eee',
//   color: '#333',
// };
