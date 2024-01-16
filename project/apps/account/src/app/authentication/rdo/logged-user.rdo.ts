import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PROPERTY } from '../authentication.constant';

export class LoggedUserRdo {
  @ApiProperty(PROPERTY.ID)
  @Expose()
  public id: string;

  @ApiProperty(PROPERTY.EMAIL)
  @Expose()
  public email: string;

  @Expose()
  public accessToken: string;

  @Expose()
  public refreshToken: string;
}
