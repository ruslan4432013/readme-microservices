import { ApiProperty } from '@nestjs/swagger';
import { PROPERTY } from '../authentication.constant';

export class CreateUserDto {
  @ApiProperty(PROPERTY.EMAIL)
  public email: string;

  @ApiProperty(PROPERTY.FULLNAME)
  public fullname: string;

  @ApiProperty(PROPERTY.AVATAR)
  public avatar: string;

  @ApiProperty(PROPERTY.PASSWORD)
  public password: string;
}
