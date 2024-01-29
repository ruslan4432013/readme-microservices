import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  ConfigAccountModule,
  getMongooseOptions
} from '@project/shared/config/account';

import { AuthenticationModule } from './authentication/authentication.module';
import { NotifyModule } from './notify/notify.module';
import { PublicationUserModule } from './publication-user/publication-user.module';

@Module({
  imports: [
    AuthenticationModule,
    PublicationUserModule,
    ConfigAccountModule,
    NotifyModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
