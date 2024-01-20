import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { fillDTO } from "@project/shared/helpers";
import { QuotePublicationService } from "./quote-publication.service";
import { QuotePublicationRdo } from "./rdo";
import { CreateQuotePublicationDTO, UpdateQuotePublicationDTO } from "./dto";

@Controller('quote')
export class QuotePublicationController {
  constructor(
    private readonly quotePublicationService: QuotePublicationService
  ) {

  }

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const publication = await this.quotePublicationService.findById(id)
    return fillDTO(QuotePublicationRdo, publication)
  }

  @Post('')
  public async create(@Body() dto: CreateQuotePublicationDTO) {
    const publication = await this.quotePublicationService.create(dto)
    return fillDTO(QuotePublicationRdo, publication)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string) {
    await this.quotePublicationService.delete(id)
  }

  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateQuotePublicationDTO) {
    const publication = await this.quotePublicationService.update(id, dto)
    return fillDTO(QuotePublicationRdo, publication)
  }
}
