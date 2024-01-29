import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

import { DEFAULT } from '../publication-comment.constant';

export class PublicationCommentQuery {
  
  @Transform(({ value }) => +value || DEFAULT.PAGE)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT.COMMENT_LIMIT;

  @Transform(({ value }) => +value || DEFAULT.PAGE)
  @IsOptional()
  public page: number = DEFAULT.PAGE;

}
