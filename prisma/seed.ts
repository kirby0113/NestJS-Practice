import { PrismaClient, User, Tag, Diary } from '@prisma/client';
import { CreateDiaryInput } from 'src/auth/dto/create-diary.input';
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

const diary_data: Diary[] = [
  {
    id: 1,
    title: '今日の振り返り',
    detail: '今日はprismaの勉強',
    user_id: 1,
    created_at: new Date(),
  },
  {
    id: 2,
    title: 'お仕事めんどくさい',
    detail: '残業なんてさせんじゃないよーーー',
    user_id: 2,
    created_at: new Date(),
  },
  {
    id: 3,
    title: '曲作った',
    detail: 'トランス系統の曲作ったよ',
    user_id: 3,
    created_at: new Date(),
  },
];

// const diary_tag_relation_data: DiaryTagRelation[] = [
//   { diary_id: 1, tag_id: 1 },
//   { diary_id: 2, tag_id: 2 },
//   { diary_id: 3, tag_id: 3 },
// ];

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

const seedingDiary = async () => {
  const diaries = [];
  for (const diary of diary_data) {
    const create_diaries = prisma.diary.create({
      data: {
        ...diary,
        tags: {
          connect: [{ id: 1 }],
        },
      },
    });
    diaries.push(create_diaries);
  }
  return await prisma.$transaction(diaries);
};

// const seedingRelationTagAndDiary = async () => {
//   const relations = [];
//   for (const relation of diary_tag_relation_data) {
//     const create_relations = prisma.diaryTagRelation.create({
//       data: relation,
//     });
//     relations.push(create_relations);
//   }
//   return await prisma.$transaction(relations);
// };

const main = async () => {
  console.log(`Start seeding ...`);

  console.log('Seeding User...');
  await seedingUser();
  console.log('Seeding User finished.');

  console.log('Seeding Tag...');
  await seedingTag();
  console.log('Seeding Tag finished.');

  console.log('Seeding Diary...');
  await seedingDiary();
  console.log('Seeding Diary finished.');

  // console.log('Seeding RelationDiaryAndTag...');
  // await seedingRelationTagAndDiary();
  // console.log('Seeding RelationDiaryAndTag finished.');

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
