// answer.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  async createAnswer(answerData: {
    questionId: string;
    content: string;
    userId: string;
  }): Promise<Answer> {
    const newAnswer = this.answerRepository.create(answerData);
    return await this.answerRepository.save(newAnswer);
  }

  async getAnswersByQuestionId(questionId: string): Promise<Answer[]> {
    return await this.answerRepository.find({
      where: { questionId },
      order: { createdAt: 'ASC' },
    });
  }
}
