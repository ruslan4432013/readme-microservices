import { DefaultPojoType, Entity, EntityIdType } from './entity.interface';

export interface Repository<
  T extends Entity<EntityIdType, PojoType>,
  PojoType = DefaultPojoType
> {
  findById: (uuid: T['id']) => Promise<T | null>;
  save: (entity: T) => Promise<T>;
  update: (uuid: T['id'], entity: T) => Promise<T>;
  deleteById: (uuid: T['id']) => Promise<void>;
}
