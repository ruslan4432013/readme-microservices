export type EntityId = string;

export interface Entity<T extends EntityId> {
  id?: T;

  toPOJO(): Record<string, unknown>;
}
