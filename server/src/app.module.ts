import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './configs/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { PhoneVerificationModule } from './modules/phone/phone-verification.module';
import { UsersModule } from './modules/users/users.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { AiModule } from './modules/ai/ai.module';
import { SelfIntroModule } from './modules/self-intro/self-intro.module';
import { MyInfoModule } from './modules/myInfo/myInfo.module';
import { AnswerModule } from './modules/answer/answer.module';
import { NewsModule } from './modules/news/news.module';
import { CatchEverythingFilter } from './filters/catch-everything.filter';
import { HttpExceptionFilter } from './filters/http-exceptions.filter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),

    AuthModule,
    PhoneVerificationModule,
    UsersModule,
    QuestionsModule,
    AiModule,
    SelfIntroModule,
    MyInfoModule,
    AnswerModule,
    NewsModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: CatchEverythingFilter },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
