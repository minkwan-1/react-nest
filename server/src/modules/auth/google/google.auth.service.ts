import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error: '구글 액세스 토큰 요청 중 오류 발생',
          message: e.message,
          details: e.response?.data,
        },
        HttpStatus.BAD_GATEWAY,
      );
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

  async createUser(userData: any) {
    const {
      id,
      email,
      verified_email: verifiedEmail,
      name,
      given_name: givenName,
      family_name: familyName,
      picture: profileImage,
    } = userData;

    return await this.googleAuthRepository.saveUser({
      id,
      email,
      verifiedEmail,
      name,
      givenName,
      familyName,
      profileImage,
      isDefaultImage: false,
      connectedAt: new Date(),
      registrationComplete: false,
      isExist: true,
    });
  }

  async findUser(
    userData: any,
  ): Promise<FindUserType & { registrationComplete: boolean }> {
    try {
      const user = await this.googleAuthRepository.findUser({
        id: userData.id,
      });

      if (user) {
        const registrationComplete = user.registrationComplete ?? false;
        return { ...user, isExist: true, registrationComplete };
      }
    } catch {
      throw new HttpException(
        '구글 사용자 확인 또는 추가 중 오류 발생',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(userData: { id: string; registrationComplete: boolean }) {
    const { id, registrationComplete } = userData;

    try {
      const updatedUser =
        await this.googleAuthRepository.updateUserRegistrationStatus(
          id,
          registrationComplete,
        );
      return updatedUser;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: '구글 사용자 정보 업데이트 중 오류 발생',
          message: error.message,
          details: error.response?.data,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async isValidExistingUser(userId: string): Promise<boolean> {
    try {
      const user = await this.googleAuthRepository.findUser({ id: userId });
      return user?.isExist === true && user?.registrationComplete === true;
    } catch {
      throw new HttpException(
        '기존 유저 확인 중 오류 발생',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
