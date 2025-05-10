import {
  Controller,
  Get,
  Redirect,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Logger,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleAuthService } from './google.auth.service';
import { UsersService } from 'src/users/users.service';

@Controller('auth/google')
export class GoogleAuthController {
  private readonly logger = new Logger(GoogleAuthController.name);

  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get('login')
  @Redirect()
  async login() {
    try {
      this.logger.debug(`[인증] 구글 로그인 프로세스 시작`);
      const googleAuthUrl = this.googleAuthService.getGoogleAuthUrl();
      this.logger.debug(`[인증] 구글 로그인 URL 생성 완료`);
      return { url: googleAuthUrl };
    } catch (error) {
      this.logger.error(
        `[인증 X] 구글 로그인 URL 생성 중 오류 발생: ${error.message}`,
        error.stack,
      );
      throw new HttpException(
        '구글 로그인 URL 생성 중 오류가 발생했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('user')
  async redirect(
    @Body('code') code: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (!code) {
      this.logger.error(`[인증 X] 인가 코드가 제공되지 않았습니다`);
      throw new HttpException(
        '인가 코드가 제공되지 않았습니다',
        HttpStatus.BAD_REQUEST,
      );
    }

    this.logger.debug(`[인증] 구글 인가 코드 수신 완료, 토큰 교환 시작`);

    try {
      // 인가 코드로 액세스 토큰 교환
      const tokens = await this.googleAuthService.getToken(code);
      this.logger.debug(`[인증] 구글 액세스 토큰 획득 성공`);

      if (!tokens?.access_token) {
        this.logger.error(`[인증 X] 유효한 구글 액세스 토큰을 얻을 수 없음`);
        throw new HttpException(
          '구글 액세스 토큰을 얻을 수 없습니다',
          HttpStatus.BAD_REQUEST,
        );
      }

      // 액세스 토큰으로 사용자 정보 획득
      this.logger.debug(`[인증] 액세스 토큰으로 구글 유저 정보 요청 시작`);
      const userData = await this.googleAuthService.getUserInfo(
        tokens.access_token,
      );
      this.logger.debug(`[인증] 구글 유저 정보 획득 성공: ${userData.email}`);

      // 기존 사용자인지 확인
      this.logger.debug(`[인증] 기존 사용자 확인 시작`);
      const user = await this.googleAuthService.findUser(userData);
      const email = user.email;

      if (user.isExist) {
        this.logger.debug(`[인증] 기존 사용자 확인됨: ${email}`);
        const viaGoogleUser = await this.usersService.findByEmail(email);
        this.logger.debug(`[인증] DB에서 사용자 정보 조회 완료`);

        // 세션 로그인 처리 시작
        this.logger.debug(`[세션플로우] Passport 세션 로그인 시작`);
        (req as any).login(viaGoogleUser, (err: any) => {
          if (err) {
            this.logger.error(
              `[세션플로우 X] 세션 로그인 실패: ${err.message}`,
              err.stack,
            );
            throw new HttpException(
              '세션 로그인 실패',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }

          // 세션에 유저 정보 저장 (세션 미들웨어 사용)
          this.logger.debug(
            `[세션플로우] Passport 로그인 성공, 세션에 유저 정보 저장`,
          );
          (req as any).session.user = viaGoogleUser;

          // 세션 정보 로깅
          this.logger.debug(`[세션플로우] 세션 ID: ${req.sessionID}`);
          this.logger.verbose(
            `[세션플로우] 세션에 저장된 유저: ${JSON.stringify(req.session.user)}`,
          );
          this.logger.verbose(
            `[세션플로우] 전체 세션 정보: ${JSON.stringify(req.session)}`,
          );

          this.logger.debug(`[인증] 인증 프로세스 완료, 기존 사용자 응답 전송`);
          res.send({
            message: '기존 유저 데이터',
            user: { ...viaGoogleUser, isExist: true },
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            expiresIn: tokens.expires_in,
          });
        });

        return;
      } else {
        this.logger.debug(`[인증] 신규 사용자 확인됨: ${email}`);
        this.logger.debug(`[인증] 신규 사용자 등록 필요, 응답 전송`);
        res.send({
          message: '신규 유저 데이터',
          user,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          expiresIn: tokens.expires_in,
        });
      }
    } catch (error) {
      this.logger.error(
        `[인증 X] 인증 과정 중 오류 발생: ${error.message}`,
        error.stack,
      );
      throw new HttpException(
        '인증 처리 중 오류가 발생했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('user/update')
  async updateUser(@Body() userData) {
    this.logger.debug(
      `[사용자등록] 신규 구글 사용자 등록 시작: ${userData.email}`,
    );

    try {
      // 구글 유저 테이블 생성
      const finalGoogleUser = await this.googleAuthService.createUser(userData);
      this.logger.debug(`[사용자등록] 구글 유저 테이블 생성 완료`);
      this.logger.verbose(
        `[사용자등록] 구글 유저 생성 결과: ${JSON.stringify(finalGoogleUser)}`,
      );

      // 최종 유저 테이블 생성
      const parseFinalUser = {
        email: userData.email,
        name: userData.name,
        phoneNumber: userData.phoneNumber,
      };

      this.logger.debug(`[사용자등록] 최종 유저 테이블 생성 시작`);
      const finalUser = await this.usersService.create(parseFinalUser);
      this.logger.debug(`[사용자등록] 최종 유저 테이블 생성 완료`);
      this.logger.verbose(
        `[사용자등록] 최종 유저 생성 결과: ${JSON.stringify(finalUser)}`,
      );

      return {
        finalGoogleUser,
        finalUser,
      };
    } catch (error) {
      this.logger.error(
        `[사용자등록 X] 사용자 등록 중 오류 발생: ${error.message}`,
        error.stack,
      );
      throw new HttpException(
        '사용자 등록 중 오류가 발생했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('me')
  async getMe(@Req() req: Request) {
    this.logger.debug(`[세션확인] 현재 로그인된 사용자 정보 요청`);

    if (!req.sessionID || !req.session?.user) {
      this.logger.error(`[세션확인 X] 세션 없음 - 로그인되지 않은 상태`);
      throw new HttpException(
        '로그인되지 않았습니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // 세션 정보 로깅
    this.logger.debug(
      `[세션확인] 유효한 세션 확인됨, 세션 ID: ${req.sessionID}`,
    );
    this.logger.verbose(
      `[세션확인] 세션에 담긴 유저 정보: ${JSON.stringify(req.session.user)}`,
    );

    return {
      user: req.session.user,
      sessionId: req.sessionID,
    };
  }
}
