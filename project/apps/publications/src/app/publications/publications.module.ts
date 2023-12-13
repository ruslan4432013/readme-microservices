import { Module } from '@nestjs/common';
import { PublicationsController } from './publications.controller';
import { PublicationsService } from './publications.service';
import { PublicationsRepository } from './publications.repository';

@Module({
  controllers: [PublicationsController],
  imports: [],
  providers: [PublicationsService, PublicationsRepository],
})
export class PublicationsModule {}
