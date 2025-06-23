// 썸네일 이미지 URL을 추가한 질문 데이터
const questionData = [
  {
    id: 1,
    title: "React에서 상태 관리 라이브러리 선택",
    author: "박수진",
    date: "2025-01-21",
    content:
      "리액트에서 상태 관리를 위해 Redux, MobX, Recoil 등 중 어떤 라이브러리를 사용하는 것이 좋을지 궁금합니다.",
    thumbnail:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&auto=format&fit=crop&q=60",
    answers: [
      {
        id: 1,
        author: "최윤수",
        content:
          "Redux는 대규모 앱에 적합하고, Recoil은 비교적 간단한 구조를 제공합니다.",
      },
    ],
    likes: 15,
  },
  {
    id: 2,
    title: "자바스크립트 클로저(Closure) 사용법",
    author: "최수영",
    date: "2025-01-20",
    content: "자바스크립트의 클로저 개념을 예제와 함께 설명해 주세요.",
    thumbnail:
      "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=500&auto=format&fit=crop&q=60",
    answers: [
      {
        id: 1,
        author: "강민준",
        content:
          "클로저는 함수가 선언된 렉시컬 환경을 기억해 외부 변수를 유지합니다.",
      },
    ],
    likes: 18,
  },
  {
    id: 3,
    title: "CSS Flexbox와 Grid 차이점",
    author: "김하늘",
    date: "2025-01-18",
    content: "Flexbox와 Grid 각각의 차이점과 적합한 사용 사례를 알려주세요.",
    thumbnail:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=500&auto=format&fit=crop&q=60",
    answers: [
      {
        id: 1,
        author: "조수연",
        content:
          "Flexbox는 1차원 레이아웃에, Grid는 2차원 레이아웃에 적합합니다.",
      },
    ],
    likes: 25,
  },
  {
    id: 4,
    title: "Node.js에서 비동기 함수 호출 순서",
    author: "이유진",
    date: "2025-01-17",
    content: "Node.js에서 비동기 함수가 실행되는 순서를 이해하고 싶습니다.",
    thumbnail:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&auto=format&fit=crop&q=60",
    answers: [
      {
        id: 1,
        author: "김수진",
        content: "Node.js는 이벤트 루프를 통해 비동기 작업을 처리합니다.",
      },
    ],
    likes: 30,
  },
  {
    id: 5,
    title: "TypeScript 제네릭 사용법 이해하기",
    author: "한지민",
    date: "2025-01-16",
    content: "TypeScript에서 제네릭을 어떻게 효과적으로 사용할 수 있을까요?",
    thumbnail:
      "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=500&auto=format&fit=crop&q=60",
    answers: [
      {
        id: 1,
        author: "김영훈",
        content: "제네릭은 타입 안정성과 재사용성을 높이는 데 유용합니다.",
      },
    ],
    likes: 5,
  },
  {
    id: 6,
    title: "웹 성능 최적화 방법",
    author: "임성민",
    date: "2025-01-14",
    content: "웹 애플리케이션의 성능을 개선하기 위한 방법을 알고 싶습니다.",
    thumbnail:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=500&auto=format&fit=crop&q=60",
    answers: [
      {
        id: 1,
        author: "최지은",
        content:
          "이미지 최적화, 코드 스플리팅, Lazy Loading 등을 사용할 수 있습니다.",
      },
    ],
    likes: 18,
  },
  {
    id: 7,
    title: "GraphQL과 REST API 차이점",
    author: "정현우",
    date: "2025-01-13",
    content: "GraphQL과 REST API의 차이점과 각각의 장단점에 대해 알려주세요.",
    thumbnail:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&auto=format&fit=crop&q=60",
    answers: [
      {
        id: 1,
        author: "오정은",
        content:
          "GraphQL은 필요한 데이터만 요청할 수 있고, REST는 간단한 구조에서 유리합니다.",
      },
    ],
    likes: 12,
  },
  {
    id: 8,
    title: "테스트 주도 개발(TDD) 방법론",
    author: "윤지호",
    date: "2025-01-10",
    content: "TDD의 개념과 실제 개발에서의 활용 방법을 알고 싶습니다.",
    thumbnail:
      "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=500&auto=format&fit=crop&q=60",
    answers: [
      {
        id: 1,
        author: "이선영",
        content:
          "TDD는 테스트를 먼저 작성하고 코드를 구현하는 방식으로, 버그를 줄이는 데 효과적입니다.",
      },
    ],
    likes: 23,
  },
  {
    id: 9,
    title: "JavaScript의 this 이해하기",
    author: "강서진",
    date: "2025-01-09",
    content: "`this` 키워드가 상황에 따라 어떻게 바인딩되는지 알고 싶습니다.",
    thumbnail:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=500&auto=format&fit=crop&q=60",
    answers: [
      {
        id: 1,
        author: "박성철",
        content:
          "`this`는 함수 호출 방식에 따라 달라집니다. 예: 일반 함수, 메서드, 생성자 등.",
      },
    ],
    likes: 30,
  },
  {
    id: 10,
    title: "React Context API 사용법",
    author: "강민경",
    date: "2025-01-01",
    content: "Context API를 사용해 props drilling을 줄이는 방법이 궁금합니다.",
    thumbnail:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&auto=format&fit=crop&q=60",
    answers: [
      {
        id: 1,
        author: "박진우",
        content:
          "Context API는 전역 상태를 관리하며, 하위 컴포넌트에 props 없이 데이터를 전달할 수 있습니다.",
      },
    ],
    likes: 18,
  },
];

const recommendedTopics = [
  { name: "Web Development", count: 45 },
  { name: "Machine Learning", count: 34 },
  { name: "Cloud Computing", count: 28 },
  { name: "DevOps", count: 22 },
  { name: "Cybersecurity", count: 18 },
  { name: "Mobile Development", count: 40 },
];

// 스태프 추천 데이터 수정
const staffPicks = [
  {
    id: 1,
    author: "원민관",
    title: "애자일: Pullim 팀이 고민하는 방식",
    date: "2월 8일",
    thumbnail: "https://randomuser.me/api/portraits/men/34.jpg",
  },
  {
    id: 2,
    author: "김주희",
    title: "개발자의 시선: 우리에게 필요한 증명",
    date: "3월 11일",
    thumbnail: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    author: "박재민",
    title: "코드 리뷰를 통한 팀 문화 개선 방법",
    date: "6일 전",
    thumbnail: "https://randomuser.me/api/portraits/men/23.jpg",
  },
];

export { questionData, recommendedTopics, staffPicks };
