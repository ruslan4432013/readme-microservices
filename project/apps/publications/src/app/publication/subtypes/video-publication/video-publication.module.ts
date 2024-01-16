import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/shared/publications/models';
import { VideoPublicationController } from "./video-publication.controller";
import { VideoPublicationRepository } from "./video-publication.repository";
import { VideoPublicationService } from "./video-publication.service";
import { PublicationTagModule } from "../../../publication-tag/publication-tag.module";


@Module({
  imports: [PrismaClientModule, PublicationTagModule],
  providers: [VideoPublicationRepository, VideoPublicationService],
  controllers: [VideoPublicationController],
  exports: [VideoPublicationService],
})
export class VideoPublicationModule {
}
