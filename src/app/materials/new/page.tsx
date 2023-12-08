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

  // return <MaterialEditor />;
}
