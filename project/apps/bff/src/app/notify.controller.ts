import { HttpService } from '@nestjs/axios';
import {
  Controller,
  Inject,
  Post, Req, UnauthorizedException,
  UseFilters,
  UseGuards, UseInterceptors
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

import { RequestWithTokenPayload } from '@project/shared/app/types';
import { applicationConfig } from '@project/shared/config/bff';
import { AxiosExceptionFilter } from '@project/shared/core';

import { PUBLICATION_ERROR_MESSAGES } from './application.constant';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UserIdInterceptor } from './interceptors/user-id-interceptor.service';


@ApiTags('notify')
@Controller('notify')
@UseFilters(AxiosExceptionFilter)
export class NotifyController {
  constructor(
    private readonly httpService: HttpService,
    @Inject(applicationConfig.KEY) private readonly appConfig: ConfigType<typeof applicationConfig>
  ) {
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post()
  public async notify(@Req() { user }: RequestWithTokenPayload) {
    if (!user) {
      throw new UnauthorizedException(PUBLICATION_ERROR_MESSAGES.WRONG_USER);
    }
    const { data } = await this.httpService.axiosRef.post(`${this.appConfig.url.notify}`, {
      email: user.email,
      userId: user.id!
    });
    return data;
  }

}
