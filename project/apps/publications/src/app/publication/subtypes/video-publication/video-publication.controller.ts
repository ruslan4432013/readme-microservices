import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { fillDTO } from '@project/shared/helpers';
import {
  CreateVideoPublicationDTO,
  UpdateVideoPublicationDTO,
  VideoPublicationRDO
} from '@project/shared/transfer-objects';

import { VideoPublicationService } from './video-publication.service';

import { DESCRIPTIONS } from '../../../application.constant';


@ApiTags('Video')
@Controller('video')
export class VideoPublicationController {
  constructor(
    private readonly videoPublicationService: VideoPublicationService
  ) {

  }

  @ApiOkResponse({ description: DESCRIPTIONS.SHOW })
  @Get('/:id')
  public async show(@Param('id') id: string) {
    const publication = await this.videoPublicationService.findById(id);
    return fillDTO(VideoPublicationRDO, publication);
  }

  @ApiCreatedResponse({ description: DESCRIPTIONS.CREATE })
  @Post('')
  public async create(@Body() dto: CreateVideoPublicationDTO) {
    const publication = await this.videoPublicationService.create(dto);
    return fillDTO(VideoPublicationRDO, publication);
  }

  @ApiNoContentResponse({ description: DESCRIPTIONS.REMOVE })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string) {
    await this.videoPublicationService.delete(id);
  }

  @ApiOkResponse({ description: DESCRIPTIONS.UPDATE })
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateVideoPublicationDTO) {
    const document = await this.videoPublicationService.update(id, dto);
    return fillDTO(VideoPublicationRDO, document);
  }
}
