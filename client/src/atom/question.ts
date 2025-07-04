import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

export interface Question {
  id: number;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  user: {
    id: string;
    email: string;
    name: string;
    phoneNumber: string;
    createdAt: string;
  };
  userId: string;
}

export const questionsAtom = atomWithStorage<Question[]>("questions", []);

export const allQuestionsAtom = atom<Question[]>([]);
