'use client';
import { Material } from '@prisma/client';
import { getUser } from '~/app/utils/prismaUser';
import { StyledButton } from '~/components/NavBar.styled';
import { useEdgeStore } from '~/lib/edgestore';
import prisma from '../../../../lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { deleteMaterial } from '~/actions/saveAvatarUrl';

export default function DeleteForm({ material }: { material: Material }) {
  const { edgestore } = useEdgeStore();
  return (
    <form
      action={async () => {
        // 'use server';
        // const user = await getUser();
        // if (!user || user.id !== material.authorId) return;
        if (!material.mediaUrl) {
          await deleteMaterial(material.id);
          return;
        }
        await edgestore.mediaFiles.delete({
          url: material.mediaUrl,
          // input: {
          //   materialId: material.id,
          // },
        });

        console.log('deleted media file', material.mediaUrl);
        await deleteMaterial(material.id);
        revalidatePath('/materials');
        redirect('/materials');
      }}
    >
      <StyledButton type="submit" onClick={async () => {}}>
        Delete
      </StyledButton>
    </form>
  );
}
