import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PublicationUserRepository } from '../publication-user/publication-user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { PublicationUserEntity } from '../publication-user/publication-user.entity';
import { AUTH_USER_MESSAGES } from './authentication.constant';
import { AuthUser } from '@project/shared/app/types';
import { LoginUserDto } from './dto/login-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly publicationUserRepository: PublicationUserRepository,
    private readonly configService: ConfigService
  ) {
    console.log(configService.get<string>('db.host'));
    console.log(configService.get<string>('db.user'));
  }

  public async register(dto: CreateUserDto) {
    const { email, fullname, password } = dto;

    const publicationUser: AuthUser = {
      email,
      fullname,
      avatar: '',
      passwordHash: '',
      subscribersIds: []
    };

    const existedUser = await this.publicationUserRepository.findByEmail(email);
    if (existedUser) {
      throw new ConflictException(AUTH_USER_MESSAGES.EXISTS);
    }

    const userEntity = await new PublicationUserEntity(
      publicationUser
    ).setPassword(password);

    return await this.publicationUserRepository.save(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existedUser = await this.publicationUserRepository.findByEmail(email);
    if (!existedUser) {
      throw new NotFoundException(AUTH_USER_MESSAGES.NOT_FOUND);
    }
    const publicationUserEntity = new PublicationUserEntity(existedUser);
    if (!(await publicationUserEntity.comparePassword(password))) {
      throw new UnauthorizedException(AUTH_USER_MESSAGES.PASSWORD_WRONG);
    }
    return publicationUserEntity.toPOJO();
  }

  public async getUser(id: string) {
    const existedUser = await this.publicationUserRepository.findById(id);
    if (!existedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return existedUser;
  }
}
