import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreateVideoPublicationDto } from './dto/video-publication';
import {
  CreateTextPublicationDto,
  UpdateTextPublicationDto,
} from './dto/text-publication';
import {
  CreateQuotePublicationDto,
  UpdateQuotePublicationDto,
} from './dto/quote-publication';
import { CreatePhotoPublicationDto } from './dto/photo-publication';
import {
  CreateLinkPublicationDto,
  UpdateLinkPublicationDto,
} from './dto/link-publication';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationService: PublicationsService) {}

  @Post('link')
  public async createLinkPublication(@Body() dto: CreateLinkPublicationDto) {
    return await this.publicationService.createLinkPublication(dto);
  }

  @Patch('link/:id')
  public async updateLinkPublication(
    @Param('id') id: string,
    @Body() dto: UpdateLinkPublicationDto
  ) {
    return await this.publicationService.updateLinkPublication(id, dto);
  }

  @Post('photo')
  public async createPhotoPublication(@Body() dto: CreatePhotoPublicationDto) {
    return await this.publicationService.createPhotoPublication(dto);
  }

  @Patch('photo/:id')
  public async updatePhotoPublication(
    @Param('id') id: string,
    @Body() dto: CreatePhotoPublicationDto
  ) {
    return await this.publicationService.updatePhotoPublication(id, dto);
  }

  @Post('quote')
  public async createQuotePublication(@Body() dto: CreateQuotePublicationDto) {
    return await this.publicationService.createQuotePublication(dto);
  }

  @Patch('quote/:id')
  public async updateQuotePublication(
    @Param('id') id: string,
    @Body() dto: UpdateQuotePublicationDto
  ) {
    return await this.publicationService.updateQuotePublication(id, dto);
  }

  @Post('text')
  public async createTextPublication(@Body() dto: CreateTextPublicationDto) {
    return await this.publicationService.createTextPublication(dto);
  }

  @Patch('text/:id')
  public async updateTextPublication(
    @Param('id') id: string,
    @Body() dto: UpdateTextPublicationDto
  ) {
    return await this.publicationService.updateTextPublication(id, dto);
  }

  @Post('video')
  public async createVideoPublication(@Body() dto: CreateVideoPublicationDto) {
    return await this.publicationService.createVideoPublication(dto);
  }

  @Patch('video/:id')
  public async updateVideoPublication(
    @Param('id') id: string,
    @Body() dto: UpdateTextPublicationDto
  ) {
    return await this.publicationService.updateVideoPublication(id, dto);
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    return await this.publicationService.findById(id);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.publicationService.delete(id);
  }
}
