import { AuthUser } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUND } from './publication-user.constant';

export class PublicationUserEntity implements AuthUser, Entity<string> {
  public id?: string;
  public email: string;
  public fullname: string;
  public avatar: string;
  public passwordHash: string;

  constructor(user: AuthUser) {
    this.populate(user);
  }

  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      fullname: this.fullname,
      avatar: this.avatar,
      passwordHash: this.passwordHash,
    };
  }

  public populate(data: AuthUser) {
    this.id = data.id;
    this.email = data.email;
    this.fullname = data.fullname;
    this.avatar = data.avatar;
    this.passwordHash = data.passwordHash;
  }

  public async setPassword(password: string): Promise<PublicationUserEntity> {
    const salt = await genSalt(SALT_ROUND);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  static fromObject(data: AuthUser): PublicationUserEntity {
    return new PublicationUserEntity(data);
  }
}
