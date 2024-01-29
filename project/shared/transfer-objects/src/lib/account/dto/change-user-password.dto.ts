import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

import { PROPERTY } from '../account.constant';

export class ChangeUserPasswordDTO {
  @ApiProperty(PROPERTY.NEW_PASSWORD)
  @IsString()
  @Length(PROPERTY.NEW_PASSWORD.minimum, PROPERTY.NEW_PASSWORD.maximum)
  public newPassword: string;

  @ApiProperty(PROPERTY.CURRENT_PASSWORD)
  @IsString()
  @Length(PROPERTY.CURRENT_PASSWORD.minimum, PROPERTY.CURRENT_PASSWORD.maximum)
  public currentPassword: string;
}
