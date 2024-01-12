import { Module } from '@nestjs/common';
import { PrismaClientModule } from "@project/shared/publications/models";
import { PublicationModule } from "../publication/publication.module";
import { PublicationCommentService } from "./publication-comment.service";
import { PublicationCommentRepository } from "./publication-comment.repository";
import { PublicationCommentController } from "./publication-comment.controller";


@Module({
  imports: [PublicationModule, PrismaClientModule],
  controllers: [PublicationCommentController],
  providers: [PublicationCommentService, PublicationCommentRepository],
})
export class PublicationCommentModule {
}
