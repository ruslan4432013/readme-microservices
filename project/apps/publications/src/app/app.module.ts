import { Module } from '@nestjs/common';
import { PublicationModule } from './publication/publication.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [PublicationModule, CommentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
