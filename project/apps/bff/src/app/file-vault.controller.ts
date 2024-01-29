import 'multer';
import { HttpService } from '@nestjs/axios';
import {
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseFilters, UseInterceptors
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Express } from 'express';

import { applicationConfig } from '@project/shared/config/bff';
import { AxiosExceptionFilter } from '@project/shared/core';
import { FileUploadDTO } from '@project/shared/transfer-objects';


@ApiTags('files')
@Controller('files')
@UseFilters(AxiosExceptionFilter)
export class FileVaultController {
  constructor(
    private readonly httpService: HttpService,
    @Inject(applicationConfig.KEY) private readonly appConfig: ConfigType<typeof applicationConfig>
  ) {
  }

  @ApiBody({
    type: FileUploadDTO
  })
  @ApiConsumes('multipart/form-data')
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const formData = new FormData();
    formData.set('file', new Blob([file.buffer], {
      type: file.mimetype
    }), file.originalname);

    const { data } = await this.httpService.axiosRef.post(`${this.appConfig.url.files}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return data;
  }

}
