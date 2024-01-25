import { Entity } from '@project/shared/core';
import { BaseToken } from '@project/shared/app/types';

export class RefreshTokenEntity implements Entity<string>, BaseToken {
  public id?: string;
  public createdAt: Date;
  public expiresIn: Date;
  public tokenId: string;
  public userId: string;

  constructor(refreshToken: BaseToken) {
    this.populate(refreshToken);
  }

  public populate(entity: BaseToken): void {
    this.userId = entity.userId;
    this.id = entity.id;
    this.tokenId = entity.tokenId;
    this.createdAt = entity.createdAt;
    this.expiresIn = entity.expiresIn;
  }

  public toPOJO() {
    return {
      id: this.id,
      expiresIn: this.expiresIn,
      createdAt: this.createdAt,
      tokenId: this.tokenId,
      userId: this.userId
    };
  }

  static fromObject(document: BaseToken): RefreshTokenEntity {
    return new RefreshTokenEntity(document);
  }
}
