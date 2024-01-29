import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateSubscriberDTO } from './dto/create-subscriber.dto';
import { EMAIL_SUBSCRIBER_MESSAGES } from './email-subscriber.constant';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { EmailSubscriberRepository } from './email-subscriber.repository';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository
  ) {
  }

  public async addSubscriber(subscriber: CreateSubscriberDTO) {
    const { email } = subscriber;
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (existsSubscriber) {
      return existsSubscriber;
    }

    return this.emailSubscriberRepository
      .save(new EmailSubscriberEntity().populate({ ...subscriber, notifiedAt: new Date() }));
  }

  public async findUserByEmail(email: string) {
    const user = await this.emailSubscriberRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestException(EMAIL_SUBSCRIBER_MESSAGES.USER_NOT_FOUND);
    }
    return user;
  }

  public async markNotify(email: string) {
    const user = (await this.findUserByEmail(email)).toPOJO();

    const updatedUser = new EmailSubscriberEntity().populate({
      email: user.email,
      fullname: user.fullname,
      notifiedAt: new Date()
    });

    await this.emailSubscriberRepository.update(user.id, updatedUser);
  }
}
