import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PublicationUserModel, PublicationUserSchema } from './publication-user.model';
import { PublicationUserRepository } from './publication-user.repository';

@Module({
  providers: [PublicationUserRepository],
  exports: [PublicationUserRepository],
  imports: [MongooseModule.forFeature([{ name: PublicationUserModel.name, schema: PublicationUserSchema }])],
})
export class PublicationUserModule {}
