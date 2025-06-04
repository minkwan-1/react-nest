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
      where: { userId: userId }, // user relation 대신 userId 직접 사용
      relations: ['user'],
      order: { id: 'DESC' }, // id로 내림차순 정렬 (최신순)
    });
  }

  // [3] 질문 삭제
  async delete(questionId: number, userId: string): Promise<void> {
    // 질문 존재 여부 확인
    const question = await this.questionsRepository.findOne({
      where: { id: questionId }, // number 타입
      relations: ['user'],
    });

    if (!question) {
      throw new NotFoundException('존재하지 않는 질문입니다.');
    }

    // 질문 작성자 권한 확인 (userId 필드로 비교)
    if (question.userId !== userId) {
      throw new ForbiddenException('질문을 삭제할 권한이 없습니다.');
    }

    // 질문 삭제
    await this.questionsRepository.remove(question);
  }
}
