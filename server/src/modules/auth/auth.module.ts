import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleAuthModule } from './google/google.auth.module';
import { NaverAuthModule } from './naver/naver.auth.module';
import { KakaoAuthModule } from './kakao/kakao.auth.module';
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [
        ConfigModule,
        GoogleAuthModule,
        NaverAuthModule,
        KakaoAuthModule,
      ],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AuthModule {}
