import { Module } from '@nestjs/common';
import { PublicationsModule } from './publications/publications.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [PublicationsModule, CommentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
