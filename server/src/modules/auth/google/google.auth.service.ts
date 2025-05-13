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

  // 1. Google OAuth 인증 URL 생성
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

  // 2. 인가 코드로 액세스 토큰을 얻기 위한 메소드
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
      // 3. 에러 발생 시 처리
      throw convertAxiosErrorToHttpException(error);
    }
  }

  // 4. 액세스 토큰으로 구글 사용자 정보 조회
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

  // 5. 기존 사용자 확인 및 신규 사용자 데이터 반환
  async findUser(userData: any): Promise<FindUserType> {
    try {
      const user = await this.googleAuthRepository.findUser({
        id: userData.id,
      });

      if (user) {
        // 6. 기존 사용자 반환
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
      // 7. 신규 사용자 데이터 반환
      return { ...newUser, isExist: false };
    } catch {
      throw new HttpException(
        '구글 사용자 확인 또는 추가 중 오류 발생',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 8. 구글 사용자 정보를 DB에 저장하는 메소드
  async createUser(userData: any) {
    // 9. 사용자 정보 저장
    return await this.googleAuthRepository.saveUser(userData);
  }
}
