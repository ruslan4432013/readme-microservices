import { Module } from '@nestjs/common';
import { PrismaClientModule } from "@project/shared/publications/models";
import { VideoPublicationModule } from "./subtypes/video-publication/video-publication.module";
import { LinkPublicationModule } from "./subtypes/link-publication/link-publication.module";
import { PhotoPublicationModule } from "./subtypes/photo-publication/photo-publication.module";
import { TextPublicationModule } from "./subtypes/text-publication/text-publication.module";
import { QuotePublicationModule } from "./subtypes/quote-publication/quote-publication.module";
import { PublicationRepository } from "./publication.repository";
import { PublicationService } from "./publication.service";
import { PublicationController } from "./publication.controller";

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
