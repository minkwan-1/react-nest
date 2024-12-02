import { Injectable } from '@nestjs/common';
import { Question } from './questions.entity';

@Injectable()
export class QuestionsService {
  private questions: Question[] = [];

  create(title: string, content: string, tags: string[]): Question {
    const newQuestion = new Question();
    newQuestion.id = this.questions.length + 1;
    newQuestion.title = title;
    newQuestion.content = content;
    newQuestion.tags = tags;
    newQuestion.askedBy = 'Anonymous';
    newQuestion.createdAt = new Date();
    newQuestion.updatedAt = new Date();
    newQuestion.upVoteCount = 0;
    newQuestion.downVoteCount = 0;
    newQuestion.answerCount = 0;
    newQuestion.viewCount = 0;

    this.questions.push(newQuestion);
    return newQuestion;
  }

  findAll(): Question[] {
    return this.questions;
  }

  findOne(id: number): Question | undefined {
    return this.questions.find((question) => question.id === id);
  }
}
