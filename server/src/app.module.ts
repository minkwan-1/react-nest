import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

// 환경 설정 & DB
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

// 도메인 모듈
import { AuthModule } from './modules/auth/auth.module';
import { PhoneVerificationModule } from './modules/phone/phone-verification.module';
import { UsersModule } from './modules/users/users.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { OpenAIModule } from './modules/ai/gemini/gemini.module';
import { SelfIntroModule } from './modules/self-intro/self-intro.module';
import { MyInfoModule } from './modules/myInfo/myInfo.module';

// 전역 필터
import { CatchEverythingFilter } from './filters/catch-everything.filter';
import { HttpExceptionFilter } from './filters/http-exceptions.filter';

@Module({
  imports: [
    // 환경 설정 & DB
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeORMConfig),

    // 도메인 모듈
    AuthModule,
    PhoneVerificationModule,
    UsersModule,
    QuestionsModule,
    OpenAIModule,
    SelfIntroModule,
    MyInfoModule,
  ],
  providers: [
    // 전역 필터
    { provide: APP_FILTER, useClass: CatchEverythingFilter },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
