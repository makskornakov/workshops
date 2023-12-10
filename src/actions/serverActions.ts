'use server';

import { getUser } from '~/utils/prismaUser';
import prisma from '../../lib/prisma';
import { revalidatePath } from 'next/cache';
import { Material } from '@prisma/client';
import { redirect } from 'next/navigation';
import { maxMaterialFieldsLengths } from '~/configs/config';

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

export async function materialEditAction(formData: FormData, userId: string, materialId: string) {
  const data = formData;
  const title = data.get('title');
  if (title?.toString().trim() === '') return;

  const description = data.get('description');
  const category = data.get('category');

  // validate category
  const validCategory = await prisma.category.findUnique({
    where: {
      name: category?.toString(),
    },
  });
  if (!validCategory) {
    return;
  }

  const content = data.get('content');
  const materialObj = {
    title: title,
    description: description,
    paragraph: content,
    authorId: userId,
    categorySlug: validCategory.slug,
  };

  if (!materialObj.title || !materialObj.authorId || !materialObj.categorySlug)
    throw new Error('Missing fields');

  if (
    materialObj.title.toString().length > maxMaterialFieldsLengths.title ||
    (materialObj.description &&
      materialObj.description.toString().length > maxMaterialFieldsLengths.description) ||
    (materialObj.paragraph &&
      materialObj.paragraph.toString().length > maxMaterialFieldsLengths.content)
  ) {
    throw new Error('Field too long');
  }

  const result = await prisma.material.update({
    where: {
      id: materialId,
    },
    data: materialObj as Material,
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  redirect(`/materials/${result.categorySlug}/${result.id}`);
}
