import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Subscriber } from '@project/shared/app/types';

@Schema({
  collection: 'email-subscribers',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export class EmailSubscriberModel extends Document implements Subscriber {
  @Prop({
    required: true
  })
  public email: string;

  @Prop({
    required: true
  })
  public fullname: string;

  @Prop({
    required: true,
    type: Date,
    default: () => Date.now()
  })
  public notifiedAt: Date;

  public id?: string;
}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberModel);

EmailSubscriberSchema.virtual('id').get(function() {
  return this._id.toString();
});
