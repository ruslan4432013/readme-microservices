import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { fillDto } from "@project/shared/helpers";
import { VideoPublicationService } from "./video-publication.service";
import { VideoPublicationRdo } from "./rdo";
import { CreateVideoPublicationDto, UpdateVideoPublicationDto } from "./dto";

@Controller('video')
export class VideoPublicationController {
  constructor(
    private readonly videoPublicationService: VideoPublicationService
  ) {

  }

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const publication = await this.videoPublicationService.findById(id)
    return fillDto(VideoPublicationRdo, publication)
  }

  @Post('')
  public async create(@Body() dto: CreateVideoPublicationDto) {
    const publication = await this.videoPublicationService.create(dto)
    return fillDto(VideoPublicationRdo, publication)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string) {
    await this.videoPublicationService.delete(id)
  }

  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateVideoPublicationDto) {
    const document = await this.videoPublicationService.update(id, dto)
    return fillDto(VideoPublicationRdo, document)
  }
}
