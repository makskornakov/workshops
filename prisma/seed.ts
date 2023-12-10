import prisma from '../lib/prisma';
interface Category {
  name: string;
  description: string;
}
const defaultCategories: Category[] = [
  {
    name: 'Uncategorized',
    description: 'Default category',
  },
  {
    name: 'Business and Entrepreneurship:',
    description:
      'Materials for business planning, marketing strategies, financial literacy, and entrepreneurial thinking',
  },
  {
    name: 'Networking and Communication',
    description:
      'Materials related to effective communication, public speaking, and conflict resolution',
  },
  {
    name: 'Career Development',
    description:
      'Materials for resume building, interview skills, networking strategies, and personal branding',
  },
  {
    name: 'Creativity and Innovation',
    description: 'Materials regarding design thinking, creative problem-solving, and innovation',
  },
  {
    name: 'Time Management',
    description:
      'Materials for goal setting, time management techniques, and prioritization skills',
  },
  {
    name: 'Environmental Sustainability',
    description:
      'Materials about eco-friendly practices, climate change, and environmental justice',
  },
  {
    name: 'Digital Skills',
    description:
      'Materials related to digital marketing, social media management, and basic coding skills',
  },
];

function nameToSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

async function main() {
  defaultCategories.forEach(async (category) => {
    const created = await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: {
        name: category.name,
        slug: nameToSlug(category.name),
        description: category.description,
      },
    });
    console.log({ created });
  });
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
