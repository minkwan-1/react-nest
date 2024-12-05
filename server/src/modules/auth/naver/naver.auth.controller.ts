import { Controller, Get, Query, Redirect } from '@nestjs/common';
import axios from 'axios';

@Controller('auth/naver')
export class NaverAuthController {
  private readonly naverClientId = process.env.NAVER_CLIENT_ID;
  private readonly naverClientSecret = process.env.NAVER_CLIENT_SECRET;
  private readonly naverCallbackUrl = process.env.NAVER_CALLBACK_URL;

  // 메모리에 사용자 정보를 저장
  private users: any[] = [];

  // 1. 네이버 로그인 URL로 리다이렉트
  @Get('login')
  @Redirect()
  async login() {
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${this.naverClientId}&redirect_uri=${this.naverCallbackUrl}&response_type=code`;
    console.log('Naver Auth URL:', naverAuthUrl); // 로그인 URL 로그
    return { url: naverAuthUrl };
  }

  // 2. 네이버 리다이렉트 URI로 리다이렉션 후 인가 코드 받기
  @Get('redirect')
  @Redirect('http://localhost:5173/', 302)
  async redirect(@Query('code') code: string, @Query('state') state: string) {
    console.log('Received authorization code:', code); // 전달받은 인가 코드 확인

    // 3. 인가 코드를 통해 토큰 발급 요청
    const tokenUrl = 'https://nid.naver.com/oauth2.0/token';
    const tokenResponse = await axios.post(tokenUrl, null, {
      params: {
        grant_type: 'authorization_code',
        client_id: this.naverClientId,
        client_secret: this.naverClientSecret,
        redirect_uri: this.naverCallbackUrl,
        code,
        state,
      },
    });
    console.log('Token response:', tokenResponse.data); // 토큰 발급 응답 확인
    const tokens = tokenResponse.data;

    // 4. 토큰을 사용하여 사용자 정보 가져오기
    const userInfoUrl = 'https://openapi.naver.com/v1/nid/me';
    const userResponse = await axios.get(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });
    console.log('User info:', userResponse.data); // 사용자 정보 확인
    const user = userResponse.data.response;

    // 5. 회원 확인 또는 신규 회원 등록 (메모리 저장)
    const existingUser = this.users.find((u) => u.id === user.id);
    let userInfo;
    if (!existingUser) {
      // 신규 사용자 추가 (메모리에 저장)
      userInfo = { id: user.id, nickname: user.nickname };
      this.users.push(userInfo);
      console.log('New user added:', userInfo); // 신규 사용자 추가 로그
    } else {
      userInfo = existingUser;
      console.log('Existing user:', userInfo); // 기존 사용자 정보 로그
    }

    // 6. 로그인 완료 후 프론트엔드로 리다이렉션
    return {
      message: '로그인 성공',
      user: userInfo,
    };
  }
}
