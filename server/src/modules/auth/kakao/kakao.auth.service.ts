import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { KakaoAuthRepository } from './kakao.auth.repository';
import { KakaoUser } from './kakao.auth.entity';

@Injectable()
export class KakaoAuthService {
  private readonly kakaoClientId = process.env.KAKAO_CLIENT_ID;
  private readonly kakaoClientSecret = process.env.KAKAO_CLIENT_SECRET;
  private readonly kakaoCallbackUrl = process.env.KAKAO_CALLBACK_URL;

  constructor(private readonly kakaoAuthRepository: KakaoAuthRepository) {}

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
    console.log('Kakao User Info:', response.data);
    return response.data;
  }

  // 회원 확인 또는 신규 회원 추가
  async registerOrFindUser(user: any): Promise<KakaoUser> {
    // user에서 nickname, profileImage, thumbnailImage 등을 가져올 때 올바른 속성 사용
    const nickname = user?.kakao_account?.profile?.nickname || '익명';
    const profileImage = user?.kakao_account?.profile?.profile_image_url || '';
    const thumbnailImage =
      user?.kakao_account?.profile?.thumbnail_image_url || '';
    const isDefaultImage =
      user?.kakao_account?.profile?.is_default_image || false;

    return this.kakaoAuthRepository.findOrCreateUser({
      id: user.id,
      connectedAt: new Date(user.connected_at),
      nickname,
      profileImage,
      thumbnailImage,
      isDefaultImage,
    });
  }
}
