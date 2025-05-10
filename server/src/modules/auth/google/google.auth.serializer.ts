import { Injectable, Logger } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GoogleUserSerializer extends PassportSerializer {
  private readonly logger = new Logger(GoogleUserSerializer.name);

  constructor(private readonly usersService: UsersService) {
    super();
  }

  // 유저 객체를 세션에 저장할 때 호출됨
  serializeUser(user: any, done: (err: any, id?: any) => void) {
    this.logger.debug(
      `[세션플로우] 인증된 유저를 세션에 저장 시작 - 유저 ID: ${user.id}`,
    );
    this.logger.verbose(
      `[세션플로우] serializeUser - 전체 유저 데이터: ${JSON.stringify(user)}`,
    );

    // 세션에 user.id만 저장
    done(null, user.id);

    this.logger.debug(`[세션플로우] 세션에 유저 ID 저장 완료`);
  }

  // 세션에서 유저 ID를 읽어 실제 유저 객체로 복원할 때 호출됨
  async deserializeUser(userId: string, done: (err: any, user?: any) => void) {
    this.logger.debug(
      `[세션플로우] 세션에서 유저 복원 시작 - 세션에 저장된 유저 ID: ${userId}`,
    );

    try {
      // DB에서 사용자 정보 조회
      const user = await this.usersService.findById(userId);

      this.logger.debug(`[세션플로우] DB에서 유저 조회 성공`);
      this.logger.verbose(
        `[세션플로우 6] 복원된 유저 데이터: ${JSON.stringify(user)}`,
      );

      // 복원된 유저 객체를 req.user에 할당
      done(null, user);

      this.logger.debug(`[세션플로우] req.user에 유저 데이터 할당 완료`);
    } catch (error) {
      this.logger.error(
        `[세션플로우 X] 유저 복원 실패: ${error.message}`,
        error.stack,
      );
      done(error);
    }
  }
}
