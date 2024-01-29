import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post, Req,
  UseFilters,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { RequestWithTokenPayload } from '@project/shared/app/types';
import { applicationConfig } from '@project/shared/config/bff';
import { AxiosExceptionFilter } from '@project/shared/core';
import { USER_ID_HEADER } from '@project/shared/core';
import {
  LinkPublicationRDO, PhotoPublicationRDO,
  PublicationWithPaginationRDO, QuotePublicationRDO,
  RepostPublicationDTO, TextPublicationRDO,
  UpdateBasePublicationDTO, UserRDO, VideoPublicationRDO
} from '@project/shared/transfer-objects';

import { DESCRIPTIONS, MANY_PUBLICATION, QUERY_OPTIONS } from '../application.constant';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { UserIdInterceptor } from '../interceptors/user-id-interceptor.service';


@ApiExtraModels(QuotePublicationRDO)
@ApiExtraModels(LinkPublicationRDO)
@ApiExtraModels(TextPublicationRDO)
@ApiExtraModels(PhotoPublicationRDO)
@ApiExtraModels(VideoPublicationRDO)
@ApiTags('Publications')
@Controller('publications')
@UseFilters(AxiosExceptionFilter)
export class BasePublicationsController {
  constructor(
    private readonly httpService: HttpService,
    @Inject(applicationConfig.KEY) private readonly appConfig: ConfigType<typeof applicationConfig>
  ) {
  }


  @ApiQuery(QUERY_OPTIONS.FIND)
  @ApiOkResponse(MANY_PUBLICATION(DESCRIPTIONS.FIND_PUBLICATIONS))
  @Get('/find')
  public async search(@Req() { url }: Request) {
    const [, query] = url.split('?');
    const { data } = await this.httpService.axiosRef.get(`${this.appConfig.url.publications}/find?${query}`);
    return data;
  }

  @ApiQuery(QUERY_OPTIONS.SKIP)
  @ApiQuery(QUERY_OPTIONS.SORT)
  @ApiQuery(QUERY_OPTIONS.TAGS)
  @ApiQuery(QUERY_OPTIONS.TYPE)
  @ApiQuery(QUERY_OPTIONS.LIMIT)
  @ApiOkResponse(MANY_PUBLICATION(DESCRIPTIONS.FIND_PUBLICATIONS))
  @Get()
  public async index(@Req() request: Request) {
    const [, query] = request.url.split('?');
    const { data } = await this.httpService.axiosRef.get<PublicationWithPaginationRDO>(`${this.appConfig.url.publications}?${query}`);
    const ids = data.entities.map((el) => el.currentOwnerId);
    const users = await this.getUsers(ids);
    const result = {
      ...data,
      entities: data.entities.map(el => ({
        ...el,
        user: users[el.currentOwnerId]
      }))

    };
    return result;
  }

  @ApiQuery(QUERY_OPTIONS.SKIP)
  @ApiQuery(QUERY_OPTIONS.SORT)
  @ApiQuery(QUERY_OPTIONS.TAGS)
  @ApiQuery(QUERY_OPTIONS.TYPE)
  @ApiQuery(QUERY_OPTIONS.LIMIT)
  @UseGuards(CheckAuthGuard)
  @ApiOkResponse(MANY_PUBLICATION(DESCRIPTIONS.USERS_PUBLICATIONS))
  @Get('/user')
  public async my(@Req() { user, url }: RequestWithTokenPayload) {
    const [, query] = url.split('?');
    const { data } = await this.httpService.axiosRef.get(`${this.appConfig.url.publications}/user?${query}`, {
      headers: {
        [USER_ID_HEADER]: user?.id
      }
    });

    return data;
  }


  @ApiCreatedResponse({ description: DESCRIPTIONS.UPDATE })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateBasePublicationDTO) {
    const { data } = await this.httpService.axiosRef.patch(`${this.appConfig.url.publications}/${id}`, dto);
    return data;
  }

  @ApiOkResponse({ description: DESCRIPTIONS.REPOST })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('/repost/:id')
  public async repost(@Param('id') id: string, @Body() dto: RepostPublicationDTO) {
    const { data } = await this.httpService.axiosRef.post(`${this.appConfig.url.publications}/repost/${id}`, dto);
    return data;
  }

  @ApiOkResponse({ description: DESCRIPTIONS.SHOW })
  @Get('/:id')
  public async show(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${this.appConfig.url.publications}/${id}`);
    return data;
  }


  private async getUsers(ids: string[]) {
    const query = ids.map(id => `ids[]=${id}`).join('&');
    const res = await this.httpService.axiosRef.get<(UserRDO | string)[]>(`${this.appConfig.url.account}/users?${query}`);

    return res.data.reduce((acc: Record<string, UserRDO | string>, curr) => {
      if (typeof curr === 'string') {
        acc[curr] = curr;
        return acc;
      }

      acc[curr.id] = curr;
      return acc;
    }, {});
  }
}
