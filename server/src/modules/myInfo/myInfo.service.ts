import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MyInfo } from './myInfo.entity';
import { Repository } from 'typeorm';

export interface PublicMyInfo {
  nickname: string;
  profileImageUrl?: string;
}

@Injectable()
export class MyInfoService {
  constructor(
    @InjectRepository(MyInfo)
    private readonly myInfoRepository: Repository<MyInfo>,
  ) {}

  async upsert(
    userId: string,
    nickname: string,
    interests: string[],
    socialLinks: string[],
    profileImageUrl?: string,
  ): Promise<void> {
    const existing = await this.myInfoRepository.findOne({ where: { userId } });
    if (existing) {
      existing.nickname = nickname;
      existing.interests = interests;
      existing.socialLinks = socialLinks;
      if (profileImageUrl !== undefined) {
        existing.profileImageUrl = profileImageUrl;
      }
      await this.myInfoRepository.save(existing);
    } else {
      const newMyInfo = {
        nickname,
        interests,
        socialLinks,
        profileImageUrl: profileImageUrl || null,
      };
      await this.myInfoRepository.save({ userId, ...newMyInfo });
    }
  }

  async find(userId: string): Promise<MyInfo | null> {
    const entry = await this.myInfoRepository.findOne({ where: { userId } });
    return entry;
  }

  async findPublicInfo(userId: string): Promise<PublicMyInfo | null> {
    const entry = await this.myInfoRepository.findOne({ where: { userId } });
    if (!entry) return null;
    const publicMyInfo: PublicMyInfo = {
      nickname: entry.nickname,
      profileImageUrl: entry.profileImageUrl,
    };
    return publicMyInfo;
  }
}
