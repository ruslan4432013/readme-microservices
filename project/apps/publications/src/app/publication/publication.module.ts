import { Module } from '@nestjs/common';

import { PrismaClientModule } from "@project/shared/publications/models";

import { PublicationController } from "./publication.controller";
import { PublicationRepository } from "./publication.repository";
import { PublicationService } from "./publication.service";
import { LinkPublicationModule } from "./subtypes/link-publication/link-publication.module";
import { PhotoPublicationModule } from "./subtypes/photo-publication/photo-publication.module";
import { QuotePublicationModule } from "./subtypes/quote-publication/quote-publication.module";
import { TextPublicationModule } from "./subtypes/text-publication/text-publication.module";
import { VideoPublicationModule } from "./subtypes/video-publication/video-publication.module";

@Module({
  controllers: [PublicationController],
  imports: [
    PrismaClientModule,
    VideoPublicationModule,
    LinkPublicationModule,
    PhotoPublicationModule,
    TextPublicationModule,
    QuotePublicationModule,
  ],
  providers: [PublicationRepository, PublicationService],
  exports: [PublicationService]
})
export class PublicationModule {
}
