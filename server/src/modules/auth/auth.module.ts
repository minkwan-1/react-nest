import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

// 1. 소셜 로그인 모듈
import { GoogleAuthModule } from './google/google.auth.module';
import { NaverAuthModule } from './naver/naver.auth.module';

// 2. 유저 모듈 및 직렬화 도구
import { UsersModule } from 'src/users/users.module';
import { AuthSerializer } from './utils/auth.serializer';

// 3. 컨트롤러
import { AuthController } from './auth.controller';

@Module({
  imports: [
    // Passport를 세션 기반으로 등록
    PassportModule.register({ session: true }),

    // .env 환경 설정 모듈
    ConfigModule,

    // 소셜 로그인 관련 모듈
    GoogleAuthModule,
    NaverAuthModule,

    // 유저 도메인 모듈
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthSerializer],
})
export class AuthModule {}
