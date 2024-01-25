import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { PublicationUserModule } from '../publication-user/publication-user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/shared/config/account';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { NotifyModule } from '../notify/notify.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';

@Module({
  imports: [
    PublicationUserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    }),
    NotifyModule,
    RefreshTokenModule
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtAccessStrategy,
    LocalStrategy,
    JwtRefreshStrategy,
  ]
})
export class AuthenticationModule {
}
