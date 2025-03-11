import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 유저가 카카오 로그인 버튼을 클릭했을 때 라우팅 처리
  // : 구체적인 로직은 서비스에서 함수 형태로 구현

  // 유저가 네이버 로그인 버튼을 클릭했을 때 라우팅 처리
  // : 구체적인 로직은 서비스에서 함수 형태로 구현

  // 유저가 구글 로그인 버튼을 클릭했을 때 라우팅 처리
  // : 구체적인 로직은 서비스에서 함수 형태로 구현

  // 공통 로직으로 소셜 로그인 처리
  // : 구체적인 로직은 서비스에서 함수 형태로 구현

  // 1. 기존 사용자인지 확인
  // : 구체적인 로직은 서비스에서 함수 형태로 구현

  // 1-1. 이미 가입한 유저라면 /home으로 리디렉션
  // : 구체적인 로직은 서비스에서 함수 형태로 구현

  // 1-2. 신규 사용자인 경우 /phone 경로로 리디렉션
  // : 구체적인 로직은 서비스에서 함수 형태로 구현
}
