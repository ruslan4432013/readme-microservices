import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/shared/publications/models';
import { TextPublicationController } from "./text-publication.controller";
import { TextPublicationRepository } from "./text-publication.repository";
import { TextPublicationService } from "./text-publication.service";
import { PublicationTagModule } from "../../../publication-tag/publication-tag.module";


@Module({
  imports: [PrismaClientModule, PublicationTagModule],
  providers: [TextPublicationRepository, TextPublicationService],
  controllers: [TextPublicationController],
  exports: [TextPublicationService],
})
export class TextPublicationModule {
}
