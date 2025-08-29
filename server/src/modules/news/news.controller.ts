import { Controller, Get, Query } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async getItNews(@Query('query') query: string = 'IT') {
    return this.newsService.getNaverNews(query);
  }
}
