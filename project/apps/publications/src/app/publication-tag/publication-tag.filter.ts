import { Prisma } from '@prisma/client';

export interface CategoryFilter {
  id?: string;
  title?: string | {
    in: string[]
  };

}

export function tagFilterToPrismaFilter(
  filter: CategoryFilter
): Prisma.TagWhereInput | undefined {
  if (!filter) {
    return undefined;
  }

  const prismaFilter: Prisma.TagWhereInput = {};

  if (filter.title) {
    prismaFilter.title = filter.title;
  }
  if (filter.id) {
    prismaFilter.id = filter.id;
  }

  return prismaFilter;
}
