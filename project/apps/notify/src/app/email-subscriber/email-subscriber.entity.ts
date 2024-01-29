import { Subscriber } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';

export class EmailSubscriberEntity implements Subscriber, Entity<string, Subscriber> {
  public id?: string;
  public email: string;
  public fullname: string;
  public notifiedAt: Date;

  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      fullname: this.fullname,
      notifiedAt: this.notifiedAt
    };
  }

  public populate(data: Subscriber): EmailSubscriberEntity {
    this.id = data.id;
    this.email = data.email;
    this.fullname = data.fullname;
    this.notifiedAt = data.notifiedAt;
    return this;
  }

  static fromObject(data: Subscriber): EmailSubscriberEntity {
    return new EmailSubscriberEntity()
      .populate(data);
  }
}
