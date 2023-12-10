import { PageHeading } from '../../profile/profile.styled';
import prisma from '../../../../lib/prisma';
import Link from 'next/link';
import { StyledButton } from '~/components/layout/navbar/NavBar.styled';
import { getUser } from '../../../utils/prismaUser';
import { redirect } from 'next/navigation';
import { Material } from '@prisma/client';
import SelectComp from '../../../components/ui/SelectComp';
import { styled } from '@linaria/react';

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

  // console.log(categories);
  // console.log(params.category);
  return (
    <>
      <PageHeading>
        Material Library
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
                },
              });
              // console.log('created material', material);
              redirect(`/materials/${material.categorySlug}/${material.id}/edit`);
            }}
          >
            <StyledButton type="submit">Create new</StyledButton>
          </form>
        </div>
        {/* <SelectComp
          categories={categories}
          categorySlug={theCategory === 'all' ? 'all' : theCategory.slug}
        /> */}
        {/* <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
          <Link href="/materials/all" style={theCategory === 'all' ? { color: 'red' } : {}}>
            All
          </Link>
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/materials/${category.slug}`}
              style={
                category.name === (theCategory === 'all' ? theCategory : theCategory.name)
                  ? { color: 'red' }
                  : {}
              }
            >
              {category.name}
            </Link>
            // </option>
          ))}
        </div> */}
      </PageHeading>
      <div
        style={{
          width: '80%',
          margin: '2rem auto',
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
