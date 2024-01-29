import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";

import { fillDTO } from "@project/shared/helpers";

import { CreateTagDTO } from "./dto/create-tag.dto";
import { UpdateTagDTO } from "./dto/update-tag.dto";
import { PublicationTagService } from "./publication-tag.service";
import { TagRdo } from "./rdo/publication-tag.rdo";

@Controller('tags')
export class PublicationTagController {
  constructor(
    private readonly publicationTagService: PublicationTagService
  ) {
  }

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const tag = this.publicationTagService.getTag(id);
    return fillDTO(TagRdo, tag)
  }

  @Get('/')
  public async index() {
    const publicationTagEntities = await this.publicationTagService.getAllTags();
    const tags = publicationTagEntities.map((blogCategory) => blogCategory.toPOJO());
    return fillDTO(TagRdo, tags);
  }

  @Post('/')
  public async create(@Body() dto: CreateTagDTO) {
    const newTag = await this.publicationTagService.createTag(dto);
    return fillDTO(TagRdo, newTag.toPOJO());
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id') id: string) {
    await this.publicationTagService.deleteTag(id);
  }

  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateTagDTO) {
    const updatedCategory = await this.publicationTagService.updateTag(id, dto);
    return fillDTO(TagRdo, updatedCategory.toPOJO());
  }
}
