import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FileVaultConfigModule } from '@project/shared/config/file-vault';
import { getMongooseOptions } from '@project/shared/config/file-vault';

import { FileUploaderModule } from './file-uploader/file-uploader.module';


@Module({
  imports: [
    FileUploaderModule,
    FileVaultConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
