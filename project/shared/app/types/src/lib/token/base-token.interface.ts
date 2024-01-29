export interface BaseToken {
  id?: string;
  tokenId: string;
  userId: string;
  expiresIn: Date;
  createdAt: Date;
}
