import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import axios from 'axios';

@Injectable()
export class NaverAuthService {
  private readonly naverClientId = process.env.NAVER_CLIENT_ID;
  private readonly naverClientSecret = process.env.NAVER_CLIENT_SECRET;
  private readonly naverCallbackUrl = process.env.NAVER_CALLBACK_URL;

  private users: any[] = [];

  getNaverAuthUrl(): string {
    const state = randomBytes(16).toString('hex');
    console.log(state);
    // 서버에 저장 로직 추가
    return `https://nid.naver.com/oauth2.0/authorize?client_id=${this.naverClientId}&redirect_uri=${this.naverCallbackUrl}&response_type=code&state=${state}`;
  }

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

  async getUserInfo(accessToken: string): Promise<any> {
    const userInfoUrl = 'https://openapi.naver.com/v1/nid/me';
    const response = await axios.get(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }

  registerOrFindUser(user: any): any {
    const existingUser = this.users.find((u) => u.id === user.id);
    if (!existingUser) {
      const newUser = { id: user.id, nickname: user.nickname };
      this.users.push(newUser);
      return newUser;
    }
    return existingUser;
  }
}
