'use server';

import { getUser } from '~/app/utils/prismaUser';
import prisma from '../../lib/prisma';
import { revalidatePath } from 'next/cache';
import { useEdgeStore } from '~/lib/edgestore';

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
