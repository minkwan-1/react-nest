import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { AnswersModule } from './modules/answers/answers.module';
import { CommentsModule } from './modules/comments/comments.module';
import { VotesModule } from './modules/votes/votes.module';
import { TagsModule } from './modules/tags/tags.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { SearchModule } from './modules/search/search.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    QuestionsModule,
    AnswersModule,
    CommentsModule,
    VotesModule,
    TagsModule,
    NotificationsModule,
    SearchModule,
    SharedModule,
  ],
})
export class AppModule {}
