// edit page에서 question을 submit 할 때의 entity

export class Question {
  // id: 개별 question에 대한 고유 식별값
  id: number;
  // title: 개별 question의 제목
  title: string;
  // tags: 여러 question cards를 필터링하기 위한 요소, 배열로 설정하여 다양한 태그 수용
  tags: string[];
  // content: 개별 question의 실질적인 내용
  content: string;
  // askedBy: 질문자 닉네임, 향후 auth와 연동
  askedBy: string;
  // createdAt/updatedAt: 생성 및 수정 날짜
  createdAt: Date;
  updatedAt: Date;
  // upVote/downVote: 추천순 필터링을 위한 데이터
  upVoteCount: number;
  downVoteCount: number;
  // answerCount/viewCount: 질문에 대한 답변 및 조회수 관리를 위한 데이터
  answerCount: number;
  viewCount: number;
}
