import {
  ConflictException, HttpException, HttpStatus, Inject,
  Injectable, Logger,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AuthUser, RefreshTokenPayload, Token, TokenPayload, User } from '@project/shared/app/types';
import { jwtConfig } from '@project/shared/config/account';
import { createJWTPayload, fillDTO } from '@project/shared/helpers';
import { ChangeUserPasswordDTO, CreateUserDTO, LoginUserDTO, UserRDO } from '@project/shared/transfer-objects';

import { AUTH_USER_MESSAGES } from './authentication.constant';

import { PublicationUserEntity } from '../publication-user/publication-user.entity';
import { PublicationUserRepository } from '../publication-user/publication-user.repository';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';

@Injectable()
export class AuthenticationService {

  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly publicationUserRepository: PublicationUserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService
  ) {
  }

  public async register(dto: CreateUserDTO) {
    const { email, fullname, password } = dto;

    const publicationUser: AuthUser = {
      email,
      fullname,
      avatar: '',
      passwordHash: '',
      createdAt: new Date(),
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

  public async verifyUser(dto: LoginUserDTO) {
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
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);
    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.generateAccessToken(accessTokenPayload),
        this.generateRefreshToken(refreshTokenPayload)
      ]);
      return { accessToken, refreshToken };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('[Token generation error]: ' + error.message);
      }
      throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async generateRefreshToken(payload: RefreshTokenPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.jwtOptions.refreshTokenSecret,
      expiresIn: this.jwtOptions.refreshTokenExpiresIn
    });
  }

  public async generateAccessToken(payload: TokenPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  public async changePassword(userId = '', payload: ChangeUserPasswordDTO) {

    if (!userId) {
      throw new UnauthorizedException('Incorrect user');
    }

    const { newPassword, currentPassword } = payload;
    const userEntity = await this.publicationUserRepository.findById(userId);

    if (!userEntity) {
      throw new NotFoundException(`Incorrect user id ${userId}`);
    }
    if (!(await userEntity.comparePassword(currentPassword))) {
      throw new UnauthorizedException(AUTH_USER_MESSAGES.PASSWORD_WRONG);
    }
    await userEntity.setPassword(newPassword);
    return this.publicationUserRepository.update(userId, userEntity);
  }

  public async getUserByEmail(email: string) {
    const existedUser = await this.publicationUserRepository.findByEmail(email);

    if (!existedUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return existedUser;
  }

  public async getUsers(ids: string[]) {
    const users = await this.publicationUserRepository.findManyByIds(ids);
    return users.map(el => {
      if (typeof el === 'string') {
        return el;
      }
      return fillDTO(UserRDO, el);
    });
  }
}
