import { getUser } from '~/app/utils/prismaUser';
import MaterialEditor from '../../ServerEditor';
import prisma from '../../../../../lib/prisma';
import { redirect } from 'next/navigation';

export default async function EditMaterial({ params }: { params: { id: string } }) {
  const user = await getUser();

  const materialId = params.id;
  const material = await prisma.material.findUnique({
    where: {
      id: materialId,
    },
    select: {
      authorId: true,
    },
  });
  if (!material) {
    return <h2>Material not found</h2>;
  }
  // if user is not the author redirect to the material page
  if (user?.id !== material.authorId) {
    redirect(`/materials/${materialId}`);
  }
  return <MaterialEditor id={materialId} />;
}
