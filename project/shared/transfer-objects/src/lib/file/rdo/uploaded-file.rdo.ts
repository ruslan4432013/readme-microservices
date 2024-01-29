import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { PROPERTY } from '../file.constant';

export class UploadedFileRDO {
  @ApiProperty(PROPERTY.ID)
  @Expose()
  public id: string;

  @ApiProperty(PROPERTY.ID)
  @Expose()
  public originalName: string;

  @ApiProperty(PROPERTY.HASH_NAME)
  @Expose()
  public hashName: string;

  @ApiProperty(PROPERTY.SUB_DIRECTORY)
  @Expose()
  public subDirectory: string;

  @ApiProperty(PROPERTY.MIMETYPE)
  @Expose()
  public mimetype: string;

  @ApiProperty(PROPERTY.SIZE)
  @Expose()
  public size: number;
}
