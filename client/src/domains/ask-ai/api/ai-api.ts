import { Answer } from "@domains/detail/types";

export interface StreamAiAnswerProps {
  questionId: number;
  onData: (chunk: string) => void;
  onComplete: (fullAnswerObject: Answer) => void;
  onError?: (error: Error) => void;
}

export const streamAiAnswer = ({
  questionId,
  onData,
  onComplete,
  onError,
}: StreamAiAnswerProps): Promise<void> => {
  return new Promise((resolve, reject) => {
    const eventSource = new EventSource(
      `http://localhost:3000/api/ask-ai/stream/${questionId}`
    );

    eventSource.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);

        if (parsedData.type === "DATA") {
          onData(parsedData.payload);
        } else if (parsedData.type === "COMPLETE") {
          console.log("스트리밍 최종 데이터 수신:", parsedData.payload);
          onComplete(parsedData.payload);
          eventSource.close();
          resolve();
        }
      } catch (e) {
        console.error("SSE 데이터 파싱 실패:", e, "원본 데이터:", event.data);
        onError?.(new Error("서버로부터 유효하지 않은 데이터를 수신했습니다."));
        eventSource.close();
        reject(e);
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      onError?.(
        new Error("스트리밍 중 오류가 발생했거나 연결이 종료되었습니다.")
      );
      eventSource.close();
      reject(error);
    };
  });
};
