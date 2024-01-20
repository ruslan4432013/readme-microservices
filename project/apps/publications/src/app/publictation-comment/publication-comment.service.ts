import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateCommentDTO } from './dto/create-comment.dto';
import { PublicationCommentRepository } from "./publication-comment.repository";
import { PublicationService } from "../publication/publication.service";
import { PublicationCommentEntity } from "./publication-comment.entity";


@Injectable()
export class PublicationCommentService {
  constructor(
    private readonly publicationCommentRepository: PublicationCommentRepository,
    private readonly publicationService: PublicationService,
  ) {}

  public async getComments(publicationId: string): Promise<PublicationCommentEntity[]> {
    return this.publicationCommentRepository.findByPublicationId(publicationId);
  }

  public async createComment(publicationId: string, dto: CreateCommentDTO): Promise<PublicationCommentEntity> {
   const existsPost = await this.publicationService.getPublication(publicationId);
   if (!existsPost.id) {
     throw new BadRequestException(`Unknown Publication id ${existsPost.id}`)
   }
    const newComment = PublicationCommentEntity.fromDTO(dto, existsPost.id);
    return this.publicationCommentRepository.save(newComment);
  }
}
