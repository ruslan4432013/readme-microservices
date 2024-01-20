import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDTO } from './dto/create-subscriber.dto';
import { RabbitRouting } from '@project/shared/app/types';
import { MailService } from '../mail/mail.service';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService
  ) {
  }

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'readme.notify'
  })
  public async create(subscriber: CreateSubscriberDTO) {
    await this.subscriberService.addSubscriber(subscriber);
    await this.mailService.sendNotifyNewSubscriber(subscriber);
  }
}
