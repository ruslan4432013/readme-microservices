import { PrismaClientService } from '@project/shared/publications/models';

import { DefaultPojoType, Entity, EntityIdType } from './entity.interface';
import { Repository } from './repository.interface';

export abstract class BasePostgresRepository<
  EntityType extends Entity<EntityIdType, DocumentType>,
  DocumentType = DefaultPojoType
> implements Repository<EntityType, DocumentType> {
  constructor(
    protected readonly client: PrismaClientService,
    private readonly createEntity: (document: DocumentType) => EntityType
  ) {
  }

  protected createEntityFromDocument(document: DocumentType): EntityType
  protected createEntityFromDocument(): null
  protected createEntityFromDocument(document?: DocumentType) {
    if (!document) {
      return null;
    }
    return this.createEntity(document);
  }

  public async findById(id: EntityType['id']): Promise<EntityType | null>;
  public async findById(): Promise<EntityType | null> {
    throw new Error('Not implemented');
  }

  public async save(entity: EntityType): Promise<EntityType>
  public async save(): Promise<EntityType> {
    throw new Error('Not implemented');
  }

  public async update(id: EntityType['id'], entity: EntityType): Promise<EntityType>
  public async update(): Promise<EntityType> {
    throw new Error('Not implemented');
  }

  public async deleteById(id: EntityType['id']): Promise<void>
  public async deleteById(): Promise<void> {
    throw new Error('Not implemented');
  }
}
