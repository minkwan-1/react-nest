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

  async createOrUpdateAnswer(
    questionId: string,
    content: string,
  ): Promise<Answer> {
    // 기존 답변 찾기
    const existingAnswer = await this.answerRepository.findOne({
      where: { questionId },
    });

    if (existingAnswer) {
      // 있으면 업데이트
      existingAnswer.content = content;
      return await this.answerRepository.save(existingAnswer);
    } else {
      // 없으면 새로 생성
      const newAnswer = this.answerRepository.create({
        questionId,
        content,
      });
      return await this.answerRepository.save(newAnswer);
    }
  }
}
