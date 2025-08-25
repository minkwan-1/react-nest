import {
  Controller,
  Param,
  HttpException,
  HttpStatus,
  Sse,
} from '@nestjs/common';
import { AiService } from './ai.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

interface MessageEvent {
  data: string | object;
}

@Controller('api')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Sse('ask-ai/stream/:questionId')
  async streamAskAiById(
    @Param('questionId') questionId: string,
  ): Promise<Observable<MessageEvent>> {
    const id = Number(questionId);
    if (isNaN(id)) {
      throw new HttpException(
        '유효한 questionId가 아닙니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existing = await this.aiService.findByQuestionId(id);
    if (existing) {
      return new Observable<MessageEvent>((subscriber) => {
        subscriber.next({ data: existing.content });
        subscriber.complete();
      });
    }

    const question = await this.aiService.findQuestionById(id);
    if (!question) {
      throw new HttpException('질문을 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
    }

    return this.aiService
      .generateAnswerStream(question.title, question.content, id)
      .pipe(
        map((chunk: string) => ({ data: chunk })),
        tap((chunk) => console.log('SSE로 전송될 chunk:', chunk)),
      );
  }
}
