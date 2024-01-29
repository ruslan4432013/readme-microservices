import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

import { AUTH_USER_MESSAGES, PROPERTY } from '../account.constant';

export class CreateUserDTO {
  @ApiProperty(PROPERTY.EMAIL)
  @IsEmail({}, { message: AUTH_USER_MESSAGES.EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty(PROPERTY.FULLNAME)
  @IsString()
  @Length(PROPERTY.FULLNAME.minimum, PROPERTY.FULLNAME.maximum)
  public fullname: string;

  @ApiProperty(PROPERTY.AVATAR)
  @IsOptional()
  public avatar?: string;

  @ApiProperty(PROPERTY.PASSWORD)
  @IsString()
  @Length(PROPERTY.PASSWORD.minimum, PROPERTY.PASSWORD.maximum)
  public password: string;
}
