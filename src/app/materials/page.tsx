import { PageHeading } from '../profile/profile.styled';
import prisma from '../../../lib/prisma';
import Link from 'next/link';
import { StyledButton, StyledLink } from '~/components/NavBar.styled';
import { getUser } from '../utils/prismaUser';
import { redirect } from 'next/navigation';

export default async function MaterialLibrary() {
  // get first 10 materials

  const materials = await prisma.material.findMany({
    take: 10,
  });
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
      <ul>
        {materials.map((material) => (
          <li key={material.id}>
            <Link href={`/materials/${material.id}`}>{material.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
