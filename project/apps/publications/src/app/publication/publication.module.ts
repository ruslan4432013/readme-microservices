import { Module } from '@nestjs/common';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';
import { PublicationRepository } from './publication.repository';

@Module({
  controllers: [PublicationController],
  imports: [],
  providers: [PublicationService, PublicationRepository],
})
export class PublicationModule {}
