import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

import { PROPERTY } from '../../account.constant';

export class CreateSubscriberDTO {
  @ApiProperty(PROPERTY.EMAIL)
  @IsEmail()
  public email: string;

  @ApiProperty(PROPERTY.FULLNAME)
  @IsString()
  public fullname: string;
}
