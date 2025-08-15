// src/news/news.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async getItNews(@Query('query') query: string = 'IT') {
    // 쿼리 파라미터가 없으면 기본값으로 'IT'를 검색합니다.
    return this.newsService.getNaverNews(query);
  }
}
