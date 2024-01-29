import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { PROPERTY } from '../account.constant';

export class UserRDO {
  @ApiProperty(PROPERTY.ID)
  @Expose()
  public id: string;

  @ApiProperty(PROPERTY.AVATAR)
  @Expose()
  public avatar: string;

  @ApiProperty(PROPERTY.EMAIL)
  @Expose()
  public email: string;

  @ApiProperty(PROPERTY.FULLNAME)
  @Expose()
  public fullname: string;

  @ApiProperty(PROPERTY.CREATED_AT)
  @Expose()
  public createdAt: Date;


  @ApiProperty(PROPERTY.SUBSCRIBERS_COUNT)
  @Expose()
  public subscribersCount: number;
}
