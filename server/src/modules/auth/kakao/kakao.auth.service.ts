import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { KakaoAuthRepository } from './kakao.auth.repository';
import { KakaoUser } from './kakao.auth.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class KakaoAuthService {
  private readonly kakaoClientId = process.env.KAKAO_CLIENT_ID;
  private readonly kakaoClientSecret = process.env.KAKAO_CLIENT_SECRET;
  private readonly kakaoCallbackUrl = process.env.KAKAO_CALLBACK_URL;

  constructor(private readonly kakaoAuthRepository: KakaoAuthRepository) {}

  // 1. 카카오 로그인 URL 생성
  getKakaoAuthUrl(): string {
    return `https://kauth.kakao.com/oauth/authorize?client_id=${this.kakaoClientId}&redirect_uri=${this.kakaoCallbackUrl}&response_type=code&state=kakao`;
  }

  // 2. 인가 코드를 사용하여 토큰 발급 요청
  async getToken(code: string): Promise<any> {
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
  }

  // 3. 액세스 토큰을 사용하여 사용자 정보 요청
  async getUserInfo(accessToken: string): Promise<any> {
    const userInfoUrl = 'https://kapi.kakao.com/v2/user/me';

    // 사용자 정보 요청 (액세스 토큰을 헤더에 포함)
    const response = await axios.get(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // 응답받은 사용자 정보를 로그로 출력 후 반환
    console.log('Kakao 사용자 정보 확인 로그:', response.data);
    return response.data;
  }

  // 4. 회원 확인 또는 신규 회원 처리
  async registerOrFindUser(user: any): Promise<KakaoUser> {
    // 4.1. user 객체에서 필요한 속성들 추출
    let kakaoAccountId = user.id;
    if (!this.isValidUUID(kakaoAccountId)) {
      // 만약 kakaoAccountId가 숫자라면, uuid로 변환 (또는 숫자를 적절히 변환)
      kakaoAccountId = uuidv4(); // 임시로 UUID로 변환하는 방식 사용
    }
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
      // 기존 유저면 200 상태 코드와 함께 유저 정보 반환
      throw new HttpException(
        {
          message: '로그인 성공',
          user: existingUser,
        },
        HttpStatus.OK,
      );
    }

    // 4.3. 신규 회원 처리
    const newUser = await this.kakaoAuthRepository.createNewUser({
      id: kakaoAccountId,
      connectedAt: new Date(user.connected_at),
      nickname,
      profileImage,
      thumbnailImage,
      isDefaultImage,
    });

    // 신규 유저인 경우 400 응답과 함께 유저 정보 전달
    throw new HttpException(
      {
        message: '신규 회원입니다. 전화번호 인증이 필요합니다.',
        user: newUser,
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  // 유효한 UUID인지 체크하는 함수
  private isValidUUID(id: string): boolean {
    const regex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return regex.test(id);
  }
}
