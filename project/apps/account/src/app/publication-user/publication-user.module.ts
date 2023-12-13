import { Module } from '@nestjs/common';
import { PublicationUserRepository } from './publication-user.repository';

@Module({
  providers: [PublicationUserRepository],
  exports: [PublicationUserRepository]
})
export class PublicationUserModule {}
