// questions.service.ts
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './questions.entity';
import { UsersRepository } from 'src/modules/users/users.repository';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
    private readonly usersRepository: UsersRepository,
  ) {}

  // [1] 질문 생성
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

  // [2] 특정 유저의 질문 조회
  async findAllByUser(userId: string): Promise<Question[]> {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new NotFoundException('존재하지 않는 유저입니다.');

    return this.questionsRepository.find({
      where: { userId: userId },
      relations: ['user'],
      order: { id: 'DESC' },
    });
  }

  // [3] 질문 삭제
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

  // [4] 질문 단일 조회
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

  // [5] 질문 수정
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

  // [추가] 모든 질문 조회
  async findAll(): Promise<Question[]> {
    return this.questionsRepository.find({
      relations: ['user'],
      order: { id: 'DESC' },
    });
  }
}
