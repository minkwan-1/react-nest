import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { KakaoAuthRepository } from './kakao.auth.repository';
import { KakaoUser } from './kakao.auth.entity';

type FindUserType = KakaoUser & { isExist: boolean };

@Injectable()
export class KakaoAuthService {
  private readonly kakaoClientId = process.env.KAKAO_CLIENT_ID;
  private readonly kakaoClientSecret = process.env.KAKAO_CLIENT_SECRET;
  private readonly kakaoCallbackUrl = process.env.KAKAO_CALLBACK_URL;

  constructor(private readonly kakaoAuthRepository: KakaoAuthRepository) {}

  // 1. 카카오 로그인 URL 생성
  getKakaoAuthUrl(): string {
    try {
      return `https://kauth.kakao.com/oauth/authorize?client_id=${this.kakaoClientId}&redirect_uri=${this.kakaoCallbackUrl}&response_type=code&prompt=login`;
    } catch (error) {
      console.error('카카오 인증 URL 생성 중 발생한 오류:', error);
      throw new Error('카카오 인증 URL 생성 중 오류 발생');
    }
  }

  // 2. 인가 코드를 사용하여 토큰 발급 요청
  async getToken(code: string): Promise<any> {
    try {
      const tokenUrl = 'https://kauth.kakao.com/oauth/token';

      // 카카오 서버에 인가 코드로 토큰을 요청
      const response = await axios.post(tokenUrl, null, {
        params: {
          grant_type: 'authorization_code',
          client_id: this.kakaoClientId,
          client_secret: this.kakaoClientSecret,
          redirect_uri: this.kakaoCallbackUrl,
          code,
        },
      });

      // 받은 토큰을 반환
      return response.data;
    } catch (error) {
      console.log('카카오에서 토큰을 가져오는 중 발생한 오류:', error);
      throw new Error('카카오에서 토큰을 가져오는 중 오류 발생');
    }
  }

  // 3. 액세스 토큰을 사용하여 사용자 정보 요청
  async getUserInfo(accessToken: string): Promise<any> {
    const userInfoUrl = 'https://kapi.kakao.com/v2/user/me';

    try {
      // 사용자 정보 요청 (액세스 토큰을 헤더에 포함)
      const response = await axios.get(userInfoUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // 응답받은 사용자 정보를 로그로 출력 후 반환
      console.log('Kakao 사용자 정보 확인 로그:', response.data);
      return response.data;
    } catch (error) {
      console.log('카카오에서 사용자 정보를 가져오는 중 발생한 오류:', error);
      throw new Error('카카오에서 사용자 정보를 가져오는 중 오류 발생');
    }
  }

  // 4. 회원 확인 또는 신규 회원 처리
  async findUser(user: any): Promise<FindUserType> {
    try {
      console.log('구글 유저:', user);
      const existingUser = await this.kakaoAuthRepository.findUser({
        id: user.id,
      });
      console.log('기존 유저 확인을 위한 로그:', existingUser);
      console.log('기존 유저의 타입 확인을 위한 로그:', typeof existingUser);
      if (existingUser === null) {
        return { ...user, isExist: false };
      } else {
        return { ...existingUser, isExist: true };
      }
    } catch (error) {
      console.log('카카오 사용자 확인 또는 추가 중 발생한 오류', error);
      throw new Error('카카오 사용자 확인 또는 추가 중 오류 발생');
    }
  }
}
