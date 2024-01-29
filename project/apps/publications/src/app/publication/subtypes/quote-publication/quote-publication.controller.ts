import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { fillDTO } from '@project/shared/helpers';
import {
  CreateQuotePublicationDTO,
  QuotePublicationRDO,
  UpdateQuotePublicationDTO
} from '@project/shared/transfer-objects';

import { QuotePublicationService } from './quote-publication.service';

import { DESCRIPTIONS } from '../../../application.constant';


@ApiTags('Quote')
@Controller('quote')
export class QuotePublicationController {
  constructor(
    private readonly quotePublicationService: QuotePublicationService
  ) {

  }

  @ApiOkResponse({ description: DESCRIPTIONS.SHOW })
  @Get('/:id')
  public async show(@Param('id') id: string) {
    const publication = await this.quotePublicationService.findById(id);
    return fillDTO(QuotePublicationRDO, publication);
  }

  @ApiCreatedResponse({ description: DESCRIPTIONS.CREATE })
  @Post('')
  public async create(@Body() dto: CreateQuotePublicationDTO) {
    const publication = await this.quotePublicationService.create(dto);
    return fillDTO(QuotePublicationRDO, publication);
  }

  @ApiNoContentResponse({ description: DESCRIPTIONS.REMOVE })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string) {
    await this.quotePublicationService.delete(id);
  }

  @ApiOkResponse({ description: DESCRIPTIONS.UPDATE })
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateQuotePublicationDTO) {
    const publication = await this.quotePublicationService.update(id, dto);
    return fillDTO(QuotePublicationRDO, publication);
  }
}
