import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SelfIntro } from './self-intro.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SelfIntroService {
  constructor(
    @InjectRepository(SelfIntro)
    private readonly selfIntroRepo: Repository<SelfIntro>,
  ) {}

  async upsert(userId: string, content: string): Promise<void> {
    const existing = await this.selfIntroRepo.findOne({ where: { userId } });

    if (existing) {
      existing.content = content;
      await this.selfIntroRepo.save(existing);
    } else {
      await this.selfIntroRepo.save({ userId, content });
    }
  }

  async find(userId: string): Promise<string> {
    const entry = await this.selfIntroRepo.findOne({ where: { userId } });
    return entry?.content || '';
  }
}
