import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NaverUser } from './naver.auth.entity';
import { NaverAuthService } from './naver.auth.service';
import { NaverAuthRepository } from './naver.auth.repository';
import { NaverAuthController } from './naver.auth.controller';
import { AuthModule } from '../auth.module';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
// import { AuthSerializer } from '../utils/auth.serializer';

@Module({
  imports: [
    TypeOrmModule.forFeature([NaverUser]),
    PassportModule.register({ session: true }),
    forwardRef(() => AuthModule),
    UsersModule,
  ],
  controllers: [NaverAuthController],
  providers: [NaverAuthService, NaverAuthRepository],
  exports: [NaverAuthService],
})
export class NaverAuthModule {}
