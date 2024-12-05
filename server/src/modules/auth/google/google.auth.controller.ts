import { Controller, Get, Query, Redirect } from '@nestjs/common';
import axios from 'axios';

@Controller('auth/google')
export class GoogleAuthController {
  private readonly googleClientId = process.env.GOOGLE_CLIENT_ID;
  private readonly googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
  private readonly googleCallbackUrl = process.env.GOOGLE_CALLBACK_URL;

  // 메모리에 사용자 정보를 저장
  private users: any[] = [];

  // 1. 구글 로그인 URL로 리다이렉트
  @Get('login')
  @Redirect()
  async login() {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.googleClientId}&redirect_uri=${this.googleCallbackUrl}&response_type=code&scope=email profile`;
    console.log('Google Auth URL:', googleAuthUrl); // 로그인 URL 로그
    return { url: googleAuthUrl };
  }

  // 2. 구글 리다이렉트 URI로 리다이렉션 후 인가 코드 받기
  @Get('redirect')
  @Redirect('http://localhost:5173/', 302)
  async redirect(@Query('code') code: string) {
    console.log('Received authorization code:', code); // 전달받은 인가 코드 확인

    // 3. 인가 코드를 통해 토큰 발급 요청
    const tokenUrl = 'https://oauth2.googleapis.com/token';
    const tokenResponse = await axios.post(tokenUrl, {
      client_id: this.googleClientId,
      client_secret: this.googleClientSecret,
      redirect_uri: this.googleCallbackUrl,
      grant_type: 'authorization_code',
      code,
    });
    console.log('Token response:', tokenResponse.data); // 토큰 발급 응답 확인
    const tokens = tokenResponse.data;

    // 4. 토큰을 사용하여 사용자 정보 가져오기
    const userInfoUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';
    const userResponse = await axios.get(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });
    console.log('User info:', userResponse.data); // 사용자 정보 확인
    const user = userResponse.data;

    // 5. 회원 확인 또는 신규 회원 등록 (메모리 저장)
    const existingUser = this.users.find((u) => u.id === user.id);
    let userInfo;
    if (!existingUser) {
      // 신규 사용자 추가 (메모리에 저장)
      userInfo = { id: user.id, email: user.email, name: user.name };
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
