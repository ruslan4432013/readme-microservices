import { Transform } from "class-transformer";
import { DEFAULT } from "../publication.constant";
import { SortVariants } from "@project/shared/app/types";
import { IsIn, IsNumber, IsOptional } from "class-validator";

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
}
