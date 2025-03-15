import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
// import { AuthService } from './auth.service';
import { GoogleAuthModule } from './google/google.auth.module';
import { KakaoAuthModule } from './kakao/kakao.auth.module';
import { NaverAuthModule } from './naver/naver.auth.module';
@Module({
  imports: [
    PassportModule,
    ConfigModule,
    GoogleAuthModule,
    KakaoAuthModule,
    NaverAuthModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AuthModule {}
