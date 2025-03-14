import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KakaoUser } from './kakao.auth.entity';
import { KakaoAuthService } from './kakao.auth.service';
import { KakaoAuthRepository } from './kakao.auth.repository';
import { KakaoAuthController } from './kakao.auth.controller';
import { AuthModule } from '../auth.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([KakaoUser]),
    forwardRef(() => AuthModule),
  ],
  controllers: [KakaoAuthController],
  providers: [KakaoAuthService, KakaoAuthRepository],
  exports: [KakaoAuthService, KakaoAuthRepository],
})
export class KakaoAuthModule {}
