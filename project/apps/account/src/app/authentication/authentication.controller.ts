import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post, Query,
  Req,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { RequestWithTokenPayload } from '@project/shared/app/types';
import { MongoIdValidationPipe } from '@project/shared/core';
import { fillDTO } from '@project/shared/helpers';
import { ChangeUserPasswordDTO, CreateUserDTO, UserRDO } from '@project/shared/transfer-objects';

import { DESCRIPTIONS } from './authentication.constant';
import { AuthenticationService } from './authentication.service';
import { RequestWithUser } from './authentication.types';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UsersQuery } from './query/users.query';
import { LoggedUserRDO } from './rdo/logged-user.rdo';
import { SuccessRDO } from './rdo/success.rdo';

import { NotifyService } from '../notify/notify.service';


@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotifyService
  ) {
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: DESCRIPTIONS.REGISTER
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDTO) {
    const newUser = await this.authService.register(dto);

    await this.notifyService.registerSubscriber({ email: newUser.email, fullname: newUser.fullname });

    return fillDTO(UserRDO, newUser.toPOJO());
  }

  @ApiResponse({
    type: [UserRDO],
    status: HttpStatus.OK,
    description: DESCRIPTIONS.USERS
  })
  @Get('users')
  public async getMany(@Query() { ids }: UsersQuery) {
    const users = await this.authService.getUsers(ids);
    return users;

  }

  @ApiResponse({
    type: LoggedUserRDO,
    status: HttpStatus.OK,
    description: DESCRIPTIONS.LOGGED_SUCCESS
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: DESCRIPTIONS.WRONG_CREDS
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    if (!user) {
      throw new UnauthorizedException('Incorrect user');
    }
    const userToken = await this.authService.createUserToken(user);
    return fillDTO(LoggedUserRDO, { ...user.toPOJO(), ...userToken });
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: DESCRIPTIONS.REFRESHED
  })
  public async refreshToken(@Req() { user }: RequestWithUser) {
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return this.authService.createUserToken(user);
  }

  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.OK,
    description: DESCRIPTIONS.FOUND_USER
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);
    const pojo = existUser.toPOJO();
    return fillDTO(UserRDO, {
        ...pojo,
        subscribersCount: pojo.subscribersIds.length
      }
    );
  }

  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.OK,
    description: DESCRIPTIONS.CHECk
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: DESCRIPTIONS.UNAUTHORIZED
  })
  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }


  @ApiResponse({
    status: HttpStatus.OK,
    type: SuccessRDO,
    description: DESCRIPTIONS.SUCCESS_UPDATE_PASSWORD
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: DESCRIPTIONS.WRONG_CREDS
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: DESCRIPTIONS.NOT_FOUND_USER
  })
  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  public async changePassword(@Req() { user }: RequestWithUser, @Body() dto: ChangeUserPasswordDTO) {
    await this.authService.changePassword(user?.id, dto);
    return fillDTO(SuccessRDO, {
      success: true
    });
  }
}
