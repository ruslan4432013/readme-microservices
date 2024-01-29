import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

import { AUTH_USER_MESSAGES, PROPERTY } from '../account.constant';

export class LoginUserDTO {
  @ApiProperty(PROPERTY.EMAIL)
  @IsEmail({}, { message: AUTH_USER_MESSAGES.EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty(PROPERTY.PASSWORD)
  @IsString()
  @Length(PROPERTY.PASSWORD.minimum, PROPERTY.PASSWORD.maximum)
  public password: string;
}
