import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { GoogleAuthRepository } from './google.auth.repository';
import { GoogleUser } from './google.auth.entity';
import axios from 'axios';

type FindUserType = GoogleUser & { isExist: boolean };

@Injectable()
export class GoogleAuthService implements OnModuleInit {
  private readonly logger = new Logger(GoogleAuthService.name);
  private readonly googleClientId = process.env.GOOGLE_CLIENT_ID;
  private readonly googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
  private readonly googleCallbackUrl = process.env.GOOGLE_CALLBACK_URL;

  constructor(private readonly googleAuthRepository: GoogleAuthRepository) {
    console.log('🟢 GoogleAuthService 초기화됨');
    console.log('🟢 환경변수 확인:', {
      clientId: this.googleClientId ? '설정됨' : '설정안됨',
      clientSecret: this.googleClientSecret ? '설정됨' : '설정안됨',
      callbackUrl: this.googleCallbackUrl,
    });
  }

  async onModuleInit() {
    try {
      // 애플리케이션 시작 시 테이블 존재 여부 확인
      const tableExists = await this.googleAuthRepository.checkTableExists();
      this.logger.log(
        `🟢 Google User 테이블 확인 결과: ${tableExists ? '존재함' : '존재하지 않음'}`,
      );

      if (!tableExists) {
        this.logger.warn(
          '🟢 Google User 테이블이 존재하지 않습니다. 데이터베이스 마이그레이션이 필요할 수 있습니다.',
        );
      }
    } catch (error) {
      this.logger.error(`🚨 모듈 초기화 중 오류: ${error.message}`);
    }
  }

  // 1. 구글 로그인 URL 생성
  getGoogleAuthUrl(): string {
    console.log('🟢 getGoogleAuthUrl 메소드 호출됨');
    try {
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.googleClientId}&redirect_uri=${this.googleCallbackUrl}&response_type=code&scope=email profile&prompt=consent&access_type=offline`;
      console.log('🟢 생성된 인증 URL:', authUrl);
      return authUrl;
    } catch (error) {
      console.error('🚨 구글 인증 URL 생성 중 발생한 오류:', error);
      throw new Error('구글 인증 URL 생성 중 오류 발생');
    }
  }

  // 2. 인가 코드를 사용하여 토큰 발급 요청
  async getToken(code: string): Promise<any> {
    console.log(
      '🟢 getToken 메소드 호출됨. 코드:',
      code.substring(0, 10) + '...',
    );
    const tokenUrl = 'https://oauth2.googleapis.com/token';
    console.log('🟢 토큰 요청 URL:', tokenUrl);

    try {
      console.log('🟢 토큰 요청 파라미터:', {
        grant_type: 'authorization_code',
        client_id: this.googleClientId ? '설정됨' : '설정안됨',
        client_secret: this.googleClientSecret ? '설정됨' : '설정안됨',
        redirect_uri: this.googleCallbackUrl,
        code: code.substring(0, 10) + '...',
      });

      // 토큰 요청 전 인코딩 확인
      console.log('🟢 redirect_uri 인코딩 상태:', this.googleCallbackUrl);
      console.log(
        '🟢 인코딩된 redirect_uri:',
        encodeURIComponent(this.googleCallbackUrl),
      );

      // 구글 서버에 인가 코드로 토큰을 요청
      const response = await axios.post(
        tokenUrl,
        {
          grant_type: 'authorization_code',
          client_id: this.googleClientId,
          client_secret: this.googleClientSecret,
          redirect_uri: this.googleCallbackUrl,
          code,
        },
        {
          // cache-controll: 인가코드 이슈
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
            Expires: '0',
          },
        },
      );

      // 받은 토큰을 반환
      console.log(
        '🟢 토큰 응답 수신 성공. 토큰 종류:',
        Object.keys(response.data).join(', '),
      );
      return response.data;
    } catch (error) {
      console.error(
        '🚨 구글에서 토큰을 가져오는 중 발생한 오류:',
        error.message,
      );
      if (error.response) {
        console.error('🚨 응답 상태 코드:', error.response.status);
        console.error(
          '🚨 오류 응답 데이터:',
          JSON.stringify(error.response.data, null, 2),
        );
      }
      throw new Error('구글에서 토큰을 가져오는 중 오류 발생');
    }
  }

  // 3. 액세스 토큰을 사용하여 사용자 정보 요청
  async getUserInfo(accessToken: string): Promise<any> {
    console.log(
      '🟢 getUserInfo 메소드 호출됨. 토큰:',
      accessToken.substring(0, 10) + '...',
    );
    const userInfoUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';
    console.log('🟢 사용자 정보 요청 URL:', userInfoUrl);

    try {
      // 사용자 정보 요청 (액세스 토큰을 헤더에 포함)
      console.log('🟢 정보 요청 시작 - 헤더:', {
        Authorization: `Bearer ${accessToken.substring(0, 10)}...`,
      });

      const response = await axios.get(userInfoUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // 응답받은 사용자 정보를 로그로 출력 후 반환
      console.log(
        '🟢 사용자 정보 응답 수신:',
        JSON.stringify(response.data, null, 2),
      );
      return response.data;
    } catch (error) {
      console.error(
        '🚨 구글에서 사용자 정보를 가져오는 중 발생한 오류:',
        error.message,
      );
      if (error.response) {
        console.error('🚨 응답 상태 코드:', error.response.status);
        console.error(
          '🚨 오류 응답 데이터:',
          JSON.stringify(error.response.data, null, 2),
        );
      }
      throw new Error('구글에서 사용자 정보를 가져오는 중 오류 발생');
    }
  }

  // 4. 회원 확인 또는 신규 회원 추가
  async findOrCreateUser(userData: any): Promise<FindUserType> {
    console.log('🟢 findOrCreateUser 메소드 호출됨');
    try {
      console.log(
        '🟢 수신된 구글 유저 데이터:',
        JSON.stringify(userData, null, 2),
      );

      console.log('🟢 데이터베이스에서 사용자 조회 시작. ID:', userData.id);
      const user = await this.googleAuthRepository.findUser({
        id: userData.id,
      });

      if (user) {
        console.log('🟢 DB 조회 결과:', JSON.stringify(user, null, 2));
        console.log('🟢 기존 회원 확인됨');
        return { ...user, isExist: true };
      } else {
        console.log('🟢 DB 조회 결과: 사용자 없음');
        // 신규 회원 등록
        console.log('🟢 신규 사용자 등록 시작');
        const newUserData: Partial<GoogleUser> = {
          id: userData.id,
          email: userData.email,
          verifiedEmail: userData.verified_email,
          name: userData.name,
          givenName: userData.given_name,
          familyName: userData.family_name,
          profileImage: userData.picture,
          isDefaultImage: false,
          connectedAt: new Date(),
        };
        console.log(
          '🟢 저장할 사용자 데이터:',
          JSON.stringify(newUserData, null, 2),
        );

        const newUser = await this.googleAuthRepository.saveUser(newUserData);
        console.log('🟢 새 사용자가 저장됨:', JSON.stringify(newUser, null, 2));

        return { ...newUser, isExist: false };
      }
    } catch (error) {
      console.error(
        '🚨 구글 사용자 확인 또는 추가 중 오류 발생:',
        error.message,
      );
      console.error('🚨 오류 상세:', error.stack);

      // 오류 원인에 대한 더 많은 정보 제공
      if (error.name === 'QueryFailedError') {
        console.error('🚨 SQL 오류:', error.message);
        console.error(
          '🚨 가능한 원인: 테이블이 없거나, 컬럼 이름이 일치하지 않거나, 데이터 유형이 일치하지 않음',
        );
        console.error(
          '🚨 테이블 및 컬럼 이름 확인 필요. 마이그레이션이 필요할 수 있음',
        );
      }

      throw new Error('구글 사용자 확인 또는 추가 중 오류 발생');
    }
  }
}
