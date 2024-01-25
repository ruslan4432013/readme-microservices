import { InjectModel } from '@nestjs/mongoose';
import { RefreshTokenModel } from './refresh-token.model';
import { Model } from 'mongoose';
import { RefreshTokenEntity } from './refresh-token.entity';
import { BaseMongoRepository } from '@project/shared/core';

export class RefreshTokenRepository extends BaseMongoRepository<
  RefreshTokenEntity,
  RefreshTokenModel
> {
  constructor(
    @InjectModel(RefreshTokenModel.name) private readonly refreshTokenModel: Model<RefreshTokenModel>) {
    super(refreshTokenModel, RefreshTokenEntity.fromObject);
  }

  public async deleteByTokenId(tokenId: string) {
    await this.refreshTokenModel
      .deleteOne({ tokenId })
      .exec();
  }

  public async findByTokenId(tokenId: string): Promise<RefreshTokenEntity | null> {
    const entity = await this.refreshTokenModel
      .findOne({ tokenId })
      .exec();
    return entity ? this.createEntityFromDocument(entity) : null;
  }

  public async deleteExpiredTokens() {
    await this.refreshTokenModel
      .deleteMany({ expiresIn: { $lt: new Date() } }).exec();
  }
}
