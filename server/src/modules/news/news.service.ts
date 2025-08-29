import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class NewsService {
  constructor(private readonly configService: ConfigService) {}

  async getNaverNews(query: string) {
    const clientId = this.configService.get<string>('NAVER_NEWS_CLIENT_ID');
    const clientSecret = this.configService.get<string>(
      'NAVER_NEWS_CLIENT_SECRET',
    );
    const apiUrl = 'https://openapi.naver.com/v1/search/news.json';

    try {
      const response = await axios.get(apiUrl, {
        params: {
          query: query,
          display: 10,
          start: 1,
          sort: 'sim',
        },
        headers: {
          'X-Naver-Client-Id': clientId,
          'X-Naver-Client-Secret': clientSecret,
        },
      });

      const sanitizedItems = response.data.items.map((item) => ({
        ...item,
        title: item.title.replace(/(<([^>]+)>|&quot;)/gi, ''),
        description: item.description.replace(/(<([^>]+)>|&quot;)/gi, ''),
      }));

      return sanitizedItems;
    } catch (error) {
      console.error('Naver API Error:', error.response?.data);
      throw new HttpException(
        '네이버 뉴스 API 호출에 실패했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
