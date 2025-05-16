import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './questions.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) {}

  // 1. 질문 생성
  async create(
    title: string,
    content: string,
    tags: string[],
    userId: string,
  ): Promise<Question> {
    const newQuestion = this.questionsRepository.create({
      title,
      content,
      tags,
      userId,
      askedBy: 'Anonymous',
      createdAt: new Date(),
      updatedAt: new Date(),
      upVoteCount: 0,
      downVoteCount: 0,
      answerCount: 0,
      viewCount: 0,
    });

    // 2. 새로운 질문 저장 후 반환
    return await this.questionsRepository.save(newQuestion);
  }

  // 3. 모든 질문 조회
  async findAll(): Promise<Question[]> {
    // 4. 저장된 모든 질문 목록 반환
    return await this.questionsRepository.find();
  }

  // 5. 특정 질문 조회
  async findOne(id: number): Promise<Question | null> {
    // 6. ID로 질문 조회
    return await this.questionsRepository.findOne({ where: { id } });
  }

  // 7. 특정 질문 삭제
  async remove(id: number): Promise<void> {
    // 8. ID로 질문 삭제
    await this.questionsRepository.delete(id);
  }
}
