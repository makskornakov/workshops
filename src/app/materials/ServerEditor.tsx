import { PageHeading } from '~/app/profile/profile.styled';
import prisma from '../../../lib/prisma';
import type { Material } from '@prisma/client';
import { getUser } from '~/app/utils/prismaUser';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import ClientMaterialForm from './ClientEditor';

// type User = NonNullable<Awaited<ReturnType<typeof getUser>>>;

export default async function MaterialEditor({ id }: { id: string }) {
  const user = await getUser();
  if (!user) {
    redirect('/api/auth/signin');
  }

  const material = await prisma.material.findUnique({
    where: {
      id: id,
    },
    include: { author: { select: { name: true } } },
  });
  if (!material) {
    redirect('/materials');
  }

  return (
    <>
      <PageHeading style={{ gap: '.5rem' }}>
        Editing Material:{' '}
        <span
          style={{
            color: '#a6a6a6',
          }}
        >
          {material.title}
        </span>
      </PageHeading>
      <div>
        <ClientMaterialForm
          material={material as Material & { author: { name: string } }}
          action={async (formData) => {
            'use server';
            return materialAction(formData, user.id, material.id);
          }}
        />
      </div>
    </>
  );
}

export async function materialAction(formData: FormData, userId: string, materialId: string) {
  const data = formData;
  const title = data.get('title');
  if (title?.toString().trim() === '') return;

  const description = data.get('description');

  const content = data.get('content');
  const materialObj = {
    title: title,
    description: description,
    paragraph: content,
    authorId: userId,
  };

  const result = await prisma.material.update({
    where: {
      id: materialId,
    },
    data: materialObj as Material,
  });

  redirect(`/materials/${result.id}`);
}
