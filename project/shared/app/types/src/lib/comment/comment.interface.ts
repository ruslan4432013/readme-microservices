export interface Comment {
  id?: string;
  text: string;
  userId: string;
  publicationId: string;
  createdAt: Date;
}
