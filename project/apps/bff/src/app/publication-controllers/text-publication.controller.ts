import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Delete, Get, HttpCode, HttpStatus,
  Inject,
  Param,
  Patch,
  Post, Req, UnauthorizedException,
  UseFilters,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { RequestWithTokenPayload } from '@project/shared/app/types';
import { applicationConfig } from '@project/shared/config/bff';
import { AxiosExceptionFilter } from '@project/shared/core';
import {
  CreateTextPublicationDTO,
  TextPublicationRDO, UpdateTextPublicationDTO
} from '@project/shared/transfer-objects';

import { DESCRIPTIONS, PUBLICATION_ERROR_MESSAGES } from '../application.constant';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { UserIdInterceptor } from '../interceptors/user-id-interceptor.service';


const POSTFIX = 'text';

@ApiTags('Text publications')
@Controller(`publications/${POSTFIX}`)
@UseFilters(AxiosExceptionFilter)
export class TextPublicationController {
  constructor(
    private readonly httpService: HttpService,
    @Inject(applicationConfig.KEY) private readonly appConfig: ConfigType<typeof applicationConfig>
  ) {
  }

  @ApiCreatedResponse({ description: DESCRIPTIONS.CREATE })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('')
  public async create(@Body() dto: CreateTextPublicationDTO) {
    const { data } = await this.httpService.axiosRef.post(`${this.appConfig.url.publications}/${POSTFIX}`, dto);
    return data;
  }

  @ApiOkResponse({ description: DESCRIPTIONS.UPDATE })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdateTextPublicationDTO) {
    const { data } = await this.httpService.axiosRef.patch(`${this.appConfig.url.publications}/${POSTFIX}/${id}`, dto);
    return data;
  }

  @ApiNoContentResponse({ description: DESCRIPTIONS.REMOVE })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async remove(@Param('id') id: string, @Req() { user }: RequestWithTokenPayload) {
    const { data } = await this.httpService.axiosRef.get<TextPublicationRDO>(`${this.appConfig.url.publications}/${POSTFIX}/${id}`);
    if (data.currentOwnerId !== user?.id) {
      throw new UnauthorizedException(PUBLICATION_ERROR_MESSAGES.NOT_OWNER);
    }
    await this.httpService.axiosRef.delete(`${this.appConfig.url.publications}/${POSTFIX}/${id}`);
  }

  @ApiOkResponse({ description: DESCRIPTIONS.SHOW })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get<TextPublicationRDO>(`${this.appConfig.url.publications}/${POSTFIX}/${id}`);
    return data;
  }
}
