import Heading from '~/components/layout/heading/Heading';

export default async function Home() {
  return (
    <>
      <Heading title="Home" noBackButton />
      <div>This is the main page</div>
    </>
  );
}
