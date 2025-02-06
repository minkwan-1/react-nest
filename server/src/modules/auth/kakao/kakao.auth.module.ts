import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KakaoUser } from './kakao.auth.entity';
import { KakaoAuthService } from './kakao.auth.service';
import { KakaoAuthRepository } from './kakao.auth.repository';
import { KakaoAuthController } from './kakao.auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([KakaoUser])],
  controllers: [KakaoAuthController],
  providers: [KakaoAuthService, KakaoAuthRepository],
  exports: [KakaoAuthService],
})
export class KakaoAuthModule {}
