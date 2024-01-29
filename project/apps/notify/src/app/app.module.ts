import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { getMongooseOptions, NotifyConfigModule } from '@project/shared/config/notify';

import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';


@Module({
  imports: [
    MongooseModule.forRootAsync(getMongooseOptions()),
    EmailSubscriberModule,
    NotifyConfigModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
