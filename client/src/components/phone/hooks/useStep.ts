import { useState } from "react";

type UseStepReturn<T> = {
  currentStep: T;
  stepIndex: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
  isFirst: boolean;
  isLast: boolean;
};

export function useStep<T>(steps: readonly T[]): UseStepReturn<T> {
  const [stepIndex, setStepIndex] = useState(0);

  const nextStep = () => {
    setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const goToStep = (index: number) => {
    setStepIndex(Math.max(0, Math.min(index, steps.length - 1)));
  };

  return {
    currentStep: steps[stepIndex],
    stepIndex,
    nextStep,
    prevStep,
    goToStep,
    isFirst: stepIndex === 0,
    isLast: stepIndex === steps.length - 1,
  };
}
