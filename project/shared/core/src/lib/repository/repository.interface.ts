import { Entity } from './entity.interface';

export interface Repository<T extends Entity<string>> {
  findById: (uuid: T['id']) => Promise<T | null>;
  save: (entity: T) => Promise<T>;
  update: (uuid: T['id'], entity: T) => Promise<T>;
  deleteById: (uuid: T['id']) => Promise<void>;
}
