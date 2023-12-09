'use client';
import { Material } from '@prisma/client';
import { getUser } from '~/app/utils/prismaUser';
import { StyledButton } from '~/components/NavBar.styled';
import { useEdgeStore } from '~/lib/edgestore';
import prisma from '../../../../lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect, useRouter } from 'next/navigation';
import { deleteMaterial } from '~/actions/saveAvatarUrl';
// import Router from 'next/router';

export default function DeleteForm({ material }: { material: Material }) {
  const { edgestore } = useEdgeStore();
  const router = useRouter();

  // if ('kek') {
  //   redirect('/materials');
  // }

  return (
    <form
      action={async () => {
        if (material.mediaUrl) {
          await edgestore.mediaFiles.delete({
            url: material.mediaUrl,
          });
        }

        await deleteMaterial(material.id);

        // revalidatePath('/materials', 'page');

        router.push('/materials');
      }}
    >
      <StyledButton type="submit">Delete</StyledButton>
    </form>
  );
}
