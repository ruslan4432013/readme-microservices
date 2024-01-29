import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller, Delete, Get, HttpCode, HttpStatus,
  Inject, Param, Post, Req,
  UseFilters, UseGuards, UseInterceptors
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { RequestWithTokenPayload } from '@project/shared/app/types';
import { applicationConfig } from '@project/shared/config/bff';
import { AxiosExceptionFilter } from '@project/shared/core';
import { USER_ID_HEADER } from '@project/shared/core';
import { CreateCommentDTO } from '@project/shared/transfer-objects';

import { DESCRIPTIONS } from './application.constant';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UserIdInterceptor } from './interceptors/user-id-interceptor.service';


@ApiTags('comments')
@Controller('publications/:publicationId/comments')
@UseFilters(AxiosExceptionFilter)
export class PublicationCommentsController {
  constructor(
    private readonly httpService: HttpService,
    @Inject(applicationConfig.KEY) private readonly appConfig: ConfigType<typeof applicationConfig>
  ) {
  }

  private getCommentUrl(publicationId: string) {
    return `${this.appConfig.url.publications}/${publicationId}/comments`;
  }

  @ApiCreatedResponse({ description: DESCRIPTIONS.COMMENTS.CREATE })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post()
  public async create(@Param('publicationId') publicationId: string, @Body() dto: CreateCommentDTO) {
    const { data } = await this.httpService.axiosRef.post(this.getCommentUrl(publicationId), dto);
    return data;
  }

  @ApiNoContentResponse({ description: DESCRIPTIONS.COMMENTS.REMOVE })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Delete('/:commentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove(
    @Param('publicationId') publicationId: string,
    @Param('commentId') commentId: string,
    @Req() { user }: RequestWithTokenPayload
  ) {
    const { data } = await this.httpService.axiosRef.delete(`${this.getCommentUrl(publicationId)}/${commentId}`, {
      headers: {
        [USER_ID_HEADER]: user?.id
      }
    });
    return data;
  }

  @ApiOkResponse({ description: DESCRIPTIONS.COMMENTS.SHOW })
  @Get()
  public async index(@Param('publicationId') publicationId: string, @Req() { url }: RequestWithTokenPayload) {
    const [, query] = url.split('?');
    const { data } = await this.httpService.axiosRef.get(`${this.getCommentUrl(publicationId)}?${query}`);
    return data;
  }
}
