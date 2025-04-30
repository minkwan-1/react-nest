import { HttpException, HttpStatus } from '@nestjs/common';
import { AxiosError } from 'axios';

export function convertAxiosErrorToHttpException(
  error: unknown,
): HttpException {
  // error가 AxiosError 타입인지 확인
  if (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    (error as any).isAxiosError
  ) {
    const axiosError = error as AxiosError;

    // Axios 응답 객체에서 HTTP 상태 코드를 가져오고, 없으면 502(Bad Gateway)로 설정
    const status = axiosError.response?.status || HttpStatus.BAD_GATEWAY;

    // Axios 응답 데이터에서 유의미한 필드들을 추출할 수 있도록 타입 단언
    const responseData = axiosError.response?.data as
      | { message?: string; error_description?: string; error?: string }
      | undefined;

    // 사용자에게 보여줄 메시지: message → error_description → 기본 Axios 메시지 순으로 우선순위 설정
    const message =
      responseData?.message ||
      responseData?.error_description ||
      axiosError.message ||
      'Axios request failed';

    // 에러 이름 또는 코드: error 필드가 없으면 기본값 'Bad Gateway' 사용
    const errorMessage = responseData?.error || 'Bad Gateway';

    // NestJS의 HttpException 인스턴스로 변환하여 반환 (일관된 포맷으로 필터와 호환)
    return new HttpException(
      {
        statusCode: status,
        message,
        data: null,
        error: errorMessage,
      },
      status,
    );
  }

  // AxiosError가 아닌 일반 예외는 내부 서버 오류로 처리
  return new HttpException(
    {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Unexpected error occurred',
      data: null,
      error: 'InternalServerError',
    },
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
}
