import { fakerRU as faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

type Tag = {
  id: string;
  title: string;
};

type Comment = {
  id: string;
  message: string;
  userId: string;
};

type Connect<T> = {
  connect: T[];
};

type Publication = {
  id: string;
  isReposted: boolean;
  status: string;
  currentOwnerId: string;
  originalOwnerId: string;
  sourceId: string;
  tags: Connect<Pick<Tag, 'id'>>;
  meta: string;
  comments: Comment[];
};

function generateFakeMeta() {
  return {
    biba: 'boba'
  };
}

const STATUSES = ['Опубликовано', 'Черновик'];

function generateFakePublication(tags: Tag[]): Publication {
  const userId = faker.string.uuid();
  const publicationId = faker.string.uuid();
  return {
    id: publicationId,
    isReposted: faker.datatype.boolean(),
    status: faker.helpers.arrayElement(STATUSES),
    currentOwnerId: userId,
    originalOwnerId: userId,
    sourceId: publicationId,
    tags: {
      connect: tags.map(({ id }) => ({ id })),
    },
    meta: JSON.stringify(generateFakeMeta()),
    comments: generateFakeComments(),
  };
}

function generateFakeTags() {
  const tagCount = faker.number.int({ min: 1, max: 8 });
  const tags: Tag[] = [];

  for (let i = 0; i < tagCount; i++) {
    tags.push({
      id: faker.string.uuid(),
      title: faker.word.noun(),
    });
  }

  return tags;
}

function generateFakeComments() {
  const commentCount = faker.number.int({ min: 0, max: 10 });
  const comments: Comment[] = [];

  for (let i = 0; i < commentCount; i++) {
    comments.push({
      id: faker.string.uuid(),
      message: faker.lorem.sentence(),
      userId: faker.string.uuid(),
    });
  }

  return comments;
}

async function seedDb(prismaClient: PrismaClient) {
  const mockTags = generateFakeTags();
  for (const tag of mockTags) {
    await prismaClient.tag.upsert({
      where: { id: tag.id },
      update: {},
      create: {
        id: tag.id,
        title: tag.title,
      },
    });
  }
  const publicationCount = faker.number.int({ min: 0, max: 10 });
  for (let i = 0; i < publicationCount; i++) {
    const publication = generateFakePublication(mockTags);
    await prismaClient.publication.create({
      data: {
        id: publication.id,
        isReposted: publication.isReposted,
        status: publication.status,
        currentOwnerId: publication.currentOwnerId,
        originalOwnerId: publication.originalOwnerId,
        sourceId: publication.sourceId,
        tags: publication.tags,
        meta: publication.meta,
        comments: publication.comments
          ? {
              create: publication.comments,
            }
          : undefined,
      },
    });
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
