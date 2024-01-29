import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { PROPERTY } from '../../account.constant';


export class LoggedUserRDO {
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
