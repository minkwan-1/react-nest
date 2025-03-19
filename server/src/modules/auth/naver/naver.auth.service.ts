import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { randomBytes } from 'crypto';
import { NaverAuthRepository } from './naver.auth.repository';
import { NaverUser } from './naver.auth.entity';

type FindUserType = NaverUser & { isExist: boolean };

@Injectable()
export class NaverAuthService {
  private readonly naverClientId = process.env.NAVER_CLIENT_ID;
  private readonly naverClientSecret = process.env.NAVER_CLIENT_SECRET;
  private readonly naverCallbackUrl = process.env.NAVER_CALLBACK_URL;

  constructor(private readonly naverAuthRepository: NaverAuthRepository) {}

  // 1. 네이버 로그인 URL 생성
  getNaverAuthUrl(): string {
    const state = randomBytes(16).toString('hex');
    return `https://nid.naver.com/oauth2.0/authorize?client_id=${this.naverClientId}&redirect_uri=${this.naverCallbackUrl}&response_type=code&state=${state}&prompt=login`;
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

  async findUser(user: any): Promise<FindUserType> {
    console.log('네이버 유저:', user);
    const existingUser = await this.naverAuthRepository.findUser({
      id: user.id,
    });
    console.log('기존 유저 확인을 위한 로그:', existingUser);
    console.log('기존 유저의 타입 확인을 위한 로그:', typeof existingUser);
    if (existingUser === null) {
      return { ...user, isExist: false };
    } else {
      return { ...existingUser, isExist: true };
    }
  }
}
