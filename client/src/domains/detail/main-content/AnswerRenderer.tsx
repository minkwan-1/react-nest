import { AnswerRendererProps } from "../types";
import { AnswerCard } from "./answer-renderer/index";

export const AnswerRenderer = ({ aiAnswer, answers }: AnswerRendererProps) => {
  const renderAnswers = () => {
    const allAnswers = [];

    if (aiAnswer) {
      allAnswers.push(aiAnswer);
    }

    allAnswers.push(...answers);

    return allAnswers.map((answer) => (
      <AnswerCard key={answer.id} answer={answer} />
    ));
  };

  return <>{renderAnswers()}</>;
};
