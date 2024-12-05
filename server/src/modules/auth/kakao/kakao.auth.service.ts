import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class KakaoAuthService {
  private readonly kakaoClientId = process.env.KAKAO_CLIENT_ID;
  private readonly kakaoClientSecret = process.env.KAKAO_CLIENT_SECRET;
  private readonly kakaoCallbackUrl = process.env.KAKAO_CALLBACK_URL;

  // 메모리에 사용자 정보를 저장
  private users: any[] = [];

  // 카카오 로그인 URL 생성
  getKakaoAuthUrl(): string {
    return `https://kauth.kakao.com/oauth/authorize?client_id=${this.kakaoClientId}&redirect_uri=${this.kakaoCallbackUrl}&response_type=code`;
  }

  // 인가 코드를 사용하여 토큰 발급 요청
  async getToken(code: string): Promise<any> {
    const tokenUrl = 'https://kauth.kakao.com/oauth/token';
    const response = await axios.post(tokenUrl, null, {
      params: {
        grant_type: 'authorization_code',
        client_id: this.kakaoClientId,
        client_secret: this.kakaoClientSecret,
        redirect_uri: this.kakaoCallbackUrl,
        code,
      },
    });
    return response.data;
  }

  // 액세스 토큰을 사용하여 사용자 정보 요청
  async getUserInfo(accessToken: string): Promise<any> {
    const userInfoUrl = 'https://kapi.kakao.com/v2/user/me';
    const response = await axios.get(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }

  // 회원 확인 또는 신규 회원 추가
  registerOrFindUser(user: any): any {
    const existingUser = this.users.find((u) => u.id === user.id);
    if (!existingUser) {
      const newUser = { id: user.id, nickname: user.properties.nickname };
      this.users.push(newUser);
      return newUser;
    }
    return existingUser;
  }
}
