import { Injectable } from '@nestjs/common';
import { GoogleAuthRepository } from './google.auth.repository';
import { GoogleUser } from './google.auth.entity';
import axios from 'axios';

type FindUserType = GoogleUser & { isExist: boolean };

@Injectable()
export class GoogleAuthService {
  private readonly googleClientId = process.env.GOOGLE_CLIENT_ID;
  private readonly googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
  private readonly googleCallbackUrl = process.env.GOOGLE_CALLBACK_URL;

  constructor(private readonly googleAuthRepository: GoogleAuthRepository) {}

  // 1. 구글 로그인 URL 생성
  getGoogleAuthUrl(): string {
    try {
      return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.googleClientId}&redirect_uri=${this.googleCallbackUrl}&response_type=code&scope=email profile&prompt=consent`;
    } catch (error) {
      console.log('구글 인증 URL 생성 중 발생한 오류:', error);
      throw new Error('구글 인증 URL 생성 중 오류 발생');
    }
  }
  // 2. 인가 코드를 사용하여 토큰 발급 요청
  async getToken(code: string): Promise<any> {
    const tokenUrl = 'https://oauth2.googleapis.com/token';

    try {
      // 구글 서버에 인가 코드로 토큰을 요청
      const response = await axios.post(tokenUrl, null, {
        params: {
          grant_type: 'authorization_code',
          client_id: this.googleClientId,
          client_secret: this.googleClientSecret,
          redirect_uri: this.googleCallbackUrl,
          code,
        },
      });

      // 받은 토큰을 반환
      return response.data;
    } catch (error) {
      console.log('구글에서 토큰을 가져오는 중 발생한 오류:', error);
      throw new Error('구글에서 토큰을 가져오는 중 오류 발생');
    }
  }

  // 3. 액세스 토큰을 사용하여 사용자 정보 요청
  async getUserInfo(accessToken: string): Promise<any> {
    const userInfoUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';

    try {
      // 사용자 정보 요청 (액세스 토큰을 헤더에 포함)
      const response = await axios.get(userInfoUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // 응답받은 사용자 정보를 로그로 출력 후 반환
      return response.data;
    } catch (error) {
      console.log('구글에서 사용자 정보를 가져오는 중 발생한 오류:', error);
      throw new Error('구글에서 사용자 정보를 가져오는 중 오류 발생');
    }
  }

  // 4. 회원 확인 또는 신규 회원 추가
  async findUser(user: any): Promise<FindUserType> {
    try {
      console.log('구글 유저:', user);
      const existingUser = await this.googleAuthRepository.findUser({
        id: user.id,
      });
      console.log('기존 유저 확인을 위한 로그:', existingUser);
      console.log('기존 유저의 타입 확인을 위한 로그:', typeof existingUser);
      if (existingUser === null) {
        return { ...user, isExist: false };
      } else {
        return { ...existingUser, isExist: true };
      }
    } catch (error) {
      console.log('사용자 확인 또는 추가 중 발생한 오류', error);
      throw new Error('사용자 확인 또는 추가 중 오류 발생');
    }
  }
}
