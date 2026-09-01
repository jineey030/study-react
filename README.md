# React / Next.js 실습 프로젝트 (Practice React)
Next.js와 TypeScript를 활용하여 리액트의 핵심 개념(State, Props, Component 분리, 이벤트 처리, 외부 API 연동 등)을 단계별로 학습하고 실습하는 프로젝트

---

## 📁 1. 디렉터리 구조

프로젝트의 핵심 소스 코드는 `app/`과 `components/` 디렉터리에 구성되어 있다.

```text
practice-react/
├── app/                  # Next.js App Router 페이지 및 메인 레이아웃
│   ├── page.tsx          # 메인 실습 모음 페이지 (Home)
│   ├── layout.tsx        # 공통 레이아웃 설정
│   └── globals.css       # 글로벌 스타일 (Tailwind CSS)
├── components/           # 컴포넌트 및 실습별 하위 모듈
│   ├── practice/         # 리액트 개념별 개별 실습 컴포넌트
│   └── ui/               # shadcn/ui 기반 공용 UI 컴포넌트 (캘린더, 카드 등)
└── package.json
```

---

## 🚀 2. 실행 방법
저장소(Repository)를 클론한 후, 의존성 패키지를 설치하고 개발 서버를 실행할 수 있다.

### (1) 패키지 설치
```bash
npm install
# 혹은 yarn / pnpm / bun 사용 가능
yarn install
pnpm install
bun install
```

### (2) 개발 서버 실행
```bash
npm run dev
# 혹은
yarn dev
pnpm dev
bun dev
```

---

## 🛠️ 3. 개발 환경 및 기술 스택
이 프로젝트는 최신 React 및 Next.js 풀스택 개발 환경으로 구축되어 있다.

* ⚛️ Framework: `Next.js` (App Router)
* 📚 Library: `React (v19)`
* 📘 Language: `TypeScript`
* 🎨 Styling: `Tailwind CSS v4`, `PostCSS`
* 🧩 UI Components & Icons: `Radix UI`, `shadcn/ui`, `Lucide React`
* 📅 Utility: `Date-fns`
* 🧹 Linter: `ESLint`
