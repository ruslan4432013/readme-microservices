import 'multer';
import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Express } from 'express';

import { MongoIdValidationPipe } from '@project/shared/core';
import { fillDTO } from '@project/shared/helpers';
import { FileUploadDTO, UploadedFileRDO } from '@project/shared/transfer-objects';

import { FileUploaderService } from './file-uploader.service';

@ApiTags('Files')
@Controller('files')
export class FileUploaderController {
  constructor(
    private readonly fileUploaderService: FileUploaderService
  ) {
  }

  @ApiBody({
    type: FileUploadDTO
  })
  @ApiCreatedResponse({
    type: UploadedFileRDO
  })
  @ApiConsumes('multipart/form-data')
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileEntity = await this.fileUploaderService.saveFile(file);
    return fillDTO(UploadedFileRDO, fileEntity.toPOJO());
  }


  @ApiOkResponse({
    type: UploadedFileRDO
  })
  @Get(':fileId')
  public async show(@Param('fileId', MongoIdValidationPipe) fileId: string) {
    const existFile = await this.fileUploaderService.getFile(fileId);
    return fillDTO(UploadedFileRDO, existFile);
  }
}
