import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 소셜 로그인 사용자를 위한 JWT 토큰 생성
   * @param user 인증된 사용자 정보
   * @returns 액세스 토큰과 리프레시 토큰을 포함한 객체
   */
  generateToken(user: any, provider: string) {
    // 토큰에 포함될 기본 정보
    const payload = {
      sub: user.id,
      provider,
      nickname: user.nickname || '익명',
    };

    // 액세스 토큰 생성
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '1h', // 1시간 유효
    });

    // 리프레시 토큰 생성 (ID와 제공자만 포함)
    const refreshToken = this.jwtService.sign(
      { sub: user.id, provider },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d', // 7일 유효
      },
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: 'Bearer',
      expires_in: 3600, // 1시간 (초 단위)
    };
  }

  /**
   * 토큰 검증
   * @param token 검증할 토큰
   * @returns 디코드된 페이로드 또는 null
   */
  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /**
   * 리프레시 토큰 검증 및 새 액세스 토큰 발급
   * @param refreshToken 리프레시 토큰
   * @returns 새 액세스 토큰 또는 null
   */
  refreshAccessToken(refreshToken: string) {
    try {
      // 리프레시 토큰 검증
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      // 새 액세스 토큰 발급
      const newAccessToken = this.jwtService.sign(
        { sub: payload.sub, provider: payload.provider },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: '1h',
        },
      );

      return {
        access_token: newAccessToken,
        token_type: 'Bearer',
        expires_in: 3600,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
