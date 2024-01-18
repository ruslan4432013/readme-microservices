import { Inject, Injectable } from '@nestjs/common';
import { EMAIL_ADD_SUBSCRIBER_SUBJECT } from './mail.constant';
import { MailerService } from '@nestjs-modules/mailer';
import { Subscriber } from '@project/shared/app/types';
import { NotifyConfig } from '@project/shared/config/notify';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(NotifyConfig.KEY)
    private readonly serviceConfig: ConfigType<typeof NotifyConfig>,
  ) {}

  public async sendNotifyNewSubscriber({email, fullname}: Subscriber) {
    await this.mailerService.sendMail({
      from: this.serviceConfig.mail.from,
      to: email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: fullname,
        email: email,
      }
    })
  }
}
