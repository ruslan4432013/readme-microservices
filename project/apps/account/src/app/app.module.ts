import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { PublicationUserModule } from './publication-user/publication-user.module';
import {
  ConfigAccountModule,
  getMongooseOptions,
} from '@project/shared/config/account';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthenticationModule,
    PublicationUserModule,
    ConfigAccountModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
