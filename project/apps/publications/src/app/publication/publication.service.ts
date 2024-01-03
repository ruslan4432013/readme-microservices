import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateVideoPublicationDto,
  UpdateVideoPublicationDto,
} from './dto/video-publication';
import { PublicationRepository } from './publication.repository';
import {
  LinkPublication,
  PhotoPublication,
  Publication,
  PublicationStatus,
  PublicationType,
  QuotePublication,
  TextPublication,
  VideoPublication,
} from '@project/shared/app/types';
import { randomUUID } from 'node:crypto';
import { DefaultPublicationOptions } from './publication.type';
import {
  CreateLinkPublicationDto,
  UpdateLinkPublicationDto,
} from './dto/link-publication';
import {
  CreatePhotoPublicationDto,
  UpdatePhotoPublicationDto,
} from './dto/photo-publication';
import {
  CreateQuotePublicationDto,
  UpdateQuotePublicationDto,
} from './dto/quote-publication';
import {
  CreateTextPublicationDto,
  UpdateTextPublicationDto,
} from './dto/text-publication';

@Injectable()
export class PublicationService {
  constructor(
    private readonly publicationsRepository: PublicationRepository
  ) {}

  public async createVideoPublication(dto: CreateVideoPublicationDto) {
    const defaultPublication = this.getDefaultFieldsOfPublication({
      ownerId: dto.ownerId,
    });
    const videoPublication: VideoPublication = {
      ...defaultPublication,
      type: PublicationType.Video,
      name: dto.name,
      link: dto.link,
      tags: dto.tags,
    };

    return await this.publicationsRepository.save(videoPublication);
  }

  public async updateVideoPublication(
    id: string,
    dto: UpdateVideoPublicationDto
  ) {
    const oldVideoPublication = await this.publicationsRepository.findById(id);
    if (oldVideoPublication.type !== PublicationType.Video) {
      throw new BadRequestException('Incorrect type of publication');
    }
    const newVideoPublication = {
      ...oldVideoPublication,
      ...dto,
    };
    return await this.publicationsRepository.update(id, newVideoPublication);
  }

  public async createLinkPublication(dto: CreateLinkPublicationDto) {
    const defaultPublication = this.getDefaultFieldsOfPublication({
      ownerId: dto.ownerId,
    });
    const linkPublication: LinkPublication = {
      ...defaultPublication,
      type: PublicationType.Link,
      url: dto.link,
      description: dto.description,
      tags: dto.tags,
    };

    return await this.publicationsRepository.save(linkPublication);
  }

  public async updateLinkPublication(
    id: string,
    dto: UpdateLinkPublicationDto
  ) {
    const oldLinkPublication = await this.publicationsRepository.findById(id);
    if (oldLinkPublication.type !== PublicationType.Link) {
      throw new BadRequestException('Incorrect type of publication');
    }
    const newLinkPublication = {
      ...oldLinkPublication,
      ...dto,
    };
    return await this.publicationsRepository.update(id, newLinkPublication);
  }

  public async createPhotoPublication(dto: CreatePhotoPublicationDto) {
    const defaultPublication = this.getDefaultFieldsOfPublication({
      ownerId: dto.ownerId,
    });
    const photoPublication: PhotoPublication = {
      ...defaultPublication,
      type: PublicationType.Photo,
      photo: dto.photo,
      tags: dto.tags,
    };

    return await this.publicationsRepository.save(photoPublication);
  }

  public async updatePhotoPublication(
    id: string,
    dto: UpdatePhotoPublicationDto
  ) {
    const oldPhotoPublication = await this.publicationsRepository.findById(id);
    if (oldPhotoPublication.type !== PublicationType.Photo) {
      throw new BadRequestException('Incorrect type of publication');
    }
    const newPhotoPublication = {
      ...oldPhotoPublication,
      ...dto,
    };
    return await this.publicationsRepository.update(id, newPhotoPublication);
  }

  public async createQuotePublication(dto: CreateQuotePublicationDto) {
    const defaultPublication = this.getDefaultFieldsOfPublication({
      ownerId: dto.ownerId,
    });
    const quotePublication: QuotePublication = {
      ...defaultPublication,
      type: PublicationType.Quote,
      text: dto.text,
      author: dto.author,
      tags: dto.tags,
    };

    return await this.publicationsRepository.save(quotePublication);
  }

  public async updateQuotePublication(
    id: string,
    dto: UpdateQuotePublicationDto
  ) {
    const oldQuotePublication = await this.publicationsRepository.findById(id);
    if (oldQuotePublication.type !== PublicationType.Quote) {
      throw new BadRequestException('Incorrect type of publication');
    }
    const newQuotePublication = {
      ...oldQuotePublication,
      ...dto,
    };
    return await this.publicationsRepository.update(id, newQuotePublication);
  }

  public async createTextPublication(dto: CreateTextPublicationDto) {
    const defaultPublication = this.getDefaultFieldsOfPublication({
      ownerId: dto.ownerId,
    });
    const textPublication: TextPublication = {
      ...defaultPublication,
      type: PublicationType.Text,
      tags: dto.tags,
      name: dto.name,
      announcement: dto.announcement,
      text: dto.text,
    };

    return await this.publicationsRepository.save(textPublication);
  }

  public async updateTextPublication(
    id: string,
    dto: UpdateTextPublicationDto
  ) {
    const oldTextPublication = await this.publicationsRepository.findById(id);
    if (oldTextPublication.type !== PublicationType.Text) {
      throw new BadRequestException('Incorrect type of publication');
    }
    const newTextPublication = {
      ...oldTextPublication,
      ...dto,
    };
    return await this.publicationsRepository.update(id, newTextPublication);
  }

  private getDefaultFieldsOfPublication(
    options: DefaultPublicationOptions
  ): Publication {
    const { ownerId } = options;
    const id = randomUUID();
    const date = Date.now();
    return {
      originalOwnerId: ownerId,
      currentOwnerId: ownerId,
      id,
      createdAt: date,
      updatedAt: date,
      sourceId: id,
      isReposted: false,
      status: PublicationStatus.Draft,
    };
  }

  public async delete(id: string) {
    await this.publicationsRepository.deleteById(id);
  }

  public async findById(id: string) {
    return await this.publicationsRepository.findById(id);
  }
}
