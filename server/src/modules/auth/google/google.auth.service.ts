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

    // 요청 전에 모든 정보 로그
    console.log('🛰️ 구글 토큰 요청을 다음 파라미터로 보냅니다:');
    console.log({
      grant_type: 'authorization_code',
      client_id: this.googleClientId,
      client_secret: this.googleClientSecret,
      redirect_uri: this.googleCallbackUrl,
      code,
    });

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

      // 성공 응답 로그
      console.log('✅ 구글로부터 토큰 응답을 정상적으로 받았습니다:');
      console.log(response.data);

      return response.data;
    } catch (e) {
      // 에러 전체 로그
      console.error('❌ 구글 토큰 요청 중 오류가 발생했습니다.');
      console.error('🔗 요청 URL:', tokenUrl);
      console.error('📦 요청 페이로드:', {
        grant_type: 'authorization_code',
        client_id: this.googleClientId,
        client_secret: this.googleClientSecret,
        redirect_uri: this.googleCallbackUrl,
        code,
      });
      console.error('📨 응답 데이터:', e.response?.data);
      console.error('📟 응답 상태 코드:', e.response?.status);
      console.error('📄 응답 헤더:', e.response?.headers);
      console.error('🧨 전체 에러 객체:', e);

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

  async refreshToken(refreshToken: string): Promise<any> {
    const tokenUrl = 'https://oauth2.googleapis.com/token';

    try {
      const response = await axios.post(
        tokenUrl,
        {
          grant_type: 'refresh_token',
          client_id: this.googleClientId,
          client_secret: this.googleClientSecret,
          refresh_token: refreshToken,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error: '리프레시 토큰을 통한 액세스 토큰 갱신 중 오류 발생',
          message: error.message,
          details: error.response?.data,
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

  async findOrCreateUser(
    userData: any,
    refreshToken?: string,
  ): Promise<FindUserType & { registrationComplete: boolean }> {
    try {
      const user = await this.googleAuthRepository.findUser({
        id: userData.id,
      });

      if (user) {
        if (refreshToken) {
          await this.googleAuthRepository.updateRefreshToken(
            userData.id,
            refreshToken,
          );
        }
        const registrationComplete = user.registrationComplete ?? false;
        return { ...user, isExist: true, registrationComplete };
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
        registrationComplete: false,
        refreshToken,
      });

      return { ...newUser, isExist: false, registrationComplete: false };
    } catch {
      throw new HttpException(
        '구글 사용자 확인 또는 추가 중 오류 발생',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserByRefreshToken(
    refreshToken: string,
  ): Promise<GoogleUser | null> {
    try {
      return await this.googleAuthRepository.findUserByRefreshToken(
        refreshToken,
      );
    } catch {
      throw new HttpException(
        '리프레시 토큰으로 사용자 조회 중 오류 발생',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    try {
      await this.googleAuthRepository.updateRefreshToken(userId, refreshToken);
    } catch {
      throw new HttpException(
        '리프레시 토큰 업데이트 중 오류 발생',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async completeRegistration(userId: string): Promise<void> {
    try {
      const user = await this.googleAuthRepository.findUser({ id: userId });
      if (!user) {
        throw new HttpException(
          '사용자를 찾을 수 없습니다',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.googleAuthRepository.saveUser({
        ...user,
        registrationComplete: true,
      });
    } catch {
      throw new HttpException(
        '사용자 등록 완료 처리 중 오류 발생',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
