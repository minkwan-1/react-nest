import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { KakaoAuthRepository } from './kakao.auth.repository';
import { KakaoUser } from './kakao.auth.entity';

@Injectable()
export class KakaoAuthService {
  private readonly kakaoClientId = process.env.KAKAO_CLIENT_ID;
  private readonly kakaoClientSecret = process.env.KAKAO_CLIENT_SECRET;
  private readonly kakaoCallbackUrl = process.env.KAKAO_CALLBACK_URL;

  constructor(private readonly kakaoAuthRepository: KakaoAuthRepository) {}

  // 1. 카카오 로그인 URL 생성
  getKakaoAuthUrl(): string {
    return `https://kauth.kakao.com/oauth/authorize?client_id=${this.kakaoClientId}&redirect_uri=${this.kakaoCallbackUrl}&response_type=code&prompt=login`;
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
      console.log(error);
      throw new Error('토큰 요청 에러');
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
      console.log(error);
      throw new Error('카카오 유저 정보 오류');
    }
  }

  // 4. 회원 확인 또는 신규 회원 처리
  async registerOrFindUser(user: any): Promise<{
    message: string;
    user:
      | KakaoUser
      | {
          nickname: string;
          profileImage: string;
          thumbnailImage: string;
          isDefaultImage: string | boolean;
          kakaoAccountId: number;
        };
    isExisted: boolean;
  }> {
    // 4.1. user 객체에서 필요한 속성들 추출
    const kakaoAccountId = user.id;

    const nickname = user?.kakao_account?.profile?.nickname || '익명';
    const profileImage = user?.kakao_account?.profile?.profile_image_url || '';
    const thumbnailImage =
      user?.kakao_account?.profile?.thumbnail_image_url || '';
    const isDefaultImage =
      user?.kakao_account?.profile?.is_default_image || false;

    // 4.2. 기존 유저 확인
    const existingUser =
      await this.kakaoAuthRepository.findUserByAccountId(kakaoAccountId);
    if (existingUser) {
      // 기존 유저면 성공 메시지와 함께 유저 정보 반환
      return {
        message: '로그인 필요',
        isExisted: true,
        user: existingUser,
      };
    } else {
      return {
        message: '회원가입 필요',
        isExisted: false,
        user: {
          nickname,
          profileImage,
          thumbnailImage,
          isDefaultImage,
          kakaoAccountId,
        },
      };
    }

    // 4.3. 신규 회원 처리
    // const newUser = await this.kakaoAuthRepository.createNewUser({
    //   id: kakaoAccountId,
    //   connectedAt: new Date(user.connected_at),
    //   nickname,
    //   profileImage,
    //   thumbnailImage,
    //   isDefaultImage,
    // });

    // return {
    //   message: '신규 회원입니다. 전화번호 인증이 필요합니다.',
    //   user: newUser,
    // };
  }
}
