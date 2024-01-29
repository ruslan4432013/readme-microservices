import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { PROPERTY } from '../account.constant';

export class PublicationsUserCountRdo {
  @ApiProperty(PROPERTY.USER_ID)
  @Expose()
  public userId: string;

  @ApiProperty(PROPERTY.USER_ID)
  @Expose()
  public count: number;
}
