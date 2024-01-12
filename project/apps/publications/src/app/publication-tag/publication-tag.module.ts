import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/shared/publications/models';
import { PublicationTagRepository } from "./publication-tag.repository";
import { PublicationTagService } from "./publication-tag.service";
import { PublicationTagController } from "./publication-tag.controller";


@Module({
  imports: [PrismaClientModule],
  providers: [PublicationTagRepository, PublicationTagService],
  controllers: [PublicationTagController],
  exports: [PublicationTagService]
})
export class PublicationTagModule {
}
