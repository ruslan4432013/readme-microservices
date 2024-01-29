import { Transform } from 'class-transformer';
import { IsDate } from 'class-validator';

export class NotifyPublicationQuery {

  @Transform(({ value }) => new Date(value))
  @IsDate()
  startDate: Date;
}
