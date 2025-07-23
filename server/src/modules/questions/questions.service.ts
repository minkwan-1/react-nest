import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './questions.entity';
import { UsersRepository } from 'src/modules/users/users.repository';

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginatedQuestionsResult {
  items: Question[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
    private readonly usersRepository: UsersRepository,
  ) {}

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
      userId,
    });

    return await this.questionsRepository.save(newQuestion);
  }

  async findAllByUser(userId: string): Promise<Question[]> {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new NotFoundException('존재하지 않는 유저입니다.');

    return this.questionsRepository.find({
      where: { userId: userId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async delete(questionId: number, userId: string): Promise<void> {
    const question = await this.questionsRepository.findOne({
      where: { id: questionId },
      relations: ['user'],
    });

    if (!question) {
      throw new NotFoundException('존재하지 않는 질문입니다.');
    }

    if (question.userId !== userId) {
      throw new ForbiddenException('질문을 삭제할 권한이 없습니다.');
    }

    await this.questionsRepository.remove(question);
  }

  async findOne(id: number): Promise<Question> {
    const question = await this.questionsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!question) {
      throw new NotFoundException('질문이 존재하지 않습니다.');
    }

    return question;
  }

  async update(
    questionId: number,
    title: string,
    content: string,
    tags: string[],
    userId: string,
  ): Promise<Question> {
    const question = await this.questionsRepository.findOne({
      where: { id: questionId },
      relations: ['user'],
    });

    if (!question) {
      throw new NotFoundException('존재하지 않는 질문입니다.');
    }

    if (question.userId !== userId) {
      throw new ForbiddenException('질문을 수정할 권한이 없습니다.');
    }

    question.title = title;
    question.content = content;
    question.tags = tags;

    return await this.questionsRepository.save(question);
  }

  async findAll(options: PaginationOptions): Promise<PaginatedQuestionsResult> {
    const { page, limit } = options;

    const [items, total] = await this.questionsRepository.findAndCount({
      relations: ['user'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      items,
      total,
      page,
      limit,
      totalPages,
    };
  }
}
