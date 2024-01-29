import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

import { MongoIdValidationPipe, USER_ID_HEADER } from '@project/shared/core';
import { fillDTO } from '@project/shared/helpers';
import {
  LikeDTO,
  PublicationsUserCountRdo,
  RepostPublicationDTO,
  UpdateBasePublicationDTO
} from '@project/shared/transfer-objects';

import { fillPublicationDTO } from './publication.helper';
import { PublicationService } from './publication.service';
import { FindPublicationQuery } from './query/find-publication.query';
import { NotifyPublicationQuery } from './query/notify-publication.query';
import { PublicationQuery } from './query/publication.query';

import { DESCRIPTIONS, QUERY_OPTIONS } from '../application.constant';


@ApiTags('Publications')
@Controller()
export class PublicationController {
  constructor(
    private readonly publicationService: PublicationService
  ) {
  }


  @ApiQuery(QUERY_OPTIONS.FIND)
  @ApiOkResponse({ description: DESCRIPTIONS.FIND_PUBLICATIONS })
  @Get('find')
  public async search(@Query() query: FindPublicationQuery) {
    return (await this.publicationService.search(query)).map(fillPublicationDTO);
  }

  @ApiQuery(QUERY_OPTIONS.START_DATE)
  @ApiOkResponse({ description: DESCRIPTIONS.FIND_NEW_PUBLICATIONS })
  @Get('new-publications')
  public async findByDate(@Query() query: NotifyPublicationQuery) {
    return this.publicationService.findNew(query);
  }

  @ApiQuery(QUERY_OPTIONS.LIMIT)
  @ApiQuery(QUERY_OPTIONS.SORT)
  @ApiQuery(QUERY_OPTIONS.TAGS)
  @ApiQuery(QUERY_OPTIONS.TYPE)
  @ApiQuery(QUERY_OPTIONS.SKIP)
  @ApiQuery(QUERY_OPTIONS.PAGE)
  @ApiOkResponse({ description: DESCRIPTIONS.USERS_PUBLICATIONS })
  @Get('/user')
  public async userPublications(@Headers(USER_ID_HEADER) userId: string, @Query() query: PublicationQuery) {
    query.userId = userId;
    const publications = await this.publicationService.getAllPublications(query, true);
    const entities = publications.entities
      .map((publication) => fillPublicationDTO(publication));
    return {
      ...publications,
      entities
    };
  }

  @ApiQuery(QUERY_OPTIONS.LIMIT)
  @ApiQuery(QUERY_OPTIONS.SORT)
  @ApiQuery(QUERY_OPTIONS.TAGS)
  @ApiQuery(QUERY_OPTIONS.TYPE)
  @ApiQuery(QUERY_OPTIONS.SKIP)
  @ApiQuery(QUERY_OPTIONS.PAGE)
  @ApiOkResponse({ description: DESCRIPTIONS.USERS_PUBLICATIONS })
  @Get('')
  public async index(@Query() query: PublicationQuery) {
    const publications = await this.publicationService.getAllPublications(query);
    const entities = publications.entities
      .map((publication) => fillPublicationDTO(publication));
    return {
      ...publications,
      entities
    };
  }

  @ApiOkResponse({ description: DESCRIPTIONS.SHOW })
  @Get('/:id')
  public async show(@Param('id') id: string) {
    const publication = await this.publicationService.getPublication(id);
    return fillPublicationDTO(publication);
  }


  @ApiOkResponse({ description: DESCRIPTIONS.UPDATE })
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateBasePublicationDTO) {
    const publication = await this.publicationService.update(id, dto);
    return fillPublicationDTO(publication);
  }


  @ApiCreatedResponse({ description: DESCRIPTIONS.LIKES.LIKE })
  @Post('/like')
  public async likePost(@Body() dto: LikeDTO) {
    return await this.publicationService.like(dto);
  }

  @ApiCreatedResponse({ description: DESCRIPTIONS.LIKES.DISLIKE })
  @Post('/dislike')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async dislikePost(@Body() dto: LikeDTO) {
    await this.publicationService.dislike(dto);
  }

  @ApiCreatedResponse({ description: DESCRIPTIONS.REPOST })
  @Post('/repost/:id')
  public async repost(@Param('id') id: string, @Body() dto: RepostPublicationDTO) {
    const publication = await this.publicationService.repost(id, dto.userId);
    return fillPublicationDTO(publication);
  }

  @ApiCreatedResponse({ type: PublicationsUserCountRdo })
  @Get('/count/:userId')
  public async getUsersPublicationCount(@Param('userId', MongoIdValidationPipe) userId: string) {
    const count = await this.publicationService.getUserPublicationCount(userId);
    return fillDTO(PublicationsUserCountRdo, {
      userId,
      count
    });
  }
}
