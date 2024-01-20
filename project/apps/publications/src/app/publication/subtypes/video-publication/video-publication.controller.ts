import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { fillDTO } from "@project/shared/helpers";
import { VideoPublicationService } from "./video-publication.service";
import { VideoPublicationRdo } from "./rdo";
import { CreateVideoPublicationDTO, UpdateVideoPublicationDTO } from "./dto";

@Controller('video')
export class VideoPublicationController {
  constructor(
    private readonly videoPublicationService: VideoPublicationService
  ) {

  }

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const publication = await this.videoPublicationService.findById(id)
    return fillDTO(VideoPublicationRdo, publication)
  }

  @Post('')
  public async create(@Body() dto: CreateVideoPublicationDTO) {
    const publication = await this.videoPublicationService.create(dto)
    return fillDTO(VideoPublicationRdo, publication)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string) {
    await this.videoPublicationService.delete(id)
  }

  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateVideoPublicationDTO) {
    const document = await this.videoPublicationService.update(id, dto)
    return fillDTO(VideoPublicationRdo, document)
  }
}
