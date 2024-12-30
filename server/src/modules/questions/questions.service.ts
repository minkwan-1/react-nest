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

  async create(
    title: string,
    content: string,
    tags: string[],
  ): Promise<Question> {
    const newQuestion = this.questionsRepository.create({
      title,
      content,
      tags,
      askedBy: 'Anonymous',
      createdAt: new Date(),
      updatedAt: new Date(),
      upVoteCount: 0,
      downVoteCount: 0,
      answerCount: 0,
      viewCount: 0,
    });

    return await this.questionsRepository.save(newQuestion);
  }

  async findAll(): Promise<Question[]> {
    return await this.questionsRepository.find();
  }

  async findOne(id: number): Promise<Question | null> {
    return await this.questionsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.questionsRepository.delete(id);
  }
}
