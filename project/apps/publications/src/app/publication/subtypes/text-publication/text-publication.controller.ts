import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { fillDTO } from "@project/shared/helpers";
import { TextPublicationService } from "./text-publication.service";
import { TextPublicationRdo } from "./rdo";
import { CreateTextPublicationDTO, UpdateTextPublicationDTO } from "./dto";

@Controller('text')
export class TextPublicationController {
  constructor(
    private readonly textPublicationService: TextPublicationService
  ) {

  }

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const publication = await this.textPublicationService.findById(id)
    return fillDTO(TextPublicationRdo, publication)
  }

  @Post('')
  public async create(@Body() dto: CreateTextPublicationDTO) {
    const publication = await this.textPublicationService.create(dto)
    return fillDTO(TextPublicationRdo, publication)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string) {
    await this.textPublicationService.delete(id)
  }

  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateTextPublicationDTO) {
    const publication = await this.textPublicationService.update(id, dto)
    return fillDTO(TextPublicationRdo, publication)
  }
}
