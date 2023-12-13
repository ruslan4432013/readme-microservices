import { BaseMemoryRepository } from '@project/shared/core';
import { PublicationUserEntity } from './publication-user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PublicationUserRepository extends BaseMemoryRepository<PublicationUserEntity> {
  public async findByEmail(email: string): Promise<PublicationUserEntity | null> {
    for (const [, entity] of this.entities) {
      if (entity.email === email) {
        return Promise.resolve(entity)
      }
    }
    return null
  }
}
