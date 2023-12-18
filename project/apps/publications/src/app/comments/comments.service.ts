import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsRepository } from './comments.repository';
import { Comment } from '@project/shared/app/types';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  public async create(dto: CreateCommentDto) {
    const comment: Comment = {
      createdAt: Date.now(),
      publicationId: dto.publicationId,
      text: dto.text,
      userId: dto.userId,
    };
    return await this.commentsRepository.save(comment);
  }

  public async findByPublicationId(publicationId: string) {
    return await this.commentsRepository.findByPublicationId(publicationId);
  }

  public async remove(id: string) {
    return await this.commentsRepository.deleteById(id);
  }
}
