import { Module } from '@nestjs/common';
import { PublicationUserRepository } from './publication-user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicationUserModel, PublicationUserSchema } from './publication-user.model';

@Module({
  providers: [PublicationUserRepository],
  exports: [PublicationUserRepository],
  imports: [MongooseModule.forFeature([{ name: PublicationUserModel.name, schema: PublicationUserSchema }])],
})
export class PublicationUserModule {}
