import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { typeORMConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { PhoneVerificationModule } from './modules/phone/phone-verification.module';
import { GeminiModule } from './modules/ai/gemini/gemini.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    QuestionsModule,
    // PhoneVerificationModule,
    GeminiModule,
  ],
})
export class AppModule {}
