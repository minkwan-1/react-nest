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
  Query,
  DefaultValuePipe,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Question } from './questions.entity';
import { QuestionsService } from './questions.service';
import { AuthenticatedGuard } from '../auth/guard/authenticated.guard';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  async create(
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('tags') tags: string[],
    @Body('userId') userId: string,
  ): Promise<Question> {
    return this.questionsService.create(title, content, tags, userId);
  }

  @Get('user/:id')
  async findAllByUser(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<Question[]> {
    return this.questionsService.findAllByUser(userId);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', ParseIntPipe) questionId: number,
    @Body('userId') userId: string,
  ): Promise<void> {
    return this.questionsService.delete(questionId, userId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Question> {
    const question = await this.questionsService.findOne(id);

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found.`);
    }
    return question;
  }

  @UseGuards(AuthenticatedGuard)
  @Put('modify/:id')
  async update(
    @Param('id', ParseIntPipe) questionId: number,
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('tags') tags: string[],
    @Body('userId') userId: string,
  ): Promise<Question> {
    return this.questionsService.update(
      questionId,
      title,
      content,
      tags,
      userId,
    );
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('search', new DefaultValuePipe('')) search: string,
  ) {
    return this.questionsService.findAll({ page, limit, search });
  }
}
