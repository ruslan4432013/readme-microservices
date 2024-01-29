import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { AuthUser } from '@project/shared/app/types';

@Schema({
  collection: 'accounts',
  timestamps: true
})
export class PublicationUserModel extends Document implements AuthUser {
  @Prop({
    required: true,
    unique: true
  })
  public email: string;

  @Prop({
    required: true
  })
  public fullname: string;

  @Prop()
  public avatar: string;

  @Prop({
    required: true
  })
  public passwordHash: string;

  @Prop({
    default: []
  })
  public subscribersIds: string[];

  createdAt: Date;
}

export const PublicationUserSchema = SchemaFactory.createForClass(PublicationUserModel);

PublicationUserSchema.virtual('id').get(function() {
  return this._id.toString();
});
