import { PageHeading } from '~/app/profile/profile.styled';
import prisma from '../../../lib/prisma';
import type { Material } from '@prisma/client';
import { getUser } from '~/app/utils/prismaUser';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import ClientMaterialForm from './ClientEditor';

type User = NonNullable<Awaited<ReturnType<typeof getUser>>>;

export default async function MaterialEditor({ id }: { id: string }) {
  const user = await getUser();
  if (!user) {
    redirect('/api/auth/signin');
  }

  const material = await prisma.material.findUnique({
    where: {
      id: id,
    },
  });
  if (!material) {
    redirect('/materials');
  }

  return (
    <>
      <PageHeading>{material ? `Edit Material: ${material.title}` : 'Create Material'}</PageHeading>
      <div>
        <p>Author: {user.name}</p>

        <ClientMaterialForm
          material={material}
          action={async (formData) => {
            'use server';
            return materialAction(formData, user.id, material.id);
          }}
          // deleteAction={async () => {
          //   'use server';
          //   if (!material) return;
          //   if (user.id === material?.authorId) {
          //     const res = await prisma.material.delete({
          //       where: {
          //         id: material?.id,
          //       },
          //     });
          //     console.log('deleted material', res);
          //     redirect('/materials');
          //   }
          // }}
          // uploadAction={async (formData) => {
          //   'use server';
          //   const uploadedImage = formData.get('mediaUrl') as File;
          //   if (!uploadedImage) return;

          //   const res = await edgestore.avatarFiles.upload({
          //     file: uploadedImage,
          //     onProgressChange: (progress) => {
          //       console.log(progress);
          //     },
          //     // options: {
          //     //   replaceTargetUrl: currentImage,
          //     // },
          //   });
          // }}
        />
      </div>
    </>
  );
}

export async function materialAction(formData: FormData, userId: string, materialId: string) {
  // 'use server';
  const data = formData;
  const title = data.get('title');
  if (title?.toString().trim() === '') return;

  const description = data.get('description');
  const mediaUrl = data.get('mediaUrl');
  const content = data.get('content');
  const materialObj = {
    title: title,
    description: description,
    mediaUrl: mediaUrl,
    paragraph: content,
    authorId: userId,
  };

  const result = await prisma.material.update({
    where: {
      id: materialId,
    },
    data: materialObj as Material,
  });

  // console.log(result);

  redirect(`/materials/${result.id}`);
}
