import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  public async create(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentsService.create(createCommentDto);
  }

  @Get(':publicationId')
  public async getByPublicationId(
    @Param('publicationId') publicationId: string
  ) {
    return await this.commentsService.findByPublicationId(publicationId);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return await this.commentsService.remove(id);
  }
}
