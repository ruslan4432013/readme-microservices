import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';

import { ConfigBffModule } from '@project/shared/config/bff';
import { getHttpModuleOptions } from '@project/shared/config/bff';

import { AccountsController } from './accounts.controller';
import { FileVaultController } from './file-vault.controller';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { NotifyController } from './notify.controller';
import { PublicationCommentsController } from './publication-comments.controller';
import {
  BasePublicationsController,
  LinkPublicationsController,
  PhotoPublicationController,
  QuotePublicationController,
  TextPublicationController, VideoPublicationController
} from './publication-controllers';
import { PublicationLikeController } from './publication-like.controller';


@Module({
  imports: [
    ConfigBffModule,
    NestjsFormDataModule,
    HttpModule.registerAsync(getHttpModuleOptions())
  ],
  controllers: [
    BasePublicationsController,
    LinkPublicationsController,
    VideoPublicationController,
    TextPublicationController,
    PhotoPublicationController,
    QuotePublicationController,
    NotifyController,
    PublicationCommentsController,
    AccountsController,
    PublicationLikeController,
    FileVaultController
  ],
  providers: [CheckAuthGuard]
})
export class AppModule {
}
