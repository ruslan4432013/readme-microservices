import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

import { PublicationType, SortVariants } from '@project/shared/app/types';

import { DEFAULT } from '../publication.constant';

export class PublicationQuery {
  @Transform(({ value }) => +value || DEFAULT.PUBLICATION_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT.PUBLICATION_COUNT_LIMIT;

  @IsIn(Object.values(SortVariants))
  @IsOptional()
  public sort: SortVariants = DEFAULT.SORT_VARIANT;

  @Transform(({ value }) => +value || DEFAULT.PAGE_COUNT)
  @IsOptional()
  public page: number = DEFAULT.PAGE_COUNT;

  @IsOptional()
  @IsString()
  public userId: string;

  @IsOptional()
  @IsEnum(PublicationType)
  public type: PublicationType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public tags?: string[];
}
