import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { fillDTO } from '@project/shared/helpers';
import {
  CreateTextPublicationDTO,
  TextPublicationRDO,
  UpdateTextPublicationDTO
} from '@project/shared/transfer-objects';

import { TextPublicationService } from './text-publication.service';

import { DESCRIPTIONS } from '../../../application.constant';

@ApiTags('Text')
@Controller('text')
export class TextPublicationController {
  constructor(
    private readonly textPublicationService: TextPublicationService
  ) {

  }

  @ApiOkResponse({ description: DESCRIPTIONS.SHOW })
  @Get('/:id')
  public async show(@Param('id') id: string) {
    const publication = await this.textPublicationService.findById(id);
    return fillDTO(TextPublicationRDO, publication);
  }

  @ApiCreatedResponse({ description: DESCRIPTIONS.CREATE })
  @Post('')
  public async create(@Body() dto: CreateTextPublicationDTO) {
    const publication = await this.textPublicationService.create(dto);
    return fillDTO(TextPublicationRDO, publication);
  }

  @ApiNoContentResponse({ description: DESCRIPTIONS.REMOVE })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string) {
    await this.textPublicationService.delete(id);
  }

  @ApiOkResponse({ description: DESCRIPTIONS.UPDATE })
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateTextPublicationDTO) {
    const publication = await this.textPublicationService.update(id, dto);
    return fillDTO(TextPublicationRDO, publication);
  }
}
