import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

// 인증 관련 모듈
import { GoogleAuthModule } from './google/google.auth.module';
import { NaverAuthModule } from './naver/naver.auth.module';
import { SessionModule } from './session/session.module';

// 유저 도메인 모듈
import { UsersModule } from 'src/modules/users/users.module';

// 컨트롤러 & 직렬화
import { AuthController } from './auth.controller';
import { AuthSerializer } from './utils/auth.serializer';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ session: true }),

    // 소셜 로그인 관련
    GoogleAuthModule,
    NaverAuthModule,
    SessionModule,

    // 유저 도메인
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthSerializer],
})
export class AuthModule {}
