import prisma from '../../../../lib/prisma';
import Link from 'next/link';
import { StyledButton } from '~/styles/shared';
import { getUser } from '../../../utils/prismaUser';
import { redirect } from 'next/navigation';
import { Material } from '@prisma/client';
import SelectComp from '../../../components/ui/SelectComp';
import { styled } from '@linaria/react';
import Heading from '~/components/layout/heading/Heading';
import { colorVar } from '~/utils/colors';

export default async function MaterialLibrary({ params }: { params: { category: string } }) {
  // console.log('selectedCategory', params.category);
  const theCategory =
    params.category === 'all'
      ? 'all'
      : await prisma.category.findUnique({
          where: {
            slug: params.category,
          },
        });

  if (!theCategory) {
    return <h2>Category not found</h2>;
  }

  const materials =
    theCategory === 'all'
      ? await prisma.material.findMany({
          take: 10,
          include: {
            author: {
              select: {
                name: true,
              },
            },
            category: {
              select: {
                slug: true,
                description: true,
              },
            },
          },
        })
      : await prisma.material.findMany({
          take: 10,
          where: {
            categorySlug: theCategory.slug,
          },
          include: {
            author: {
              select: {
                name: true,
              },
            },
            category: {
              select: {
                slug: true,
              },
            },
          },
        });

  const categories = await prisma.category.findMany({
    select: {
      name: true,
      slug: true,
    },
  });

  categories.sort((a, b) => {
    if (a.slug === 'uncategorized') {
      return -1;
    }
    if (b.slug === 'uncategorized') {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 1;
  });

  // console.log(categories);
  // console.log(params.category);

  //? because default is /all and we want to go back to /, so from materials library we now */}
  return (
    <>
      <Heading title="Material Library" noBackButton>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '.3rem',
            flexDirection: 'row',
          }}
        >
          <SelectComp
            categories={categories}
            selectedCategory={
              theCategory === 'all'
                ? {
                    name: 'All',
                    slug: 'all',
                  }
                : theCategory
            }
          />
          <form
            style={{ display: 'flex', alignItems: 'center' }}
            action={async () => {
              'use server';
              // create an empty material in the db and redirect to the editor
              const user = await getUser();
              if (!user) {
                redirect('/api/auth/signin');
              }
              const material = await prisma.material.create({
                data: {
                  title: 'Untitled',
                  authorId: user.id,
                  categorySlug: 'uncategorized',
                  // timeConsumption: ''
                  // complexity: 1,
                },
              });
              // console.log('created material', material);
              redirect(`/materials/${material.categorySlug}/${material.id}/edit`);
            }}
          >
            <StyledButton type="submit">Create new</StyledButton>
          </form>
        </div>
      </Heading>
      <div
        style={{
          display: 'flex',
          margin: '2rem auto',
          flexDirection: 'column',
          width: '80%',
          gap: '1rem',
        }}
      >
        <p
          style={{
            color: colorVar('secondary-color'),
            fontWeight: 300,
            fontSize: '.9rem',
          }}
        >
          {theCategory === 'all' ? 'All materials' : theCategory.description}
        </p>
        <div
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem',
          }}
        >
          {materials.map((material) => (
            <MaterialCard
              key={material.id}
              material={
                material as Material & { author: { name: string }; category: { slug: string } }
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}

const MaterialCard = ({
  material,
}: {
  material: Material & { author: { name: string }; category: { slug: string } };
}) => {
  return (
    <StyledMaterialCard href={`/materials/${material.category.slug}/${material.id}`}>
      <h3>{material.title}</h3>
      {material.description && (
        <p
          style={{
            color: '#ddd',
            fontSize: '.9rem',
            fontWeight: 300,
          }}
        >
          {material.description}
        </p>
      )}
      <p style={{ marginTop: 'auto' }}>
        {material.author.name} - {new Date(material.createdAt).toLocaleDateString()}
      </p>
    </StyledMaterialCard>
  );
};

const StyledMaterialCard = styled(Link)`
  position: relative;
  border: 1px solid;
  border-color: #333333;
  border-radius: 0.3rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  transition-duration: 0.2s;
  transition-property: border-color;

  h3 {
    color: #ddd;
    font-size: 1.2rem;
    font-weight: 300;
    transition-duration: 0.2s;
    transition-property: color;
  }
  p {
    font-size: 0.85rem;
    font-weight: 200;
    color: #a6a6a6;
  }

  &:hover {
    border-color: #a6a6a6;

    h3 {
      color: #fff;
    }
  }
`;
