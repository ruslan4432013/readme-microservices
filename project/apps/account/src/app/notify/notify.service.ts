import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { RabbitRouting } from '@project/shared/app/types';
import { rabbitConfig } from '@project/shared/config/account';

import { CreateSubscriberDTO } from './dto/create-subscriber.dto';

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
