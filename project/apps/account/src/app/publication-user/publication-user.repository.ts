import { PublicationUserEntity } from './publication-user.entity';
import { Injectable } from '@nestjs/common';
import { BaseMongoRepository } from '@project/shared/core';
import { PublicationUserModel } from './publication-user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PublicationUserRepository extends BaseMongoRepository<
  PublicationUserEntity,
  PublicationUserModel
> {
  constructor(
    @InjectModel(PublicationUserModel.name)
    private publicationUserModel: Model<PublicationUserModel>
  ) {
    super(publicationUserModel, PublicationUserEntity.fromObject);
  }

  public async findByEmail(
    email: string
  ): Promise<PublicationUserEntity | null> {
    const document = await this.model.findOne({ email }).exec();
    return document ? this.createEntityFromDocument(document) : null
  }
}
