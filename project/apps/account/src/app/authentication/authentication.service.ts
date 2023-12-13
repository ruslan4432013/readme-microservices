import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PublicationUserRepository } from '../publication-user/publication-user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { PublicationUserEntity } from '../publication-user/publication-user.entity';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.constant';
import { AuthUser } from '@project/shared/app/types';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly publicationUserRepository: PublicationUserRepository
  ) {}

  public async register(dto: CreateUserDto) {
    const { email, fullname, password } = dto;

    const publicationUser: AuthUser = {
      email,
      fullname,
      avatar: '',
      passwordHash: '',
    };

    const existUser = await this.publicationUserRepository.findByEmail(email);
    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new PublicationUserEntity(
      publicationUser
    ).setPassword(password);

    return await this.publicationUserRepository.save(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.publicationUserRepository.findByEmail(email)
    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND)
    }
    const publicationUserEntity = new PublicationUserEntity(existUser)
    if (!await publicationUserEntity.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG)
    }
    return publicationUserEntity.toPOJO()
  }

  public async getUser(id: string) {
    return this.publicationUserRepository.findById(id)
  }
}
