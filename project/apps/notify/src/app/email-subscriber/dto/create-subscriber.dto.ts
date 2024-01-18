import { IsEmail, IsNotEmpty } from 'class-validator';
import { EMAIL_SUBSCRIBER_MESSAGES } from '../email-subscriber.constant';

export class CreateSubscriberDto {
  @IsEmail({}, { message: EMAIL_SUBSCRIBER_MESSAGES.EMAIL_NOT_VALID })
  public email: string;

  @IsNotEmpty({ message: EMAIL_SUBSCRIBER_MESSAGES.FULLNAME_IS_EMPTY })
  public fullname: string;

}
