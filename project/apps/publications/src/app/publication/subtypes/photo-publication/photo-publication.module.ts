import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/shared/publications/models';

import { PhotoPublicationController } from "./photo-publication.controller";
import { PhotoPublicationRepository } from "./photo-publication.repository";
import { PhotoPublicationService } from "./photo-publication.service";

import { PublicationTagModule } from "../../../publication-tag/publication-tag.module";


@Module({
  imports: [PrismaClientModule, PublicationTagModule],
  providers: [PhotoPublicationRepository, PhotoPublicationService],
  controllers: [PhotoPublicationController],
  exports: [PhotoPublicationService],
})
export class PhotoPublicationModule {
}
