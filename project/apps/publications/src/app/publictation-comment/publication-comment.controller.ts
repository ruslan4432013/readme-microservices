import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateCommentDTO } from './dto/create-comment.dto';
import { fillDTO } from '@project/shared/helpers';
import { CommentRdo } from './rdo/comment.rdo';
import { PublicationCommentService } from "./publication-comment.service";

@Controller('publications/:publicationId/comments')
export class PublicationCommentController {
  constructor(
    private readonly publicationCommentService: PublicationCommentService,
  ) {}

  @Get('/')
  public async show(@Param('publicationId') publicationId: string) {
    const comments = await this.publicationCommentService.getComments(publicationId);
    return fillDTO(CommentRdo, comments.map((comment) => comment.toPOJO()));
  }

  @Post('/')
  public async create(
    @Param('publicationId') publicationId: string,
    @Body() dto: CreateCommentDTO
  ) {
    const newComment = await this.publicationCommentService.createComment(publicationId, dto);
    return fillDTO(CommentRdo, newComment.toPOJO());
  }
}
