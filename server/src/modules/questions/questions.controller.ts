// questions.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
  ParseIntPipe,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { Question } from './questions.entity';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  // [POST] 질문 생성
  @Post()
  async create(
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('tags') tags: string[],
    @Body('userId') userId: string,
  ): Promise<Question> {
    return this.questionsService.create(title, content, tags, userId);
  }

  // [GET] 특정 유저의 질문 전체 조회
  @Get('user/:id')
  async findAllByUser(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<Question[]> {
    return this.questionsService.findAllByUser(userId);
  }

  // [DELETE] 질문 삭제
  @Delete('delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', ParseIntPipe) questionId: number,
    @Body('userId') userId: string,
  ): Promise<void> {
    return this.questionsService.delete(questionId, userId);
  }

  // [GET] 질문 단일 조회
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Question> {
    return this.questionsService.findOne(id);
  }

  // [PUT] 질문 단일 수정
  @Put('modify/:id')
  async update(
    @Param('id', ParseIntPipe) questionId: number,
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('tags') tags: string[],
    @Body('userId') userId: string,
  ): Promise<Question> {
    console.log({ questionId, title, content, tags, userId });
    return this.questionsService.update(
      questionId,
      title,
      content,
      tags,
      userId,
    );
  }

  // [추가] 모든 질문 조회
  @Get()
  async findAll(): Promise<Question[]> {
    return this.questionsService.findAll();
  }
}
