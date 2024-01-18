import { Subscriber } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';

export class EmailSubscriberEntity implements Subscriber, Entity<string, Subscriber> {
  public id?: string;
  public email: string;
  public fullname: string;

  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      fullname: this.fullname
    };
  }

  public populate(data: Subscriber): EmailSubscriberEntity {
    this.id = data.id;
    this.email = data.email;
    this.fullname = data.fullname;
    return this;
  }

  static fromObject(data: Subscriber): EmailSubscriberEntity {
    return new EmailSubscriberEntity()
      .populate(data);
  }
}
