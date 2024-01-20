import 'multer';
import { Express } from 'express';
import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileUploaderService } from './file-uploader.service';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';
import { fillDTO } from '@project/shared/helpers';
import { MongoIdValidationPipe } from '@project/shared/core';

@Controller('files')
export class FileUploaderController {
  constructor(
    private readonly fileUploaderService: FileUploaderService
  ) {
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileEntity = await this.fileUploaderService.saveFile(file);
    return fillDTO(UploadedFileRdo, fileEntity.toPOJO());
  }


  @Get(':fileId')
  public async show(@Param('fileId', MongoIdValidationPipe) fileId: string) {
    const existFile = await this.fileUploaderService.getFile(fileId);
    return fillDTO(UploadedFileRdo, existFile);
  }
}
