import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/shared/publications/models';

import { QuotePublicationController } from "./quote-publication.controller";
import { QuotePublicationRepository } from "./quote-publication.repository";
import { QuotePublicationService } from "./quote-publication.service";

import { PublicationTagModule } from "../../../publication-tag/publication-tag.module";


@Module({
  imports: [PrismaClientModule, PublicationTagModule],
  providers: [QuotePublicationRepository, QuotePublicationService],
  controllers: [QuotePublicationController],
  exports: [QuotePublicationService],
})
export class QuotePublicationModule {
}
