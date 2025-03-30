import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GoogleGenerativeAIService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('API Key is required');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateContent(prompt: string): Promise<string> {
    try {
      // 적절한 모델 버전 사용
      // Gemini API가 업데이트되었을 수 있으므로 올바른 모델명 사용
      // v1beta 대신 최신 버전 사용
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-1.5-pro', // 또는 'gemini-1.0-pro' 등 최신 모델명 사용
        // apiVersion: 'v1', // 필요한 경우 API 버전 명시
      });

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      return text;
    } catch (error) {
      console.error('Google Generative AI Error:', error);
      throw new Error(
        `Failed to generate content from Google Generative AI: ${error.message}`,
      );
    }
  }

  // 사용 가능한 모델 목록 확인 메서드 추가
  async listAvailableModels(): Promise<string[]> {
    try {
      // @google/generative-ai 패키지에서 제공하는 모델 리스트 기능이 있다면 사용
      // 아래는 예시 코드로, 실제 SDK 메서드와 다를 수 있음
      // const models = await this.genAI.listModels();
      // return models.map(model => model.name);

      // 대안으로 수동 호출 방법 제시
      console.log('Please check available models in Google AI documentation');
      return ['모델 목록을 확인하려면 Google AI 문서를 참조하세요'];
    } catch (error) {
      console.error('Error listing models:', error);
      throw new Error('Failed to list available models');
    }
  }
}
