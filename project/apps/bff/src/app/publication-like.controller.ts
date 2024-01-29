import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller, HttpCode, HttpStatus,
  Inject,
  Post,
  UseFilters,
  UseGuards, UseInterceptors
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ApiCreatedResponse, ApiNoContentResponse, ApiTags } from '@nestjs/swagger';

import { applicationConfig } from '@project/shared/config/bff';
import { AxiosExceptionFilter } from '@project/shared/core';
import { LikeDTO } from '@project/shared/transfer-objects';

import { DESCRIPTIONS } from './application.constant';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UserIdInterceptor } from './interceptors/user-id-interceptor.service';

@ApiTags('likes')
@Controller('likes-publication')
@UseFilters(AxiosExceptionFilter)
export class PublicationLikeController {
  constructor(
    private readonly httpService: HttpService,
    @Inject(applicationConfig.KEY) private readonly appConfig: ConfigType<typeof applicationConfig>
  ) {
  }

  @ApiCreatedResponse({ description: DESCRIPTIONS.LIKES.LIKE })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('like')
  public async like(@Body() dto: LikeDTO) {
    const { data } = await this.httpService.axiosRef.post(`${this.appConfig.url.publications}/like`, dto);
    return data;
  }

  @ApiNoContentResponse({ description: DESCRIPTIONS.LIKES.DISLIKE })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('dislike')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async dislike(@Body() dto: LikeDTO) {
    const { data } = await this.httpService.axiosRef.post(`${this.appConfig.url.publications}/dislike`, dto);
    return data;
  }
}
