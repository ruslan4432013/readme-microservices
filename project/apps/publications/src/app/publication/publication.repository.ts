import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/shared/core';
import { UnionPublication } from '@project/shared/app/types';


type WithPOJO<T> = {
  toPOJO(): Record<string, unknown>;
} & T

@Injectable()
export class PublicationRepository extends BaseMemoryRepository<WithPOJO<UnionPublication>> {

}
