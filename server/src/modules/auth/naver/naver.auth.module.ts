import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { NaverUser } from './naver.auth.entity';
import { NaverAuthRepository } from './naver.auth.repository';
import { NaverAuthService } from './naver.auth.service';
import { NaverAuthController } from './naver.auth.controller';
import { AuthModule } from '../auth.module';
import { UsersModule } from 'src/modules/users/users.module';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NaverUser]),

    PassportModule.register({ session: true }),

    forwardRef(() => AuthModule),

    UsersModule,
    SessionModule,
  ],
  controllers: [NaverAuthController],
  providers: [NaverAuthService, NaverAuthRepository],
  exports: [NaverAuthService],
})
export class NaverAuthModule {}
