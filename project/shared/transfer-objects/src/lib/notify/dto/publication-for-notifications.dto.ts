import { IsDate } from 'class-validator';

export class PublicationForNotificationsDTO {
  userId: string;

  @IsDate()
  notifiedAt: Date;
}
