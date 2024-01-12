import { Injectable, NotFoundException } from "@nestjs/common";
import { PublicationTagRepository } from "./publication-tag.repository";
import { PublicationTagEntity } from "./publication-tag.entity";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { CreateTagsDto } from "./dto/create-tags.dto";

@Injectable()
export class PublicationTagService {
  constructor(
    private readonly publicationTagRepository: PublicationTagRepository
  ) {
  }

  public async getTag(id: string): Promise<PublicationTagEntity | null> {
    return this.publicationTagRepository.findById(id)
  }

  public async getAllTags(): Promise<PublicationTagEntity[]> {
    return this.publicationTagRepository.find()
  }

  public async createTag(dto: CreateTagDto): Promise<PublicationTagEntity> {
    const tagTitle = dto.title.toLowerCase()
    const document = (await this.publicationTagRepository.find({ title: tagTitle })).at(0)
    if (document) {
      return document
    }
    const newTag = new PublicationTagEntity({ ...dto, title: tagTitle })
    await this.publicationTagRepository.save(newTag)
    return newTag
  }

  public async createTags(dto: CreateTagsDto): Promise<PublicationTagEntity[]> {
    const tagTitles = [...new Set(dto.titles.map((title) => title.toLowerCase()))]
    const documents = await Promise.all(tagTitles.map(async (title) => await this.createTag({ title })))
    return documents
  }

  public async deleteTag(id: string) {
    try {
      await this.publicationTagRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }
  }

  public async updateTag(id: string, dto: UpdateTagDto): Promise<PublicationTagEntity> {
    const tagTitle = dto.title.toLowerCase()
    const publicationTagEntity = new PublicationTagEntity({ ...dto, title: tagTitle.toLowerCase() });

    try {
      return this.publicationTagRepository.update(id, publicationTagEntity);
    } catch {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }
}
