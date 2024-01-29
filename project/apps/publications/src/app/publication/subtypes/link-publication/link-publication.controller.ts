import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { fillDTO } from '@project/shared/helpers';
import {
  CreateLinkPublicationDTO,
  LinkPublicationRDO,
  UpdateLinkPublicationDTO
} from '@project/shared/transfer-objects';

import { LinkPublicationService } from './link-publication.service';

import { DESCRIPTIONS } from '../../../application.constant';


@ApiTags('Link')
@Controller('link')
export class LinkPublicationController {
  constructor(
    private readonly linkPublicationService: LinkPublicationService
  ) {

  }


  @ApiOkResponse({ description: DESCRIPTIONS.SHOW })
  @Get('/:id')
  public async show(@Param('id') id: string) {
    const publication = await this.linkPublicationService.findById(id);
    return fillDTO(LinkPublicationRDO, publication);
  }

  @ApiCreatedResponse({ description: DESCRIPTIONS.CREATE })
  @Post('')
  public async create(@Body() dto: CreateLinkPublicationDTO) {
    const publication = await this.linkPublicationService.create(dto);
    return fillDTO(LinkPublicationRDO, publication);
  }


  @ApiNoContentResponse({ description: DESCRIPTIONS.REMOVE })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string) {
    await this.linkPublicationService.delete(id);
  }


  @ApiOkResponse({ description: DESCRIPTIONS.UPDATE })
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateLinkPublicationDTO) {
    const publication = await this.linkPublicationService.update(id, dto);
    return fillDTO(LinkPublicationRDO, publication);

  }
}
