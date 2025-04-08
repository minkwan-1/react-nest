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

  getGoogleAuthUrl(): string {
    try {
      return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.googleClientId}&redirect_uri=${this.googleCallbackUrl}&response_type=code&scope=email profile&prompt=consent&access_type=offline`;
    } catch {
      throw new Error('구글 인증 URL 생성 중 오류 발생');
    }
  }

  async getToken(code: string): Promise<any> {
    const tokenUrl = 'https://oauth2.googleapis.com/token';

    try {
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
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
            Expires: '0',
          },
        },
      );

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('구글에서 토큰을 가져오는 중 오류 발생');
    }
  }

  async getUserInfo(accessToken: string): Promise<any> {
    const userInfoUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';

    try {
      const response = await axios.get(userInfoUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('구글에서 사용자 정보를 가져오는 중 오류 발생');
    }
  }

  async findOrCreateUser(userData: any): Promise<FindUserType> {
    try {
      const user = await this.googleAuthRepository.findUser({
        id: userData.id,
      });

      if (user) {
        return { ...user, isExist: true };
      }

      const {
        id,
        email,
        verified_email: verifiedEmail,
        name,
        given_name: givenName,
        family_name: familyName,
        picture: profileImage,
      } = userData;

      const newUser = await this.googleAuthRepository.saveUser({
        id,
        email,
        verifiedEmail,
        name,
        givenName,
        familyName,
        profileImage,
        isDefaultImage: false,
        connectedAt: new Date(),
      });

      return { ...newUser, isExist: false };
    } catch (error) {
      console.log(error);
      throw new Error('구글 사용자 확인 또는 추가 중 오류 발생');
    }
  }
}
