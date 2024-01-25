import { Module } from '@nestjs/common';
import { PublicationsController } from './publications.controller';
import { AccountsController } from './accounts.controller';
import { ConfigBffModule } from '@project/shared/config/bff';
import { HttpModule } from '@nestjs/axios';
import { getHttpModuleOptions } from '@project/shared/config/bff';
import { CheckAuthGuard } from './guards/check-auth.guard';


@Module({
  imports: [
    ConfigBffModule,
    HttpModule.registerAsync(getHttpModuleOptions())
  ],
  controllers: [
    PublicationsController,
    AccountsController
  ],
  providers: [CheckAuthGuard],
})
export class AppModule {
}
