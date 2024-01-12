import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateCommentDto } from './dto/create-comment.dto';
import { fillDto } from '@project/shared/helpers';
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
    return fillDto(CommentRdo, comments.map((comment) => comment.toPOJO()));
  }

  @Post('/')
  public async create(
    @Param('publicationId') publicationId: string,
    @Body() dto: CreateCommentDto
  ) {
    const newComment = await this.publicationCommentService.createComment(publicationId, dto);
    return fillDto(CommentRdo, newComment.toPOJO());
  }
}
