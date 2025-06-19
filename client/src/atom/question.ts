import { atomWithStorage } from "jotai/utils";

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
