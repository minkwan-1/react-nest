import {
  Controller,
  Get,
  Redirect,
  Post,
  Body,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GoogleAuthService } from './google.auth.service';

@Controller('auth/google')
export class GoogleAuthController {
  private readonly logger = new Logger(GoogleAuthController.name);

  constructor(private readonly googleAuthService: GoogleAuthService) {
    console.log('🟢 GoogleAuthController 초기화됨');
  }

  @Get('login')
  @Redirect()
  async login() {
    try {
      console.log('🟢 login 엔드포인트 호출됨');
      const googleAuthUrl = this.googleAuthService.getGoogleAuthUrl();
      console.log('🟢 Google Auth URL 생성됨:', googleAuthUrl);
      return { url: googleAuthUrl };
    } catch (error) {
      this.logger.error(`🚨 로그인 URL 생성 중 오류: ${error.message}`);
      throw new HttpException(
        '구글 로그인 URL 생성 중 오류가 발생했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('user')
  async redirect(@Body('code') code: string) {
    try {
      console.log('🟢 user 엔드포인트 호출됨');

      if (!code) {
        this.logger.error('🚨 인가 코드가 없습니다');
        throw new HttpException(
          '인가 코드가 제공되지 않았습니다',
          HttpStatus.BAD_REQUEST,
        );
      }

      console.log('🟢 수신된 인가 코드:', code);

      console.log('🟢 토큰 요청 시작');
      let tokens;
      try {
        tokens = await this.googleAuthService.getToken(code);
        console.log('🟢 토큰 응답 수신:', JSON.stringify(tokens, null, 2));
      } catch (tokenError) {
        this.logger.error(`🚨 토큰 요청 실패: ${tokenError.message}`);
        throw new HttpException(
          '구글 인증 토큰을 가져오는데 실패했습니다',
          HttpStatus.BAD_REQUEST,
        );
      }

      console.log('🟢 사용자 정보 요청 시작');
      let user;
      try {
        user = await this.googleAuthService.getUserInfo(tokens.access_token);
        console.log('🟢 사용자 정보 수신:', JSON.stringify(user, null, 2));
      } catch (userInfoError) {
        this.logger.error(`🚨 사용자 정보 요청 실패: ${userInfoError.message}`);
        throw new HttpException(
          '구글에서 사용자 정보를 가져오는데 실패했습니다',
          HttpStatus.BAD_REQUEST,
        );
      }

      console.log('🟢 사용자 조회/생성 시작');
      let userInfo;
      try {
        userInfo = await this.googleAuthService.findOrCreateUser(user);
        console.log(
          '🟢 사용자 조회/생성 완료:',
          JSON.stringify(userInfo, null, 2),
        );
      } catch (dbError) {
        this.logger.error(`🚨 사용자 DB 처리 실패: ${dbError.message}`);

        // 개발자를 위한 상세 정보 로깅
        if (dbError.name === 'QueryFailedError') {
          this.logger.error(`🚨 SQL 오류: ${dbError.message}`);
          this.logger.error(
            `🚨 SQL 쿼리: ${(dbError as any).query || '알 수 없음'}`,
          );
          this.logger.error(
            `🚨 SQL 파라미터: ${(dbError as any).parameters || '알 수 없음'}`,
          );
        }

        // 사용자에게는 일반적인 오류 메시지 표시
        throw new HttpException(
          '사용자 정보 처리 중 오류가 발생했습니다',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return {
        message: '조회 성공',
        user: userInfo,
      };
    } catch (error) {
      // 이미 HttpException인 경우 그대로 던지고, 아닌 경우 새로운 HttpException 생성
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error(`🚨 처리되지 않은 오류: ${error.message}`);
      throw new HttpException(
        '서버 내부 오류가 발생했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
