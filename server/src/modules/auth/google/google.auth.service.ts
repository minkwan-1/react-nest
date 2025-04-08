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
      // 매번 새로운 세션을 강제하는 파라미터 추가
      const timestamp = new Date().getTime();
      return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
        this.googleClientId
      }&redirect_uri=${
        this.googleCallbackUrl
      }&response_type=code&scope=email profile&prompt=consent&access_type=offline&state=${timestamp}`;
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
      // 더 자세한 오류 정보 로깅
      if (error.response) {
        console.log('토큰 오류 응답:', error.response.data);
        console.log('토큰 오류 상태:', error.response.status);
      }
      throw new Error(
        `구글에서 토큰을 가져오는 중 오류 발생: ${error.message}`,
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
      if (error.response) {
        console.log('사용자 정보 오류 응답:', error.response.data);
        console.log('사용자 정보 오류 상태:', error.response.status);
      }
      throw new Error(
        `구글에서 사용자 정보를 가져오는 중 오류 발생: ${error.message}`,
      );
    }
  }

  async findOrCreateUser(
    userData: any,
  ): Promise<FindUserType & { registrationComplete: boolean }> {
    try {
      const user = await this.googleAuthRepository.findUser({
        id: userData.id,
      });

      if (user) {
        // registrationComplete이 undefined일 경우 기본값으로 false 설정
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
      });

      return { ...newUser, isExist: false, registrationComplete: false };
    } catch (error) {
      console.log('사용자 조회/생성 오류:', error);
      throw new Error('구글 사용자 확인 또는 추가 중 오류 발생');
    }
  }

  // 테스트 전용 - 사용자 등록 완료 상태 업데이트
  async completeRegistration(userId: string): Promise<void> {
    try {
      const user = await this.googleAuthRepository.findUser({ id: userId });
      if (!user) {
        throw new Error('사용자를 찾을 수 없습니다');
      }

      await this.googleAuthRepository.saveUser({
        ...user,
        registrationComplete: true,
      });
    } catch (error) {
      console.log('등록 완료 처리 오류:', error);
      throw new Error('사용자 등록 완료 처리 중 오류 발생');
    }
  }
}
