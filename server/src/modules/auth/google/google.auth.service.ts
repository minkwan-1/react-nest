import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { GoogleAuthRepository } from './google.auth.repository';
import { GoogleUser } from './google.auth.entity';
import axios from 'axios';
import { convertAxiosErrorToHttpException } from 'src/filters/utils/axios-error.util';

type FindUserType = GoogleUser & { isExist: boolean };

@Injectable()
export class GoogleAuthService {
  private readonly googleClientId = process.env.GOOGLE_CLIENT_ID;
  private readonly googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
  private readonly googleCallbackUrl = process.env.GOOGLE_CALLBACK_URL;

  constructor(private readonly googleAuthRepository: GoogleAuthRepository) {}

  getGoogleAuthUrl(): string {
    try {
      return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
        this.googleClientId
      }&redirect_uri=${
        this.googleCallbackUrl
      }&response_type=code&scope=email profile&prompt=consent`;
    } catch {
      throw new HttpException(
        '구글 인증 URL 생성 중 오류 발생',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // convertAxiosErrorToHttpException()를 사용하기 위해 try~catch를 계속 작성해야 하는가? => interceptor
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
      throw convertAxiosErrorToHttpException(error);
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
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error: '구글 사용자 정보 요청 중 오류 발생',
          message: error.message,
          details: error.response?.data,
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async findUser(userData: any): Promise<FindUserType> {
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

      const newUser = {
        id,
        email,
        verifiedEmail,
        name,
        givenName,
        familyName,
        profileImage,
        isDefaultImage: false,
        connectedAt: new Date(),
      };

      return { ...newUser, isExist: false };
    } catch {
      throw new HttpException(
        '구글 사용자 확인 또는 추가 중 오류 발생',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createUser(userData: any) {
    return await this.googleAuthRepository.saveUser(userData);
  }
}
