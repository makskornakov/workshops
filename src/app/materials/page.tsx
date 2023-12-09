import { PageHeading } from '../profile/profile.styled';
import prisma from '../../../lib/prisma';
import Link from 'next/link';
import { StyledButton, StyledLink } from '~/components/NavBar.styled';
import { getUser } from '../utils/prismaUser';
import { redirect } from 'next/navigation';
import { Material } from '@prisma/client';

export default async function MaterialLibrary() {
  // get first 10 materials

  const materials = (await prisma.material.findMany({
    take: 10,
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  })) as (Material & { author: { name: string } })[];
  // console.log(materials);

  return (
    <>
      <PageHeading>
        Material Library
        {/* <StyledLink href="/materials/new">Create</StyledLink> */}
        <form
          style={{ display: 'flex', alignItems: 'center' }}
          action={async () => {
            'use server';
            // create an empty material in the db and redirect to the editor
            const user = await getUser();
            if (!user) {
              redirect('/api/auth/signin');
            }
            const material = await prisma.material.create({
              data: {
                title: 'Untitled',
                description: '',
                authorId: user.id,
              },
            });
            // console.log('created material', material);
            redirect(`/materials/${material.id}/edit`);
          }}
        >
          <StyledButton type="submit">Create</StyledButton>
        </form>
      </PageHeading>
      <div
        style={{
          display: 'grid',
          margin: '2rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem',
        }}
      >
        {materials.map((material) => (
          <MaterialCard key={material.id} material={material} />
        ))}
      </div>
    </>
  );
}

export const MaterialCard = ({
  material,
}: {
  material: Material & { author: { name: string } };
}) => {
  return (
    <Link
      href={`/materials/${material.id}`}
      style={{
        position: 'relative',
        border: '1px solid #a6a6a6',
        borderRadius: '.5rem',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'flex-start',
      }}
    >
      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 400,
        }}
      >
        {material.title}
      </h3>
      {material.description && <p>{material.description}</p>}
      <p style={{ color: '#a6a6a6' }}>
        {material.author.name} - {new Date(material.createdAt).toLocaleDateString()}
      </p>
    </Link>
  );
};
