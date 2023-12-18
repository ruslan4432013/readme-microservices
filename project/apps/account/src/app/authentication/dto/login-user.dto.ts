import { ApiProperty } from '@nestjs/swagger';
import { PROPERTY } from '../authentication.constant';

export class LoginUserDto {
  @ApiProperty(PROPERTY.EMAIL)
  public email: string;

  @ApiProperty(PROPERTY.PASSWORD)
  public password: string;
}
