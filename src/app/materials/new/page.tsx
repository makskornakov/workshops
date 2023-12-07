import { PageHeading } from '~/app/profile/profile.styled';
import prisma from '../../../../lib/prisma';
import type { Material } from '@prisma/client';
import { getUser } from '~/app/utils/prismaUser';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import ClientMaterialForm from '../ClientEditor';
import MaterialEditor from '../ServerEditor';

export default async function CreateMaterial() {
  const user = await getUser();
  if (!user) {
    redirect('/api/auth/signin');
  }

  return (
    <>
      {/* <PageHeading>Create Material</PageHeading>
      <div>
        <p>Author: {user.name}</p>
        <form
          // make inputs not full width
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '20rem',
            margin: '0 auto',
          }}
          action={async (formData) => {
            'use server';
            const data = formData;
            const title = data.get('title');
            const description = data.get('description');
            const mediaUrl = data.get('mediaUrl');
            const content = data.get('content');

            const material = await prisma.material.create({
              data: {
                title: title as string,
                description: description as string,
                mediaUrl: mediaUrl as string,
                paragraph: content as string,
                authorId: user.id,
              },
            });
            console.log(material);
          }}
        >
          <ClientMaterialForm user={user} action={async (formData) => {}} />
        </form>
      </div> */}
      <MaterialEditor />
    </>
  );
}
