import { PageHeading } from '~/app/profile/profile.styled';
import prisma from '../../../../lib/prisma';
import Link from 'next/link';
import { getUser } from '~/app/utils/prismaUser';

export default async function MaterialPage({ params }: { params: { id: string } }) {
  const user = await getUser();
  const materialId = params.id;
  const material = await prisma.material.findUnique({
    where: {
      id: materialId,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  if (!material) {
    return <h2>Material not found</h2>;
  }

  console.log(material);

  return (
    <>
      <PageHeading>{material.title}</PageHeading>
      <p>Author: {material.author.name}</p>
      <p>Created: {material.createdAt.toString()}</p>
      <p>{material.description}</p>
      <Link href={material.mediaUrl}>Media</Link>
      <p>{material.paragraph}</p>

      {/* if user is the author display the edit button */}
      {user?.id === material.authorId && (
        <Link href={`/materials/${material.id}/edit`}>Edit Material</Link>
      )}
    </>
  );
}
