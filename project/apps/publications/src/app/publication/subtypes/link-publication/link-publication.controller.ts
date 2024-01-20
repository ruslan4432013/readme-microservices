import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { fillDTO } from "@project/shared/helpers";
import { LinkPublicationService } from "./link-publication.service";
import { LinkPublicationRdo } from "./rdo";
import { CreateLinkPublicationDTO, UpdateLinkPublicationDTO } from "./dto";

@Controller('link')
export class LinkPublicationController {
  constructor(
    private readonly linkPublicationService: LinkPublicationService
  ) {

  }

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const publication = await this.linkPublicationService.findById(id)
    return fillDTO(LinkPublicationRdo, publication)
  }

  @Post('')
  public async create(@Body() dto: CreateLinkPublicationDTO) {
    const publication = await this.linkPublicationService.create(dto)
    return fillDTO(LinkPublicationRdo, publication)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string) {
    await this.linkPublicationService.delete(id)
  }

  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateLinkPublicationDTO) {
    const publication = await this.linkPublicationService.update(id, dto)
    return fillDTO(LinkPublicationRdo, publication)

  }
}
