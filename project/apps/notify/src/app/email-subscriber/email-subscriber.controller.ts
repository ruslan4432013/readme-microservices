import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { HttpService } from '@nestjs/axios';
import { Body, Controller, Inject, Post, UseFilters } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { RabbitRouting } from '@project/shared/app/types';
import { notifyConfig } from '@project/shared/config/notify';
import { AxiosExceptionFilter } from '@project/shared/core';
import { NotifyPublicationDTO } from '@project/shared/transfer-objects';

import { CreateSubscriberDTO } from './dto/create-subscriber.dto';
import { DESCRIPTIONS, QUERY_KEY_DATE } from './email-subscriber.constant';
import { EmailSubscriberService } from './email-subscriber.service';

import { MailService } from '../mail/mail.service';


@ApiTags('notify')
@Controller('notify')
@UseFilters(AxiosExceptionFilter)
export class EmailSubscriberController {
  constructor(
    private readonly httpService: HttpService,
    @Inject(notifyConfig.KEY) private readonly config: ConfigType<typeof notifyConfig>,
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService
  ) {
  }

  @RabbitSubscribe({
    exchange: RabbitRouting.Default,
    routingKey: RabbitRouting.AddSubscriber,
    queue: RabbitRouting.Default
  })
  public async create(subscriber: CreateSubscriberDTO) {
    await this.subscriberService.addSubscriber(subscriber);
    await this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  private getNotifyUrl(notifiedAt: Date) {
    return `${this.config.url.publications}/new-publications?${QUERY_KEY_DATE}=${notifiedAt.toISOString()}`;
  }

  @ApiOkResponse({ description: DESCRIPTIONS.NOTIFY })
  @Post()
  public async notify(@Body() dto: NotifyPublicationDTO) {
    const user = await this.subscriberService.findUserByEmail(dto.email);
    const url = this.getNotifyUrl(user.notifiedAt);

    const { data } = await this.httpService.axiosRef.get(url);

    this.mailService.sendPublicationInfo({
      count: data.length,
      email: user.email,
      username: user.fullname,
      template: JSON.stringify(data)
    });

    await this.subscriberService.markNotify(dto.email);

  }
}
