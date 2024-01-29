import { HttpService } from '@nestjs/axios';
import {
  Body,
  ConflictException,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Inject,
  Param,
  Post,
  Req, UseFilters, UseGuards
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { applicationConfig } from '@project/shared/config/bff';
import { AxiosExceptionFilter, MongoIdValidationPipe } from '@project/shared/core';
import { fillDTO } from '@project/shared/helpers';
import { ChangeUserPasswordDTO, CreateUserDTO, TokensRDO, UserRDO } from '@project/shared/transfer-objects';

import { DESCRIPTIONS, ERROR_MESSAGES } from './application.constant';
import { LoginUserDTO } from './dto/login-user-dto';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UserDetailRDO } from './rdo/user-detail.rdo';


@ApiTags('Accounts')
@Controller('accounts')
@UseFilters(AxiosExceptionFilter)
export class AccountsController {
  constructor(
    private readonly httpService: HttpService,
    @Inject(applicationConfig.KEY) private readonly appConfig: ConfigType<typeof applicationConfig>
  ) {
  }

  @ApiCreatedResponse({ description: DESCRIPTIONS.ACCOUNT.REGISTER })
  @Post('register')
  public async register(@Body() dto: CreateUserDTO, @Headers('authorization') auth: string) {
    if (auth) {
      throw new ConflictException({
        code: HttpStatus.CONFLICT,
        message: ERROR_MESSAGES.LOGGED.MESSAGE,
        details: ERROR_MESSAGES.LOGGED.DETAILS
      });
    }

    const { data } = await this.httpService.axiosRef.post(`${this.appConfig.url.account}/register`, dto);
    return data;
  }

  @ApiOkResponse({ description: DESCRIPTIONS.ACCOUNT.LOGIN })
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDTO) {
    const { data } = await this.httpService.axiosRef.post(`${this.appConfig.url.account}/login`, loginUserDto);
    return data;
  }

  @ApiOkResponse({
    description: DESCRIPTIONS.ACCOUNT.REFRESH_TOKENS,
    type: TokensRDO
  })
  @Get('refresh')
  public async refreshToken(@Req() request: Request) {
    const { data } = await this.httpService.axiosRef.get(`${this.appConfig.url.account}/refresh`, {
      headers: {
        'Authorization': request.headers['authorization']
      }
    });

    return data;
  }

  @ApiOkResponse({
    description: DESCRIPTIONS.ACCOUNT.CHANGE_PASSWORD,
    type: TokensRDO
  })
  @UseGuards(CheckAuthGuard)
  @Post('change-password')
  public async changePassword(@Body() dto: ChangeUserPasswordDTO, @Req() request: Request) {
    const { data } = await this.httpService.axiosRef.post(`${this.appConfig.url.account}/change-password`, dto, {
      headers: {
        'Authorization': request.headers['authorization']
      }
    });
    return data;
  }

  @ApiOkResponse({
    description: DESCRIPTIONS.ACCOUNT.SHOW_USER_DETAIL,
    type: UserDetailRDO
  })
  @UseGuards(CheckAuthGuard)
  @Get(':id')
  public async show(@Req() request: Request, @Param('id', MongoIdValidationPipe) id: string) {
    const config = {
      headers: {
        'Authorization': request.headers['authorization']
      }
    };

    const [userResult, publicationResult] = await Promise.all([
      this.httpService.axiosRef.get<UserRDO>(`${this.appConfig.url.account}/${id}`, config),
      this.httpService.axiosRef.get(`${this.appConfig.url.publications}/count/${id}`, config)
    ]);

    const [firstname, lastname] = userResult.data.fullname.split(' ');

    const plain: UserDetailRDO = {
      ...userResult.data,
      firstname,
      lastname,
      count: {
        publications: publicationResult.data.count,
        subscribers: userResult.data.subscribersCount
      }
    };

    return fillDTO(UserDetailRDO, plain);
  }
}
