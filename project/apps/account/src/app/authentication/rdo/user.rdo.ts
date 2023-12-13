import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PROPERTY } from '../authentication.constant';

export class UserRdo {
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
}
