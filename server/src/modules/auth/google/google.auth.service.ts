import { Injectable } from '@nestjs/common';
import { GoogleAuthRepository } from './google.auth.repository';
import { GoogleUser } from './google.auth.entity';
import axios from 'axios';

@Injectable()
export class GoogleAuthService {
  private readonly googleClientId = process.env.GOOGLE_CLIENT_ID;
  private readonly googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
  private readonly googleCallbackUrl = process.env.GOOGLE_CALLBACK_URL;

  constructor(private readonly googleAuthRepository: GoogleAuthRepository) {}

  // 1. 구글 로그인 URL 생성
  getGoogleAuthUrl(): string {
    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.googleClientId}&redirect_uri=${this.googleCallbackUrl}&response_type=code&scope=email profile`;
  }
  // 2. 인가 코드를 사용하여 토큰 발급 요청
  async getToken(code: string): Promise<any> {
    const tokenUrl = 'https://oauth2.googleapis.com/token';

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
  }

  // 3. 액세스 토큰을 사용하여 사용자 정보 요청
  async getUserInfo(accessToken: string): Promise<any> {
    const userInfoUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';

    // 사용자 정보 요청 (액세스 토큰을 헤더에 포함)
    const response = await axios.get(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // 응답받은 사용자 정보를 로그로 출력 후 반환
    return response.data;
  }

  // 4. 회원 확인 또는 신규 회원 추가
  async registerOrFindUser(user: any): Promise<GoogleUser> {
    console.log('구글 유저:', user);
    // 4.1. user 객체에서 필요한 속성들 추출
    const nickname = user?.name || '익명';
    const profileImage = user?.picture || '';
    // 수정 필요 --------------------------------------------
    const isDefaultImage = user?.picture || false;

    // 4.2. 새로운 유저를 생성하거나, 기존 유저를 업데이트
    return this.googleAuthRepository.findOrCreateUser({
      id: user.id,
      connectedAt: new Date(user.connected_at),
      nickname,
      profileImage,
      isDefaultImage,
    });
  }
}
