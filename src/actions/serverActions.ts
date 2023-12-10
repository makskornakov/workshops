'use server';

import { getUser } from '~/app/utils/prismaUser';
import prisma from '../../lib/prisma';
import { revalidatePath } from 'next/cache';

export async function saveAvatarUrl(url: string) {
  const user = await getUser();
  if (!user) throw new Error('No user found');

  await prisma.user.update({
    where: { id: user.id },
    data: { image: url },
  });
  console.log('Uploaded by user', user.email);

  revalidatePath('/profile', 'page');

  return { url };
}

export async function assignMaterialMediaUrl(materialId: string, url: string) {
  const user = await getUser();
  if (!user) throw new Error('No user found');

  const material = await prisma.material.findUnique({
    where: { id: materialId },
    // we only need the authorId from author
    select: { author: { select: { id: true } } },
  });
  if (user.id !== material?.author.id) throw new Error('You are not the author of this material');

  // assign the url to the material
  await prisma.material.update({
    where: { id: materialId },
    data: { mediaUrl: url },
  });

  revalidatePath(`/materials/${materialId}`, 'page');

  // return result;
}

// delete the material
export async function deleteMaterial(materialId: string) {
  const user = await getUser();
  if (!user) throw new Error('No user found');

  const material = await prisma.material.findUnique({
    where: { id: materialId },
    // we only need the authorId from author
    select: { author: { select: { id: true } } },
  });
  if (user.id !== material?.author.id) throw new Error('You are not the author of this material');

  // delete the material
  await prisma.material.delete({ where: { id: materialId } });

  revalidatePath(`/materials/${materialId}`, 'page');
}
