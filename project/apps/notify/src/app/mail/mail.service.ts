import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

import { Subscriber } from '@project/shared/app/types';
import { PublicationNotify } from '@project/shared/app/types';
import { notifyConfig } from '@project/shared/config/notify';

import { EMAIL_ADD_SUBSCRIBER_SUBJECT, EMAIL_NEWS } from './mail.constant';

import { TEMPLATES } from '../notify.constant';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(notifyConfig.KEY)
    private readonly serviceConfig: ConfigType<typeof notifyConfig>
  ) {
  }

  public async sendNotifyNewSubscriber({ email, fullname }: Omit<Subscriber, 'notifiedAt'>) {
    await this.mailerService.sendMail({
      from: this.serviceConfig.mail.from,
      to: email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: TEMPLATES.ADD_SUBSCRIBER,
      context: {
        user: fullname,
        email: email
      }
    });
  }

  public sendPublicationInfo({ count, email, username, template }: PublicationNotify) {
    this.mailerService.sendMail({
      from: this.serviceConfig.mail.from,
      to: email,
      subject: EMAIL_NEWS,
      template: TEMPLATES.PUBLICATION_NOTIFY,
      context: {
        count,
        username,
        template
      }
    });
  }
}
