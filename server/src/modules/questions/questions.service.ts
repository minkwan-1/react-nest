import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
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
    userId: string,
  ): Promise<Question> {
    const newQuestion = this.questionsRepository.create({
      title,
      content,
      tags,
      user: { id: userId },
    });
    return this.questionsRepository.save(newQuestion);
  }

  async findAllByUser(userId: string): Promise<Question[]> {
    return this.questionsRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async delete(questionId: number, userId: string): Promise<void> {
    const result = await this.questionsRepository.softDelete({
      id: questionId,
      user: { id: userId },
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Question with ID ${questionId} not found or not owned by user ${userId}.`,
      );
    }
  }

  async findOne(id: number): Promise<Question> {
    return this.questionsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async findQuestion(id: number): Promise<Question> {
    return this.questionsRepository.findOne({
      where: { id },
    });
  }

  async update(
    questionId: number,
    title: string,
    content: string,
    tags: string[],
    userId: string,
  ): Promise<Question> {
    const question = await this.questionsRepository.findOne({
      where: { id: questionId, user: { id: userId } },
    });
    if (!question) {
      throw new Error(
        `Question with ID ${questionId} not found or not owned by user ${userId}.`,
      );
    }

    question.title = title;
    question.content = content;
    question.tags = tags;

    return this.questionsRepository.save(question);
  }

  async findAll(options: { page: number; limit: number; search?: string }) {
    const { page, limit, search } = options;
    const skip = (page - 1) * limit;

    let whereCondition: any = {};
    if (search) {
      whereCondition = { title: ILike(`%${search}%`) };
    }

    const [items, total] = await this.questionsRepository.findAndCount({
      where: whereCondition,
      skip: skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
