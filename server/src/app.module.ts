import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

// 0. 설정 관련 모듈
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

// 1. 주요 도메인 모듈
import { AuthModule } from './modules/auth/auth.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { GeminiModule } from './modules/ai/gemini/gemini.module';
import { PhoneVerificationModule } from './modules/phone/phone-verification.module';
import { UsersModule } from './users/users.module';

// 2. 전역 에러 필터
import { CatchEverythingFilter } from './filters/catch-everything.filter';
import { HttpExceptionFilter } from './filters/http-exceptions.filter';

@Module({
  imports: [
    // 3. 환경변수와 TypeORM 설정(전역)
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeORMConfig),

    // 4. 기능별 도메인 모듈 등록
    AuthModule,
    QuestionsModule,
    GeminiModule,
    PhoneVerificationModule,
    UsersModule,
  ],
  providers: [
    // 5. 전역 예외 필터 등록
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
