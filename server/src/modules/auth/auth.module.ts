import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { KakaoAuthController } from './kakao/kakao.auth.controller';
import { NaverAuthController } from './naver/naver.auth.controller';

@Module({
  imports: [HttpModule],
  controllers: [KakaoAuthController, NaverAuthController],
  providers: [],
})
export class AuthModule {}
