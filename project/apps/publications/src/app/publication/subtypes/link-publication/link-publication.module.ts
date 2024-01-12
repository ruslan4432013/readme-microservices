import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/shared/publications/models';
import { LinkPublicationController } from "./link-publication.controller";
import { LinkPublicationRepository } from "./link-publication.repository";
import { LinkPublicationService } from "./link-publication.service";
import { PublicationTagModule } from "../../../publication-tag/publication-tag.module";


@Module({
  imports: [PrismaClientModule, PublicationTagModule],
  providers: [LinkPublicationRepository, LinkPublicationService],
  controllers: [LinkPublicationController],
  exports: [LinkPublicationService],
})
export class LinkPublicationModule {
}
