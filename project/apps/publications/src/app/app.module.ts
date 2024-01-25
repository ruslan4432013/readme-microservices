import { Module } from '@nestjs/common';
import { PublicationModule } from './publication/publication.module';
import { PublicationCommentModule } from './publictation-comment/publication-comment.module';
import { PublicationTagModule } from "./publication-tag/publication-tag.module";
import { RouterModule } from "@nestjs/core";
import { VideoPublicationModule } from "./publication/subtypes/video-publication/video-publication.module";
import { LinkPublicationModule } from "./publication/subtypes/link-publication/link-publication.module";
import { PhotoPublicationModule } from "./publication/subtypes/photo-publication/photo-publication.module";
import { TextPublicationModule } from "./publication/subtypes/text-publication/text-publication.module";
import { QuotePublicationModule } from "./publication/subtypes/quote-publication/quote-publication.module";
import { ConfigPublicationsModule } from '@project/shared/config/publications';

@Module({
  imports: [
    ConfigPublicationsModule,
    PublicationModule,
    PublicationCommentModule,
    PublicationTagModule,
    VideoPublicationModule,
    LinkPublicationModule,
    PhotoPublicationModule,
    TextPublicationModule,
    QuotePublicationModule,
    RouterModule.register([
      {
        path: 'publications',
        module: PublicationModule,
        children: [
          VideoPublicationModule,
          LinkPublicationModule,
          PhotoPublicationModule,
          TextPublicationModule,
          QuotePublicationModule
        ]
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
