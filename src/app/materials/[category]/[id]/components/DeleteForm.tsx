'use client';
import { Material } from '@prisma/client';
import { StyledButton } from '~/components/layout/navbar/NavBar.styled';
import { useEdgeStore } from '~/lib/edgestore';

import { useRouter } from 'next/navigation';
import { deleteMaterial } from '~/actions/serverActions';

export default function DeleteForm({ material }: { material: Material }) {
  const { edgestore } = useEdgeStore();
  const router = useRouter();

  return (
    <form
      action={async () => {
        if (material.mediaUrl) {
          await edgestore.mediaFiles.delete({
            url: material.mediaUrl,
          });
        }

        await deleteMaterial(material.id);

        router.push('/materials');

        // revalidatePath('/materials', 'page');
      }}
    >
      <StyledButton type="submit" red>
        Delete
      </StyledButton>
    </form>
  );
}
