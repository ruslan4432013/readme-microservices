import { Module } from '@nestjs/common';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions, NotifyConfigModule } from '@project/shared/config/notify';


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
