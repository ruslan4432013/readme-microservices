export type EntityId = string

export interface Entity<T extends EntityId> {
  id?: T;
}
