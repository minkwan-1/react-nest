export type User = {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  createdAt: string;
};

export type Question = {
  id: number;
  title: string;
  content: string;
  tags: string[];
  user: User;
  userId: string;
};

export type Answer = {
  id: string;
  questionId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isAiAnswer?: boolean;
};

export type ApiResponse<T> = {
  data: T;
  message?: string;
};

export type AiAnswerResponse = {
  answer: string;
  generatedAt: string;
};

export type SubmitAnswerRequest = {
  questionId: string;
  content: string;
  userId: string;
};

export type FetchAnswersResponse = Answer[];

export type UseQuestionDetailReturn = {
  id: string | undefined;
  question: Question | null;
  loading: boolean;
  user: User | null;
};

export type UseAnswersReturn = {
  answers: Answer[];
  answersLoading: boolean;
  answersError: string | null;
  fetchAnswers: () => Promise<void>;
};
export type UseAiAnswerReturn = {
  aiAnswer: Answer | null;
  aiLoading: boolean;
  aiError: string | null;
  fetchAiAnswer: (questionId: number) => Promise<void>;
};

export type UseAnswerSubmitReturn = {
  userAnswer: string;
  setUserAnswer: (answer: string) => void;
  isSubmittingAnswer: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  handleSubmitAnswer: () => Promise<void>;
  handleCloseSnackbar: () => void;
};

export type AnswerRendererProps = {
  aiAnswer: Answer | null;
  answers: Answer[];
};

export type AnswerCardProps = {
  answer: Answer;
};

export type AnswerBadgeProps = {
  isAiAnswer?: boolean;
};

export type AnswerHeaderProps = {
  answer: Answer;
};

export type AnswerContentProps = {
  answer: Answer;
};

export type ThemeColors = {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  background: string;
  surface: string;
  borderLight: string;
  textPrimary: string;
  textSecondary: string;
  upvote: string;
  downvote: string;
  tag: {
    bg: string;
    text: string;
  };
  accepted: string;
  code: {
    bg: string;
    border: string;
    text: string;
  };
  ai: {
    primary: string;
    light: string;
    border: string;
  };
  user: {
    primary: string;
    light: string;
    border: string;
  };
};
