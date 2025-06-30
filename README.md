# 🌐 Pullim  
> *지식 공유와 AI가 결합된 개발자 Q&A 플랫폼*

---

## 📘 프로젝트 소개
**Pullim(풀림)**은 개발자들이  
> ✨ 궁금증을 나누고  
> ✨ 지식을 공유하며  
> ✨ 함께 성장할 수 있도록  

만든 **지식 기반 Q&A 플랫폼**입니다.

단순한 질문/답변을 넘어서  
🤖 AI 어시스턴트가 도움을 주고  
👥 사용자 간 상호작용을 중심으로  
📚 깊이 있는 학습과 협업이 가능하도록 설계했습니다.

---

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 🔐 **소셜 로그인** | Naver, Google 계정으로 간편하게 로그인 |
| 📝 **질문 & 답변** | Markdown 지원 에디터로 작성, 코드와 포맷팅이 쉬움 |
| 🤖 **AI 어시스턴트** | 질문에 대해 AI(Gemini)가 자동 답변 제공 |
| 📱 **휴대폰 인증** | Twilio를 통한 SMS 인증으로 안전한 사용자 관리 |
| 👤 **마이페이지** | 활동 내역 확인, 직업/링크/관심분야 등 프로필 관리 |
| ✏️ **콘텐츠 관리** | 작성한 질문 수정/삭제 가능 |

---

## ⚙️ 기술 스택

### 💻 Frontend
- **언어**: TypeScript
- **프레임워크**: React + Vite
- **상태 관리**: Jotai
- **데이터 패칭**: TanStack Query
- **스타일링**: MUI, Emotion
- **라우팅**: React Router

### 🖥️ Backend
- **언어**: TypeScript
- **프레임워크**: NestJS
- **DB**: PostgreSQL
- **ORM**: TypeORM
- **인증**: Passport.js (Google/Naver), JWT, Session 기반

### 🧰 DevOps & 외부 서비스
- **AI**: Google Generative AI (Gemini)
- **SMS 인증**: Twilio
- **이미지 업로드**: AWS S3

---

## 🏗️ 아키텍처

Pullim은 **모노레포 구조**를 기반으로 클라이언트와 서버를 분리하여 구성했습니다.

### 📂 Frontend 구조 (`client/`)
```
client/
├── components/     # 재사용 가능한 UI 컴포넌트
├── pages/          # 각 라우트별 페이지 컴포넌트
├── api/            # API 호출 함수
├── atom/           # 전역 상태 (Jotai)
├── hooks/          # 커스텀 훅 (비즈니스 로직)
```

### 📂 Backend 구조 (`server/`)
```
server/
├── modules/        # 기능별 모듈 (auth, users, questions, ...)
├── configs/        # 설정 (TypeORM 등)
├── filters/        # 전역 예외 필터
```

---

## 🗂️ 데이터베이스 구조
- PostgreSQL 기반 설계
- TypeORM으로 모델링
- ERD는 `pullim.erd.json`을 기반으로 시각화

---

## 🖼️ UI 미리보기

> Pullim의 실제 화면을 통해 사용자 흐름을 확인해보세요.

### 🖥️ 메인 히어로 섹션
![메인 소개](public/images/main-hero.png)

### 🔐 소셜 로그인 화면
![소셜 로그인](public/images/login-dark.png)

### 📋 질문 리스트
![질문 리스트](public/images/question-list.png)

### 📄 질문 상세 페이지 (AI 답변 포함)
![질문 상세](public/images/question-detail.png)

### 🙋 마이페이지
![마이페이지](public/images/profile-page.png)

---

## 🚀 시작하기

### 1. 프로젝트 클론
```bash
git clone https://github.com/minkwan-1/react-nest.git
cd react-nest
```

### 2. 클라이언트 실행
```bash
cd client
yarn install
yarn dev
```

### 3. 서버 실행
```bash
cd server
yarn install
yarn start:dev
```

> 이제 `http://localhost:5173` 에서 Pullim 애플리케이션을 실행할 수 있습니다!

---

## 🙋‍♂️ Contact

이 프로젝트가 마음에 드셨다면 ⭐️ 스타를 남겨주세요!

---

## 🧠 함께 성장하는 개발 문화를 위하여

> "혼자 가면 빨리 가지만, 함께 가면 더 멀리 간다."

Pullim은 질문 하나하나에 성장과 배움이 담긴 공간이 되기를 희망합니다.


