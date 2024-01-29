import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { getHttpModuleOptions } from '@project/shared/config/bff';
import { getRabbitMQOptions } from '@project/shared/helpers';

import { EmailSubscriberController } from './email-subscriber.controller';
import { EmailSubscriberModel, EmailSubscriberSchema } from './email-subscriber.model';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { EmailSubscriberService } from './email-subscriber.service';

import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    HttpModule.registerAsync(getHttpModuleOptions()),
    MongooseModule.forFeature([
      { name: EmailSubscriberModel.name, schema: EmailSubscriberSchema }
    ]),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit')
    ),
    MailModule
  ],
  controllers: [
    EmailSubscriberController
  ],
  providers: [
    EmailSubscriberService,
    EmailSubscriberRepository
  ]
})
export class EmailSubscriberModule {
}
