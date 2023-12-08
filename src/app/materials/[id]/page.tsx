import { PageHeading } from '~/app/profile/profile.styled';
import prisma from '../../../../lib/prisma';
import Link from 'next/link';
import { getUser } from '~/app/utils/prismaUser';
import { StyledButton, StyledLink } from '~/components/NavBar.styled';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import DeleteMaterialButton from './DeleteForm';
import DeleteForm from './DeleteForm';

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
  // console.log(material);
  if (!material) {
    return <h2>Material not found</h2>;
  }

  return (
    <>
      <PageHeading>{material.title}</PageHeading>
      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'flex-start',
        }}
      >
        <p>
          Author: <span style={{ color: '#a6a6a6' }}>{material.author.name}</span>
        </p>
        <p>
          Created:{' '}
          <span style={{ color: '#a6a6a6' }}>
            {new Date(material.createdAt).toLocaleDateString()}
          </span>
        </p>
        <p>{material.description}</p>

        {/* <Link
          style={{
            textDecoration: 'underline',
          }}
          href={material.mediaUrl}
        >
          Media url
        </Link> */}
        {material.mediaUrl && (
          <Image src={material.mediaUrl} alt={material.title} width={400} height={400} />
        )}
        <p>{material.paragraph}</p>

        {/* if user is the author display the edit button */}
        {material && user?.id === material.authorId && (
          <>
            <StyledLink href={`/materials/${material.id}/edit`}>Edit Material</StyledLink>

            <DeleteForm material={material} />
          </>
        )}
      </div>
    </>
  );
}
