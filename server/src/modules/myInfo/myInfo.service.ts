import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MyInfo } from './myInfo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MyInfoService {
  constructor(
    @InjectRepository(MyInfo)
    private readonly myInfoRepository: Repository<MyInfo>,
  ) {}

  // myInfo 등록 처리
  async upsert(
    userId: string,
    job: string,
    interests: string[],
    socialLinks: string[],
    profileImageUrl?: string,
  ): Promise<void> {
    const existing = await this.myInfoRepository.findOne({ where: { userId } });
    if (existing) {
      existing.job = job;
      existing.interests = interests;
      existing.socialLinks = socialLinks;
      if (profileImageUrl !== undefined) {
        existing.profileImageUrl = profileImageUrl;
      }

      await this.myInfoRepository.save(existing);
    } else {
      const newMyInfo = {
        job,
        interests,
        socialLinks,
        profileImageUrl: profileImageUrl || null,
      };

      await this.myInfoRepository.save({ userId, ...newMyInfo });
    }
  }

  // myInfo 찾기
  async find(userId: string): Promise<MyInfo | null> {
    const entry = await this.myInfoRepository.findOne({ where: { userId } });
    return entry;
  }
}
