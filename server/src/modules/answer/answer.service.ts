import { Injectable, NotFoundException } from '@nestjs/common';
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

  async deleteAnswer(answerId: string): Promise<void> {
    const result = await this.answerRepository.delete({
      id: answerId,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Answer with ID ${answerId} not found.`);
    }
  }
}
