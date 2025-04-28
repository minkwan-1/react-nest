import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { typeORMConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeminiModule } from './modules/ai/gemini/gemini.module';
import { PhoneVerificationModule } from './modules/phone/phone-verification.module';
import { UsersModule } from './users/users.module';
import { CatchEverythingFilter } from './filters/catch-everything.filter';
import { HttpExceptionFilter } from './filters/http-exceptions.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    QuestionsModule,
    GeminiModule,
    PhoneVerificationModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    // transaction filter 생성 필요 - typeorm 공부 같이
  ],
})
export class AppModule {}
