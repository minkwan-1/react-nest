import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { randomBytes } from 'crypto';
import { NaverAuthRepository } from './naver.auth.repository';
import { NaverUser } from './naver.auth.entity';

@Injectable()
export class NaverAuthService {
  private readonly naverClientId = process.env.NAVER_CLIENT_ID;
  private readonly naverClientSecret = process.env.NAVER_CLIENT_SECRET;
  private readonly naverCallbackUrl = process.env.NAVER_CALLBACK_URL;

  constructor(private readonly naverAuthRepository: NaverAuthRepository) {}

  // 1. 네이버 로그인 URL 생성
  getNaverAuthUrl(): string {
    const state = randomBytes(16).toString('hex');
    return `https://nid.naver.com/oauth2.0/authorize?client_id=${this.naverClientId}&redirect_uri=${this.naverCallbackUrl}&response_type=code&state=${state}`;
  }

  // 2. 인가 코드를 사용하여 토큰 발급 요청
  async getToken(code: string, state: string): Promise<any> {
    const tokenUrl = 'https://nid.naver.com/oauth2.0/token';
    const response = await axios.post(tokenUrl, null, {
      params: {
        grant_type: 'authorization_code',
        client_id: this.naverClientId,
        client_secret: this.naverClientSecret,
        redirect_uri: this.naverCallbackUrl,
        code,
        state,
      },
    });
    return response.data;
  }

  // 3. 액세스 토큰을 사용하여 사용자 정보 요청
  async getUserInfo(accessToken: string): Promise<any> {
    const userInfoUrl = 'https://openapi.naver.com/v1/nid/me';
    const response = await axios.get(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('Naver API Response:', response.data.response);
    return response.data.response;
  }

  // 4. 회원 확인 또는 신규 회원 처리
  async registerOrFindUser(
    user: any,
  ): Promise<{ message: string; user: NaverUser }> {
    const naverAccountId = user?.id;
    const nickname = user?.nickname || '익명';
    const profileImage = user?.profile_image || ''; // profile_image로 수정
    const email = user?.email || '';
    const name = user?.name || '';

    // 4.2. 기존 유저 확인
    const existingUser =
      await this.naverAuthRepository.findUserByAccountId(naverAccountId);
    if (existingUser) {
      return {
        message: '로그인 성공',
        user: existingUser,
      };
    }

    // 4.3. 신규 회원 처리
    const newUser = await this.naverAuthRepository.createNewUser({
      id: naverAccountId,
      email,
      nickname,
      profileImage,
      name,
    });

    return {
      message: '신규 회원입니다. 전화번호 인증이 필요합니다.',
      user: newUser,
    };
  }
}
