import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './questions.entity';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
    private readonly usersRepository: UsersRepository,
  ) {}

  // 1. 질문 생성
  async create(
    title: string,
    content: string,
    tags: string[],
    userId: string,
  ): Promise<Question> {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new NotFoundException('존재하지 않는 유저입니다.');

    const newQuestion = this.questionsRepository.create({
      title,
      content,
      tags,
      user,
    });

    return await this.questionsRepository.save(newQuestion);
  }

  // 2. 특정 유저의 질문 조회
  async findAllByUser(userId: string): Promise<Question[]> {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new NotFoundException('존재하지 않는 유저입니다.');

    return this.questionsRepository.find({
      where: { user: { id: user.id } },
      relations: ['user'],
      // order: { createdAt: 'DESC' },
    });
  }
}
