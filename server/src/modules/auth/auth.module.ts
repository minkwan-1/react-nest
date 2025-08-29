import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { GoogleAuthModule } from './google/google.auth.module';
import { NaverAuthModule } from './naver/naver.auth.module';
import { SessionModule } from './session/session.module';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthController } from './auth.controller';
import { AuthSerializer } from './utils/auth.serializer';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ session: true }),
    GoogleAuthModule,
    NaverAuthModule,
    SessionModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthSerializer],
})
export class AuthModule {}
