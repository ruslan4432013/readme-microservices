import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { fillDTO } from "@project/shared/helpers";
import { PhotoPublicationService } from "./photo-publication.service";
import { PhotoPublicationRdo } from "./rdo";
import { CreatePhotoPublicationDTO, UpdatePhotoPublicationDTO } from "./dto";

@Controller('photo')
export class PhotoPublicationController {
  constructor(
    private readonly photoPublicationService: PhotoPublicationService
  ) {

  }

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const publication = await this.photoPublicationService.findById(id)
    return fillDTO(PhotoPublicationRdo, publication)
  }

  @Post('')
  public async create(@Body() dto: CreatePhotoPublicationDTO) {
    const publication = await this.photoPublicationService.create(dto)
    return fillDTO(PhotoPublicationRdo, publication)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string) {
    await this.photoPublicationService.delete(id)
  }

  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePhotoPublicationDTO) {
    const publication = await this.photoPublicationService.update(id, dto)
    return fillDTO(PhotoPublicationRdo, publication)

  }
}
