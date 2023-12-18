import { BaseMemoryRepository } from '@project/shared/core';
import { Comment } from '@project/shared/app/types';

export class CommentsRepository extends BaseMemoryRepository<Comment> {
  async findByPublicationId(id: Comment['publicationId']): Promise<Comment[]> {
    const comments: Comment[] = [];
    for (const [, entity] of this.entities) {
      if (entity.publicationId === id) {
        comments.push(entity);
      }
    }
    return comments;
  }
}
