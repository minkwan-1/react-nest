import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleUser } from './google.auth.entity';

@Injectable()
export class GoogleAuthRepository {
  constructor(
    @InjectRepository(GoogleUser)
    private readonly googleUserRepository: Repository<GoogleUser>,
  ) {}

  // 1. 사용자 정보가 존재하는지 확인하고, 없으면 생성
  async findOrCreateUser(user: any): Promise<GoogleUser> {
    // 1.1. 기존 사용자 찾기 (id로)
    let existingUser = await this.googleUserRepository.findOneBy({
      id: user.id,
    });

    // 1.2. 연결된 날짜 처리
    const connectedAt = new Date(user.connectedAt);
    const validConnectedAt = isNaN(connectedAt.getTime())
      ? new Date() // 유효하지 않은 날짜일 경우 현재 날짜로 설정
      : connectedAt;

    // 1.3. 사용자 프로필 관련 값들 가져오기 (nickname, profileImage, thumbnailImage, isDefaultImage)
    const nickname = user.nickname || '익명';
    const profileImage = user.profileImage || '';
    const isDefaultImage = user.isDefaultImage || false;

    // 2. 기존 사용자가 없다면 신규 사용자 생성
    if (!existingUser) {
      existingUser = this.googleUserRepository.create({
        id: user.id,
        connectedAt: validConnectedAt,
        nickname,
        profileImage,
        isDefaultImage,
      });

      // 2.1. 신규 사용자 저장
      await this.googleUserRepository.save(existingUser);
      console.log('New user created:', existingUser);
    } else {
      let updated = false;

      // 3. 기존 사용자 정보 업데이트 여부 체크
      // 3.1. nickname, profileImage, thumbnailImage, isDefaultImage의 값 비교 후 업데이트
      if (existingUser.nickname !== nickname) {
        existingUser.nickname = nickname;
        updated = true;
      }
      if (existingUser.profileImage !== profileImage) {
        existingUser.profileImage = profileImage;
        updated = true;
      }
      if (existingUser.isDefaultImage !== isDefaultImage) {
        existingUser.isDefaultImage = isDefaultImage;
        updated = true;
      }

      // 3.2. 변경 사항이 있을 경우만 업데이트
      if (updated) {
        await this.googleUserRepository.save(existingUser);
        console.log('User updated:', existingUser);
      } else {
        console.log('No changes found for user:', existingUser);
      }
    }

    // 4. 최종적으로 기존 사용자(또는 새로 생성된 사용자) 반환
    return existingUser;
  }
}
