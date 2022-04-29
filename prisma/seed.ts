import { PrismaClient, User, Tag } from '@prisma/client';
const prisma = new PrismaClient();

// モデル投入用のデータ定義
const user_data: User[] = [
  {
    id: 1,
    name: 'maru1',
    email: 'test1@test.com',
    password: 'test1',
  },
  {
    id: 2,
    name: 'maru2',
    email: 'test2@test.com',
    password: 'test2',
  },
  {
    id: 3,
    name: 'maru3',
    email: 'test3@test.com',
    password: 'test3',
  },
];

const tag_data: Tag[] = [
  { id: 1, name: '勉強', user_id: 1 },
  { id: 2, name: '仕事', user_id: 2 },
  { id: 3, name: '趣味', user_id: 3 },
];

const seedingUser = async () => {
  const users = [];
  for (const user of user_data) {
    const create_users = prisma.user.create({
      data: user,
    });
    users.push(create_users);
  }
  return await prisma.$transaction(users);
};

const seedingTag = async () => {
  const tags = [];
  for (const tag of tag_data) {
    const create_tags = prisma.tag.create({
      data: tag,
    });
    tags.push(create_tags);
  }
  return await prisma.$transaction(tags);
};

const main = async () => {
  console.log(`Start seeding ...`);

  console.log('Seeding User...');
  await seedingUser();
  console.log('Seeding User finished.');

  console.log('Seeding Tag...');
  await seedingTag();
  console.log('Seeding Tag finished.');

  console.log(`Seeding finished.`);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
