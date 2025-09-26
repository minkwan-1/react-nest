import { atomWithStorage } from "jotai/utils";

export interface NaverInspection {
  email?: string;
  name?: string;
  nickname?: string;
  profileUrl?: string;
}

// 기존 atom 대신 atomWithStorage 사용
export const naverInspectionAtom = atomWithStorage<NaverInspection | null>(
  "naverInspection", // localStorage 키
  null // 기본값
);
