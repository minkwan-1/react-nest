import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { randomBytes } from 'crypto';
import { NaverAuthRepository } from './naver.auth.repository';
import { NaverUser } from './naver.auth.entity';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

type FindUserType = NaverUser & { isExist: boolean };

@Injectable()
export class NaverAuthService {
  private readonly naverClientId = process.env.NAVER_CLIENT_ID;
  private readonly naverClientSecret = process.env.NAVER_CLIENT_SECRET;
  private readonly naverCallbackUrl = process.env.NAVER_CALLBACK_URL;

  constructor(private readonly naverAuthRepository: NaverAuthRepository) {}

  getNaverAuthUrl(): string {
    const state = randomBytes(16).toString('hex');

    try {
      return `https://nid.naver.com/oauth2.0/authorize?client_id=${this.naverClientId}&redirect_uri=${this.naverCallbackUrl}&response_type=code&state=${state}&prompt=login`;
    } catch {
      throw new Error('네이버 인증 URL 생성 중 오류 발생');
    }
  }

  async getToken(code: string, state: string): Promise<any> {
    const tokenUrl = 'https://nid.naver.com/oauth2.0/token';

    try {
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
    } catch (error) {
      console.log(error);
      throw new Error('네이버에서 토큰을 가져오는 중 오류 발생');
    }
  }

  async getUserInfo(accessToken: string): Promise<any> {
    const userInfoUrl = 'https://openapi.naver.com/v1/nid/me';

    try {
      const response = await axios.get(userInfoUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data.response;
    } catch (error) {
      console.log(error);
      throw new Error('네이버에서 사용자 정보를 가져오는 중 오류 발생');
    }
  }

  async findUser(userData: any): Promise<FindUserType> {
    try {
      const user = await this.naverAuthRepository.findUser({ id: userData.id });
      if (user) {
        return { ...user, isExist: true };
      }

      const { id, email, nickname, profileImage, name } = userData;

      const newUser = {
        id,
        email,
        nickname,
        name,
        profileImage,
        connectedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return { ...newUser, isExist: false };
    } catch {
      throw new HttpException(
        '네이버 사용자 확인 또는 추가 중 오류 발생',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createUser(userData: any) {
    return await this.naverAuthRepository.saveUser(userData);
  }
}
