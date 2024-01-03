export interface Comment {
  id?: string;
  message: string;
  userId: string;
  publicationId: string;
  createdAt: Date;
  updatedAt: Date;

  toPOJO(): Record<string, unknown>;
}
