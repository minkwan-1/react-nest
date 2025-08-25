import { AnswerRendererProps } from "../types";
import { AnswerCard } from "./answer-renderer/index";

export const AnswerRenderer = ({ aiAnswer, answers }: AnswerRendererProps) => {
  const renderAnswers = () => {
    const allAnswers = [];

    console.log(aiAnswer);

    // AI 답변이 있으면 첫 번째로 추가
    if (aiAnswer) {
      allAnswers.push(aiAnswer);
    }

    // 일반 사용자 답변들 추가
    allAnswers.push(...answers);

    console.log(allAnswers);
    return allAnswers.map((answer) => (
      <AnswerCard key={answer.id} answer={answer} />
    ));
  };

  return <>{renderAnswers()}</>;
};
