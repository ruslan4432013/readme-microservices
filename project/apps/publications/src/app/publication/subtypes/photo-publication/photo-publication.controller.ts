import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { fillDTO } from '@project/shared/helpers';
import {
  CreatePhotoPublicationDTO,
  PhotoPublicationRDO,
  UpdatePhotoPublicationDTO
} from '@project/shared/transfer-objects';

import { PhotoPublicationService } from './photo-publication.service';

import { DESCRIPTIONS } from '../../../application.constant';


@ApiTags('Photo')
@Controller('photo')
export class PhotoPublicationController {
  constructor(
    private readonly photoPublicationService: PhotoPublicationService
  ) {

  }

  @ApiOkResponse({ description: DESCRIPTIONS.SHOW })
  @Get('/:id')
  public async show(@Param('id') id: string) {
    const publication = await this.photoPublicationService.findById(id);
    return fillDTO(PhotoPublicationRDO, publication);
  }

  @ApiCreatedResponse({ description: DESCRIPTIONS.CREATE })
  @Post('')
  public async create(@Body() dto: CreatePhotoPublicationDTO) {
    const publication = await this.photoPublicationService.create(dto);
    return fillDTO(PhotoPublicationRDO, publication);
  }

  @ApiNoContentResponse({ description: DESCRIPTIONS.REMOVE })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string) {
    await this.photoPublicationService.delete(id);
  }

  @ApiOkResponse({ description: DESCRIPTIONS.UPDATE })
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePhotoPublicationDTO) {
    const publication = await this.photoPublicationService.update(id, dto);
    return fillDTO(PhotoPublicationRDO, publication);

  }
}
