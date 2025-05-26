import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

// 1. 엔티티 및 리포지토리
import { NaverUser } from './naver.auth.entity';
import { NaverAuthRepository } from './naver.auth.repository';

// 2. 서비스 및 컨트롤러
import { NaverAuthService } from './naver.auth.service';
import { NaverAuthController } from './naver.auth.controller';

// 3. 의존 모듈
import { AuthModule } from '../auth.module';
import { UsersModule } from 'src/modules/users/users.module';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [
    // NaverUser 엔티티 등록
    TypeOrmModule.forFeature([NaverUser]),

    // 세션 기반 Passport 사용
    PassportModule.register({ session: true }),

    // AuthModule과의 순환 의존성 해결
    forwardRef(() => AuthModule),

    // 유저 정보 접근을 위한 UsersModule
    UsersModule,
    SessionModule,
  ],
  controllers: [NaverAuthController],
  providers: [NaverAuthService, NaverAuthRepository],
  exports: [NaverAuthService],
})
export class NaverAuthModule {}
