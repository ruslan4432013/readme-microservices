import { Body, Controller, Get, Inject, Post, Req, UseFilters } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { LoginUserDTO } from './dto/login-user-dto';
import { ConfigType } from '@nestjs/config';
import { Request } from 'express';

import { applicationConfig } from '@project/shared/config/bff';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';

@Controller('accounts')
@UseFilters(AxiosExceptionFilter)
export class AccountsController {
  constructor(
    private readonly httpService: HttpService,
    @Inject(applicationConfig.KEY) private readonly appConfig: ConfigType<typeof applicationConfig>
  ) {
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDTO) {
    const { data } = await this.httpService.axiosRef.post(`${this.appConfig.url.account}/login`, loginUserDto);
    return data;
  }

  @Get('refresh')
  public async refreshToken(@Req() request: Request) {
    const { data } = await this.httpService.axiosRef.get(`${this.appConfig.url.account}/refresh`, {
      headers: {
        'Authorization': request.headers['authorization']
      }
    });

    return data;
  }
}
