import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KakaoUser } from './kakao.auth.entity';

@Injectable()
export class KakaoAuthRepository {
  constructor(
    @InjectRepository(KakaoUser)
    private readonly kakaoUserRepository: Repository<KakaoUser>,
  ) {}

  async findOrCreateUser(user: any): Promise<KakaoUser> {
    let existingUser = await this.kakaoUserRepository.findOneBy({
      id: user.id,
    });

    const connectedAt = new Date(user.connectedAt);
    const validConnectedAt = isNaN(connectedAt.getTime())
      ? new Date()
      : connectedAt;

    // kakao_account.profile에서 값들 가져오기
    const nickname = user.nickname || '익명';
    const profileImage = user.profileImage || '';
    const thumbnailImage = user.thumbnailImage || '';
    const isDefaultImage = user.isDefaultImage || false;

    if (!existingUser) {
      existingUser = this.kakaoUserRepository.create({
        id: user.id,
        connectedAt: validConnectedAt,
        nickname,
        profileImage,
        thumbnailImage,
        isDefaultImage,
      });

      await this.kakaoUserRepository.save(existingUser);
      console.log('New user created:', existingUser);
    } else {
      let updated = false;

      // 값 비교 후 업데이트
      if (existingUser.nickname !== nickname) {
        existingUser.nickname = nickname;
        updated = true;
      }
      if (existingUser.profileImage !== profileImage) {
        existingUser.profileImage = profileImage;
        updated = true;
      }
      if (existingUser.thumbnailImage !== thumbnailImage) {
        existingUser.thumbnailImage = thumbnailImage;
        updated = true;
      }
      if (existingUser.isDefaultImage !== isDefaultImage) {
        existingUser.isDefaultImage = isDefaultImage;
        updated = true;
      }

      // 변경 사항이 있을 경우만 저장
      if (updated) {
        await this.kakaoUserRepository.save(existingUser);
        console.log('User updated:', existingUser);
      } else {
        console.log('No changes found for user:', existingUser);
      }
    }

    return existingUser;
  }
}
