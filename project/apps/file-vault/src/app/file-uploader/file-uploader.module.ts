import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { FileUploaderController } from './file-uploader.controller';
import { FileUploaderService } from './file-uploader.service';
import { FileModel, FileSchema } from './file.model';
import { FileRepository } from './file.repository';

const SERVE_ROOT = '/static';

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get<string>('application.uploadDirectory');
        return [{
          rootPath,
          serveRoot: SERVE_ROOT,
          serveStaticOptions: {
            fallthrough: true,
            etag: true
          }
        }];
      }
    }),
    MongooseModule.forFeature([
      { name: FileModel.name, schema: FileSchema }
    ])
  ],
  providers: [FileUploaderService, FileRepository],
  controllers: [FileUploaderController]
})
export class FileUploaderModule {
}
