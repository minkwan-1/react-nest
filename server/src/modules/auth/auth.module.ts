import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { GoogleAuthModule } from './google/google.auth.module';
import { AuthSerializer } from './utils/auth.serializer';
import { UsersModule } from 'src/users/users.module';
import { NaverAuthModule } from './naver/naver.auth.module';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    ConfigModule,
    GoogleAuthModule,
    NaverAuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [AuthSerializer],
  exports: [],
})
export class AuthModule {}
