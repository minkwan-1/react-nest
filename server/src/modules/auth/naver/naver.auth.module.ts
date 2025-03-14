import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NaverUser } from './naver.auth.entity';
import { NaverAuthService } from './naver.auth.service';
import { NaverAuthRepository } from './naver.auth.repository';
import { NaverAuthController } from './naver.auth.controller';
import { AuthModule } from '../auth.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([NaverUser]),
    forwardRef(() => AuthModule),
  ],
  controllers: [NaverAuthController],
  providers: [NaverAuthService, NaverAuthRepository],
  exports: [NaverAuthService, NaverAuthRepository],
})
export class NaverAuthModule {}
