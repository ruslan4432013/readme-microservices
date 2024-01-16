import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { fillDto } from "@project/shared/helpers";
import { TextPublicationService } from "./text-publication.service";
import { TextPublicationRdo } from "./rdo";
import { CreateTextPublicationDto, UpdateTextPublicationDto } from "./dto";

@Controller('text')
export class TextPublicationController {
  constructor(
    private readonly textPublicationService: TextPublicationService
  ) {

  }

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const publication = await this.textPublicationService.findById(id)
    return fillDto(TextPublicationRdo, publication)
  }

  @Post('')
  public async create(@Body() dto: CreateTextPublicationDto) {
    const publication = await this.textPublicationService.create(dto)
    return fillDto(TextPublicationRdo, publication)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string) {
    await this.textPublicationService.delete(id)
  }

  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateTextPublicationDto) {
    const publication = await this.textPublicationService.update(id, dto)
    return fillDto(TextPublicationRdo, publication)
  }
}
