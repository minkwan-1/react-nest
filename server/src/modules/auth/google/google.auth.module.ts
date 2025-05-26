import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

// 엔티티 및 리포지토리
import { GoogleUser } from './google.auth.entity';
import { GoogleAuthRepository } from './google.auth.repository';

// 서비스 및 컨트롤러
import { GoogleAuthService } from './google.auth.service';
import { GoogleAuthController } from './google.auth.controller';

// 의존 모듈
import { UsersModule } from 'src/modules/users/users.module';
import { SessionModule } from '../session/session.module';
import { AuthModule } from '../auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GoogleUser]),
    PassportModule.register({ session: true }),
    forwardRef(() => AuthModule),
    UsersModule,
    SessionModule,
  ],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService, GoogleAuthRepository],
  exports: [GoogleAuthService],
})
export class GoogleAuthModule {}
