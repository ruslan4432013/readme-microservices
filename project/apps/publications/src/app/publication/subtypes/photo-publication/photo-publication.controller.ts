import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { fillDto } from "@project/shared/helpers";
import { PhotoPublicationService } from "./photo-publication.service";
import { PhotoPublicationRdo } from "./rdo";
import { CreatePhotoPublicationDto, UpdatePhotoPublicationDto } from "./dto";

@Controller('photo')
export class PhotoPublicationController {
  constructor(
    private readonly photoPublicationService: PhotoPublicationService
  ) {

  }

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const publication = await this.photoPublicationService.findById(id)
    return fillDto(PhotoPublicationRdo, publication)
  }

  @Post('')
  public async create(@Body() dto: CreatePhotoPublicationDto) {
    const publication = await this.photoPublicationService.create(dto)
    return fillDto(PhotoPublicationRdo, publication)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string) {
    await this.photoPublicationService.delete(id)
  }

  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePhotoPublicationDto) {
    const publication = await this.photoPublicationService.update(id, dto)
    return fillDto(PhotoPublicationRdo, publication)

  }
}
