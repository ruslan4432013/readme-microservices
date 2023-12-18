import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { PublicationUserModule } from './publication-user/publication-user.module';

@Module({
  imports: [AuthenticationModule, PublicationUserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
