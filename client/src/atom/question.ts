import { atomWithStorage } from "jotai/utils";

export interface Question {
  id: number;
  title: string;
  content: string;
  tags: string[];
  userId: string;
  askedBy: string;
  createdAt: Date;
  updatedAt: Date;
  upVoteCount: number;
  downVoteCount: number;
  answerCount: number;
  viewCount: number;
}

export const questionsAtom = atomWithStorage<Question[]>("questions", []);
