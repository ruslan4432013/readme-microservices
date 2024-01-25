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

  @ApiProperty(PROPERTY.ACCESS_TOKEN)
  @Expose()
  public accessToken: string;

  @ApiProperty(PROPERTY.REFRESH_TOKEN)
  @Expose()
  public refreshToken: string;
}
