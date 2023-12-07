import { PageHeading } from '../profile/profile.styled';
import prisma from '../../../lib/prisma';
import Link from 'next/link';

export default async function MaterialLibrary() {
  // get first 10 materials

  const materials = await prisma.material.findMany({
    take: 10,
  });
  console.log(materials);

  return (
    <>
      <PageHeading>Material Library</PageHeading>
      <Link href="/materials/new">Create Material</Link>
      <ul style={{ marginTop: '2rem' }}>
        {materials.map((material) => (
          <li key={material.id}>
            <Link href={`/materials/${material.id}`}>{material.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
