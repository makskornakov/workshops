import prisma from '../lib/prisma';

async function main() {
  const category1 = await prisma.category.upsert({
    where: { name: 'Uncategorized' },
    update: {},
    create: {
      name: 'Uncategorized',
      slug: 'uncategorized',
      description: 'Default category',
    },
  });
  const category2 = await prisma.category.upsert({
    where: { name: 'Business and Management' },
    update: {},
    create: {
      name: 'Business and Management',
      slug: 'business-and-management',
      description: 'Material for business and management',
    },
  });
  const category3 = await prisma.category.upsert({
    where: { name: 'Education and Career' },
    update: {},
    create: {
      name: 'Education and Career',
      slug: 'education-and-career',
      description: 'Material for education and career',
    },
  });

  console.log({ category1, category2, category3 });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
