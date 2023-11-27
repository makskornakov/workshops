export default function ErrorPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div>
      <h1>There was an error</h1>
      <p>{searchParams.error}</p>
    </div>
  );
}
