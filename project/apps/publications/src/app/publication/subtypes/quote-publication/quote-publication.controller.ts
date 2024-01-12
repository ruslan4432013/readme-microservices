import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { fillDto } from "@project/shared/helpers";
import { QuotePublicationService } from "./quote-publication.service";
import { QuotePublicationRdo } from "./rdo";
import { CreateQuotePublicationDto, UpdateQuotePublicationDto } from "./dto";

@Controller('quote')
export class QuotePublicationController {
  constructor(
    private readonly quotePublicationService: QuotePublicationService
  ) {

  }

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const publication = await this.quotePublicationService.findById(id)
    return fillDto(QuotePublicationRdo, publication)
  }

  @Post('')
  public async create(@Body() dto: CreateQuotePublicationDto) {
    const publication = await this.quotePublicationService.create(dto)
    return fillDto(QuotePublicationRdo, publication)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string) {
    await this.quotePublicationService.delete(id)
  }

  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateQuotePublicationDto) {
    const publication = await this.quotePublicationService.update(id, dto)
    return fillDto(QuotePublicationRdo, publication)
  }
}
