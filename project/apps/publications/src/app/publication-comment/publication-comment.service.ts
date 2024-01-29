import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { PaginationResult } from '@project/shared/app/types';
import { CreateCommentDTO } from '@project/shared/transfer-objects';

import { COMMENT_ERROR_MESSAGES } from './publication-comment.constant';
import { PublicationCommentEntity } from './publication-comment.entity';
import { PublicationCommentRepository } from './publication-comment.repository';
import { PublicationCommentQuery } from './query/publication-comment.query';

import { PublicationService } from '../publication/publication.service';


@Injectable()
export class PublicationCommentService {
  constructor(
    private readonly publicationCommentRepository: PublicationCommentRepository,
    private readonly publicationService: PublicationService
  ) {
  }

  public async getComments(query: PublicationCommentQuery, publicationId: string): Promise<PaginationResult<PublicationCommentEntity>> {
    return this.publicationCommentRepository.find(query, publicationId);
  }

  public async createComment(publicationId: string, dto: CreateCommentDTO): Promise<PublicationCommentEntity> {
    const existsPost = await this.publicationService.getPublication(publicationId);
    if (!existsPost.id) {
      throw new BadRequestException(`Unknown Publication id ${existsPost.id}`);
    }
    const newComment = PublicationCommentEntity.fromDTO(dto, existsPost.id);
    return this.publicationCommentRepository.save(newComment);
  }

  public async removeComment(commentId: string, userId: string) {
    const comment = await this.publicationCommentRepository.findById(commentId);
    if (comment.userId !== userId) {
      throw new UnauthorizedException(COMMENT_ERROR_MESSAGES.WRONG_USER);
    }
    await this.publicationCommentRepository.removeComment(commentId);
  }
}
