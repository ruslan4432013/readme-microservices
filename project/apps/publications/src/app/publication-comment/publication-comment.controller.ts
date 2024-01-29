import { Body, Controller, Delete, Get, Headers, Param, Post, Query } from '@nestjs/common';

import { USER_ID_HEADER } from '@project/shared/core';
import { fillDTO } from '@project/shared/helpers';
import { CreateCommentDTO } from '@project/shared/transfer-objects';

import { PublicationCommentService } from './publication-comment.service';
import { PublicationCommentQuery } from './query/publication-comment.query';
import { CommentRDO } from './rdo/comment.rdo';

@Controller('publications/:publicationId/comments')
export class PublicationCommentController {
  constructor(
    private readonly publicationCommentService: PublicationCommentService
  ) {
  }

  @Get('/')
  public async show(@Param('publicationId') publicationId: string, @Query() query: PublicationCommentQuery) {
    const result = await this.publicationCommentService.getComments(query, publicationId);
    return {
      ...result,
      entities: fillDTO(CommentRDO, result.entities.map(el => el.toPOJO()))
    };
  }

  @Post('/')
  public async create(
    @Param('publicationId') publicationId: string,
    @Body() dto: CreateCommentDTO
  ) {
    const newComment = await this.publicationCommentService.createComment(publicationId, dto);
    return fillDTO(CommentRDO, newComment.toPOJO());
  }

  @Delete('/:id')
  public async remove(@Param('id') id: string, @Headers(USER_ID_HEADER) userId: string) {
    await this.publicationCommentService.removeComment(id, userId);
  }
}
