// 썸네일 이미지 URL을 추가한 질문 데이터
const questionData = [
  {
    id: 1,
    title: "래퍼 때려 치우고 개발자 하고 싶은데 어떤 것부터 공부해야 할까요?",
    author: "빈지노",
    date: "2025-01-23",
    content: "랩보다 개발이 더 재밌어 보여요, 공부 방향에 대해 조언 해주세요!",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=500&auto=format&fit=crop&q=60", // React 관련 이미지
    answers: [
      {
        id: 1,
        author: "박지민",
        content:
          "useEffect는 컴포넌트가 마운트될 때 데이터를 fetch 할 수 있습니다.",
      },
    ],
    likes: 12,
  },
  {
    id: 2,
    title: "웹툰 작가, 유튜버, 다음은 개발자가 되고 싶어요",
    author: "침착맨",
    date: "2025-01-22",
    content: "개청자들 상대하는 것도 이젠 질렸습니다. 개발 알려주세요.",
    thumbnail:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500&auto=format&fit=crop&q=60", // JS 코드 이미지
    answers: [
      {
        id: 1,
        author: "한상희",
        content: "async/await는 Promise를 더 간단하게 다룰 수 있는 문법입니다.",
      },
    ],
    likes: 20,
  },
  {
    id: 3,
    title: "React에서 상태 관리 라이브러리 선택",
    author: "박수진",
    date: "2025-01-21",
    content:
      "리액트에서 상태 관리를 위해 Redux, MobX, Recoil 등 여러 라이브러리 중 무엇을 선택해야 할지 고민입니다. 각 라이브러리의 특징과 장단점을 알고 싶어요.",
    thumbnail:
      "https://images.unsplash.com/photo-1591267990532-e5bdb1b0ceb8?w=500&auto=format&fit=crop&q=60", // 상태 관련 이미지
    answers: [
      {
        id: 1,
        author: "최윤수",
        content:
          "Redux는 상태가 커지면 더 적합하지만, 작은 프로젝트에는 Recoil이 유리할 수 있습니다.",
      },
    ],
    likes: 15,
  },
  {
    id: 4,
    title: "자바스크립트 클로저(Closure) 사용법",
    author: "최수영",
    date: "2025-01-20",
    content:
      "자바스크립트에서 클로저(Closure) 개념을 잘 이해하고 싶습니다. 예시를 들어 설명 부탁드립니다.",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60", // 코드 이미지
    answers: [
      {
        id: 1,
        author: "강민준",
        content:
          "클로저는 함수가 외부에서 선언된 변수를 기억하는 특성을 가지고 있습니다.",
      },
    ],
    likes: 18,
  },
  {
    id: 5,
    title: "React 컴포넌트 간 데이터 전달 방법",
    author: "정서연",
    date: "2025-01-19",
    content:
      "React에서 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 방법과 그 반대로 데이터를 전달하는 방법을 알고 싶습니다.",
    thumbnail:
      "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=500&auto=format&fit=crop&q=60", // 데이터 흐름 이미지
    answers: [
      {
        id: 1,
        author: "이상미",
        content:
          "Props를 사용하여 데이터를 부모에서 자식으로 전달할 수 있습니다.",
      },
    ],
    likes: 10,
  },
  {
    id: 6,
    title: "CSS Flexbox와 Grid 차이점",
    author: "김하늘",
    date: "2025-01-18",
    content:
      "CSS에서 Flexbox와 Grid의 차이점이 무엇인가요? 각각의 사용 사례와 장단점을 알려주세요.",
    thumbnail:
      "https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?w=500&auto=format&fit=crop&q=60", // CSS 레이아웃 이미지
    answers: [
      {
        id: 1,
        author: "조수연",
        content:
          "Flexbox는 1차원 레이아웃을, Grid는 2차원 레이아웃을 디자인할 때 유용합니다.",
      },
    ],
    likes: 25,
  },
  {
    id: 7,
    title: "Node.js에서 비동기 함수 호출 순서",
    author: "이유진",
    date: "2025-01-17",
    content:
      "Node.js에서 비동기 함수가 호출되는 순서가 궁금합니다. 콜백 함수나 Promise의 실행 순서에 대해 설명해주세요.",
    thumbnail:
      "https://images.unsplash.com/photo-1527427337751-fdca2f128ce5?w=500&auto=format&fit=crop&q=60", // Node.js 이미지
    answers: [
      {
        id: 1,
        author: "김수진",
        content:
          "Node.js는 이벤트 루프를 사용하여 비동기 코드를 처리하며, 콜백 함수는 큐에 저장됩니다.",
      },
    ],
    likes: 30,
  },
  {
    id: 8,
    title: "TypeScript 제네릭 사용법 이해하기",
    author: "한지민",
    date: "2025-01-16",
    content:
      "TypeScript에서 제네릭을 효과적으로 사용하는 방법이 궁금합니다. 복잡한 타입을 다루는 실전 예제와 함께 설명해주세요.",
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&auto=format&fit=crop&q=60", // TypeScript 코드 이미지
    answers: [
      {
        id: 1,
        author: "김영훈",
        content:
          "제네릭을 사용하면 코드 재사용성과 타입 안정성을 높일 수 있습니다.",
      },
    ],
    likes: 5,
  },
  {
    id: 9,
    title: "React Native와 Flutter 비교",
    author: "송태양",
    date: "2025-01-15",
    content:
      "크로스 플랫폼 앱 개발을 위해 React Native와 Flutter 중 어떤 것을 선택해야 할지 고민입니다. 성능, 개발 편의성, 생태계 측면에서 비교 분석해주세요.",
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&auto=format&fit=crop&q=60", // 모바일 앱 이미지
    answers: [
      {
        id: 1,
        author: "이지은",
        content:
          "React Native는 더 많은 라이브러리와 생태계를 갖추고 있으며, Flutter는 성능이 뛰어나지만 상대적으로 적은 커뮤니티를 가집니다.",
      },
    ],
    likes: 8,
  },
  {
    id: 10,
    title: "웹 성능 최적화 방법",
    author: "임성민",
    date: "2025-01-14",
    content:
      "대규모 웹 애플리케이션의 성능을 최적화하는 다양한 방법과 전략에 대해 알고 싶습니다. 로딩 시간 단축, 렌더링 최적화 등의 기법을 알려주세요.",
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&auto=format&fit=crop&q=60",
    answers: [
      {
        id: 1,
        author: "최지은",
        content:
          "웹 성능 최적화에는 코드 스플리팅, 이미지 최적화, 렌더링 최적화 등이 포함됩니다.",
      },
    ],
    likes: 18,
  },
  {
    id: 11,
    title: "GraphQL과 REST API 차이점",
    author: "정현우",
    date: "2025-01-13",
    content:
      "백엔드 API 개발 시 GraphQL과 REST API의 주요 차이점과 각각의 장단점에 대해 알고 싶습니다. 어떤 상황에서 어떤 방식을 선택해야 할까요?",
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&auto=format&fit=crop&q=60",
    answers: [
      {
        id: 1,
        author: "오정은",
        content:
          "GraphQL은 클라이언트가 필요한 데이터만 요청할 수 있어 효율적이고, REST는 표준화된 구조를 가지고 있습니다.",
      },
    ],
    likes: 12,
  },
  {
    id: 12,
    title: "Docker와 Kubernetes 입문 방법",
    author: "강민준",
    date: "2025-01-12",
    content:
      "컨테이너화와 오케스트레이션 기술인 Docker와 Kubernetes를 처음 배우려고 합니다. 효과적인 학습 로드맵과 추천 자료를 공유해주세요.",
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&auto=format&fit=crop&q=60",
    answers: [
      {
        id: 1,
        author: "김효정",
        content:
          "Docker는 애플리케이션을 컨테이너로 배포할 수 있게 도와주고, Kubernetes는 그 컨테이너들을 자동화하고 관리해줍니다.",
      },
    ],
    likes: 22,
  },
  {
    id: 13,
    title: "모던 자바스크립트 기능들",
    author: "홍유진",
    date: "2025-01-11",
    content:
      "모던 자바스크립트에서 추가된 기능들, 예를 들어 async/await, spread operator, destructuring 등에 대해 자세히 알고 싶습니다.",
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&auto=format&fit=crop&q=60",
    answers: [
      {
        id: 1,
        author: "조은지",
        content:
          "async/await는 비동기 코드를 동기식 코드처럼 작성할 수 있게 도와줍니다. Spread operator는 객체나 배열을 쉽게 복사할 수 있게 해줍니다.",
      },
    ],
    likes: 17,
  },
  {
    id: 14,
    title: "테스트 주도 개발(TDD) 방법론",
    author: "윤지호",
    date: "2025-01-10",
    content:
      "테스트 주도 개발(TDD)의 개념과 장단점, 실제 프로젝트에 어떻게 적용할 수 있는지 알고 싶습니다.",
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&auto=format&fit=crop&q=60",
    answers: [
      {
        id: 1,
        author: "이선영",
        content:
          "TDD는 먼저 테스트를 작성하고 그에 맞춰 코드를 작성하는 방법론으로, 코드의 품질을 높이고 버그를 줄여주는 효과가 있습니다.",
      },
    ],
    likes: 23,
  },
  {
    id: 15,
    title: "자바스크립트의 this 이해하기",
    author: "강서진",
    date: "2025-01-09",
    content:
      "자바스크립트에서 `this` 키워드가 어떤 방식으로 동작하는지, 특히 함수 내에서 `this`가 어떻게 바인딩되는지 알고 싶습니다.",
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&auto=format&fit=crop&q=60",
    answers: [
      {
        id: 1,
        author: "박성철",
        content:
          "`this`는 함수 호출 방식에 따라 다르게 바인딩됩니다. 메소드 호출, 함수 호출, 생성자 함수 등에서 다르게 동작합니다.",
      },
    ],
    likes: 30,
  },
  {
    id: 16,
    title: "Vue.js vs React.js 비교",
    author: "임채영",
    date: "2025-01-08",
    content:
      "Vue.js와 React.js는 각각의 특징과 장단점이 있습니다. 어떤 프로젝트에 어떤 프레임워크가 더 적합할지 비교해주세요.",
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&auto=format&fit=crop&q=60",
    answers: [
      {
        id: 1,
        author: "하성우",
        content:
          "React는 강력한 커뮤니티와 생태계를 가지고 있지만, Vue는 배우기 쉽고 빠르게 개발할 수 있습니다.",
      },
    ],
    likes: 28,
  },
  {
    id: 17,
    title: "UI/UX 디자인에서 중요한 요소",
    author: "윤보미",
    date: "2025-01-07",
    content:
      "UI/UX 디자인에서 사용자의 경험을 개선할 수 있는 중요한 요소들, 예를 들어 인터페이스 설계, 사용성 등을 다뤄주세요.",
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&auto=format&fit=crop&q=60",
    answers: [
      {
        id: 1,
        author: "정지원",
        content:
          "사용자 중심의 디자인, 직관적인 인터페이스, 빠른 반응 속도 등이 중요한 요소입니다.",
      },
    ],
    likes: 18,
  },
  {
    id: 18,
    title: "Git과 GitHub의 차이점",
    author: "이상현",
    date: "2025-01-06",
    content:
      "Git과 GitHub의 차이점에 대해 설명해주세요. 각각의 역할과 사용 방법을 알고 싶습니다.",
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&auto=format&fit=crop&q=60",
    answers: [
      {
        id: 1,
        author: "김진수",
        content:
          "Git은 버전 관리 시스템이고, GitHub는 Git을 기반으로 한 호스팅 서비스입니다.",
      },
    ],
    likes: 25,
  },
  {
    id: 19,
    title: "React Router로 라우팅 처리하기",
    author: "정유진",
    date: "2025-01-05",
    content:
      "React에서 React Router를 사용하여 페이지 간 라우팅을 어떻게 처리하는지에 대해 설명해주세요.",
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&auto=format&fit=crop&q=60",
    answers: [
      {
        id: 1,
        author: "이은주",
        content:
          "React Router를 사용하여 라우팅을 처리하고, `Route` 컴포넌트로 각 페이지를 연결할 수 있습니다.",
      },
    ],
    likes: 14,
  },
  {
    id: 20,
    title: "웹 애플리케이션 보안의 중요성",
    author: "김하영",
    date: "2025-01-04",
    content:
      "웹 애플리케이션의 보안은 매우 중요합니다. 보안을 강화하기 위한 기본적인 전략을 알려주세요.",
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&auto=format&fit=crop&q=60",
    answers: [
      {
        id: 1,
        author: "최석진",
        content:
          "HTTPS를 사용하여 통신을 암호화하고, SQL 인젝션, XSS 등의 공격에 대한 대비가 필요합니다.",
      },
    ],
    likes: 10,
  },
  {
    id: 21,
    title: "CSS 변수 사용법",
    author: "송지연",
    date: "2025-01-03",
    content:
      "CSS에서 변수를 어떻게 사용하는지에 대해 설명해주세요. 변수는 어떻게 선언하고, 사용할 수 있나요?",
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&auto=format&fit=crop&q=60",
    answers: [
      {
        id: 1,
        author: "강지수",
        content:
          "CSS 변수를 사용하면 코드에서 반복되는 색상이나 크기 등의 값을 쉽게 관리할 수 있습니다.",
      },
    ],
    likes: 12,
  },
  {
    id: 22,
    title: "JavaScript ES6+ 기능 중 가장 유용한 것",
    author: "한지원",
    date: "2025-01-02",
    content:
      "JavaScript ES6 이상에서 추가된 기능 중에서 가장 유용한 것에 대해 알고 싶습니다.",
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&auto=format&fit=crop&q=60",
    answers: [
      {
        id: 1,
        author: "이태훈",
        content:
          "템플릿 리터럴, 객체 리터럴, 화살표 함수, 비동기 처리 등이 ES6+에서 추가된 유용한 기능입니다.",
      },
    ],
    likes: 20,
  },
  {
    id: 23,
    title: "React Context API 사용법",
    author: "강민경",
    date: "2025-01-01",
    content:
      "React에서 Context API를 어떻게 활용할 수 있는지, 예시를 통해 설명해주세요.",
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&auto=format&fit=crop&q=60",
    answers: [
      {
        id: 1,
        author: "박진우",
        content:
          "Context API는 컴포넌트 트리에서 props를 통해 데이터를 전달하는 번거로움을 없애주는 기능입니다.",
      },
    ],
    likes: 18,
  },
  {
    id: 24,
    title: "Node.js에서의 비동기 처리 패턴",
    author: "조은영",
    date: "2025-01-01",
    content:
      "Node.js에서 비동기 처리를 위한 여러 가지 패턴들, 예를 들어 콜백, Promise, async/await의 차이를 다뤄주세요.",
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&auto=format&fit=crop&q=60",
    answers: [
      {
        id: 1,
        author: "이승현",
        content:
          "콜백, Promise, async/await는 모두 비동기 코드를 처리하는 방법이지만, async/await가 가장 직관적입니다.",
      },
    ],
    likes: 15,
  },
  {
    id: 25,
    title: "JavaScript에서 모듈 시스템 이해하기",
    author: "박서진",
    date: "2024-12-31",
    content:
      "JavaScript에서 모듈 시스템에 대해 설명해주세요. 어떻게 모듈을 import/export 할 수 있나요?",
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&auto=format&fit=crop&q=60",
    answers: [
      {
        id: 1,
        author: "김지현",
        content:
          "ES6 모듈 시스템에서는 `import`와 `export`를 사용하여 파일 간에 코드를 공유할 수 있습니다.",
      },
    ],
    likes: 20,
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
    author: "김주희",
    title: "개발자의 시선: 우리에게 필요한 증명",
    date: "3월 11일",
    thumbnail: "https://randomuser.me/api/portraits/women/44.jpg", // 아바타 이미지 예시
  },
  {
    id: 2,
    author: "박재민",
    title: "코드 리뷰를 통한 팀 문화 개선 방법",
    date: "6일 전",
    thumbnail: "https://randomuser.me/api/portraits/men/23.jpg", // 아바타 이미지 예시
  },
  {
    id: 3,
    author: "원민관",
    title: "애자일: Pullim 팀이 고민하는 방식",
    date: "2월 8일",
    thumbnail: "https://randomuser.me/api/portraits/men/34.jpg", // 아바타 이미지 예시
  },
];

export { questionData, recommendedTopics, staffPicks };
