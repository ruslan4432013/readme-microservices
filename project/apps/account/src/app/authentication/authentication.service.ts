import {
  ConflictException, HttpException, HttpStatus,
  Injectable, Logger,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { PublicationUserRepository } from '../publication-user/publication-user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { PublicationUserEntity } from '../publication-user/publication-user.entity';
import { AUTH_USER_MESSAGES } from './authentication.constant';
import { AuthUser, Token, TokenPayload, User } from '@project/shared/app/types';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {

  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly publicationUserRepository: PublicationUserRepository,
    private readonly jwtService: JwtService
  ) {
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
    return publicationUserEntity;
  }

  public async getUser(id: string) {
    const existedUser = await this.publicationUserRepository.findById(id);
    if (!existedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return existedUser;
  }

  public async createUserToken(user: User): Promise<Token> {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.generateAccessToken(user),
        this.generateRefreshToken(user)
      ]);
      return { accessToken, refreshToken };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('[Token generation error]: ' + error.message);
      }
      throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async generateRefreshToken(user: User): Promise<string> {
    const payload: TokenPayload = {
      sub: user.id!,
      email: user.email,
      fullname: user.fullname
    };
    return this.jwtService.signAsync(payload, { expiresIn: '7d' });
  }

  async generateAccessToken(user: User): Promise<string> {
    const payload: TokenPayload = {
      sub: user.id!,
      email: user.email,
      fullname: user.fullname
    };
    return this.jwtService.signAsync(payload);
  }


  public verifyRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
