import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { PROPERTY } from '../application.constant';

class CountRDO {
  @ApiProperty(PROPERTY.PUBLICATIONS)
  @Expose()
  publications: number;

  @ApiProperty(PROPERTY.SUBSCRIBERS)
  @Expose()
  subscribers: number;
}


export class UserDetailRDO {
  @ApiProperty(PROPERTY.ID)
  @Expose()
  id: string;

  @ApiProperty({
    type: CountRDO
  })
  @Expose()
  @Type(() => CountRDO)
  count: CountRDO;

  @ApiProperty(PROPERTY.CREATED_AT)
  @Expose()
  createdAt: Date;

  @ApiProperty(PROPERTY.EMAIL)
  @Expose()
  email: string;

  @ApiProperty(PROPERTY.FIRSTNAME)
  @Expose()
  firstname: string;

  @ApiProperty(PROPERTY.LASTNAME)
  @Expose()
  lastname: string;
}
