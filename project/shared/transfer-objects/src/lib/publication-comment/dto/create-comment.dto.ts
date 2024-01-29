import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

import { PROPERTY } from '../publication-comment.constant';

export class CreateCommentDTO {
  @ApiProperty(PROPERTY.MESSAGE)
  @IsString()
  @IsNotEmpty()
  @Length(PROPERTY.MESSAGE.minimum, PROPERTY.MESSAGE.maximum)
  public message: string;

  public userId: string;
}
