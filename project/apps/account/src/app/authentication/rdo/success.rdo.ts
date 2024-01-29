import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { PROPERTY } from '../../account.constant';

export class SuccessRDO {
  @ApiProperty(PROPERTY.SUCCESS)
  @Expose()
  public success: boolean;
}
