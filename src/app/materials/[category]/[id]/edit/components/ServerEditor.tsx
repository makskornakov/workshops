import prisma from '../../../../../../../lib/prisma';
import { getUser } from '~/utils/prismaUser';
import { redirect } from 'next/navigation';
import { materialEditAction } from '~/actions/serverActions';

import type { Material } from '@prisma/client';

import ClientMaterialForm from './ClientEditor';
import { PageHeading } from '~/styles/shared';

export default async function MaterialEditor({ id }: { id: string }) {
  const user = await getUser();
  if (!user) {
    redirect('/api/auth/signin');
  }

  const material = await prisma.material.findUnique({
    where: {
      id: id,
    },
    include: { author: { select: { name: true } }, category: { select: { name: true } } },
  });
  if (!material) {
    redirect('/materials');
  }

  const categories = await prisma.category.findMany({
    select: {
      name: true,
      slug: true,
    },
  });

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
          material={material as Material & { author: { name: string }; category: { name: string } }}
          categories={categories}
          action={async (formData) => {
            'use server';
            return materialEditAction(formData, user.id, material.id);
          }}
        />
      </div>
    </>
  );
}
