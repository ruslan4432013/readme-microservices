import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

import { ConfigType } from '@nestjs/config';
import { CreateSubscriberDTO } from './dto/create-subscriber.dto';
import { RabbitRouting } from '@project/shared/app/types';
import { rabbitConfig } from '@project/shared/config/account';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDTO) {
    return this.rabbitClient.publish<CreateSubscriberDTO>(
      this.rabbiOptions.exchange,
      RabbitRouting.AddSubscriber,
      { ...dto },
    );
  }
}
