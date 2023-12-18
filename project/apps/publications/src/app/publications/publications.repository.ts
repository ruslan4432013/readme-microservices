import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/shared/core';
import { UnionPublication } from '@project/shared/app/types';

@Injectable()
export class PublicationsRepository extends BaseMemoryRepository<UnionPublication> {

}
