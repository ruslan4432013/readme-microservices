import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { fillDto } from "@project/shared/helpers";
import { LinkPublicationService } from "./link-publication.service";
import { LinkPublicationRdo } from "./rdo";
import { CreateLinkPublicationDto, UpdateLinkPublicationDto } from "./dto";

@Controller('link')
export class LinkPublicationController {
  constructor(
    private readonly linkPublicationService: LinkPublicationService
  ) {

  }

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const publication = await this.linkPublicationService.findById(id)
    return fillDto(LinkPublicationRdo, publication)
  }

  @Post('')
  public async create(@Body() dto: CreateLinkPublicationDto) {
    const publication = await this.linkPublicationService.create(dto)
    return fillDto(LinkPublicationRdo, publication)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string) {
    await this.linkPublicationService.delete(id)
  }

  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateLinkPublicationDto) {
    const publication = await this.linkPublicationService.update(id, dto)
    return fillDto(LinkPublicationRdo, publication)

  }
}
