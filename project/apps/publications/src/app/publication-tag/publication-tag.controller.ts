import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { PublicationTagService } from "./publication-tag.service";
import { fillDto } from "@project/shared/helpers";
import { TagRdo } from "./rdo/publication-tag.rdo";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";

@Controller('tags')
export class PublicationTagController {
  constructor(
    private readonly publicationTagService: PublicationTagService
  ) {
  }

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const tag = this.publicationTagService.getTag(id);
    return fillDto(TagRdo, tag)
  }

  @Get('/')
  public async index() {
    const publicationTagEntities = await this.publicationTagService.getAllTags();
    const tags = publicationTagEntities.map((blogCategory) => blogCategory.toPOJO());
    return fillDto(TagRdo, tags);
  }

  @Post('/')
  public async create(@Body() dto: CreateTagDto) {
    const newTag = await this.publicationTagService.createTag(dto);
    return fillDto(TagRdo, newTag.toPOJO());
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id') id: string) {
    await this.publicationTagService.deleteTag(id);
  }

  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateTagDto) {
    const updatedCategory = await this.publicationTagService.updateTag(id, dto);
    return fillDto(TagRdo, updatedCategory.toPOJO());
  }
}
