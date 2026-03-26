# 365 Happy 365 - 매일 행복을 찾는 이야기

Next.js 15 App Router로 만든 한국어 라이프스타일 블로그입니다.

## 시작하기

### 요구사항
- Node.js 18.17 이상
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어보세요.

### 빌드

```bash
npm run build
npm run start
```

## 글 작성하기

`content/posts/` 폴더에 `.mdx` 파일을 추가하세요.

### 파일 형식

```markdown
---
title: "글 제목"
excerpt: "요약문"
date: "2024-01-01"
category: "에세이"  # 건강, 식품, 에세이, 운동 중 하나
tags: ["태그1", "태그2"]
author: "작성자"
featured: false
---

본문 내용을 여기에 작성합니다.
```

### 카테고리
- **건강** - 건강 정보, 의학 상식
- **식품** - 음식, 레시피, 영양
- **에세이** - 일상, 생각, 감상
- **운동** - 운동 방법, 피트니스

## 기술 스택

- **프레임워크**: Next.js 15 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS v3
- **MDX 파싱**: next-mdx-remote + gray-matter
- **폰트**: Geist (next/font)

## 폴더 구조

```
365happy365/
├── content/
│   └── posts/          # MDX 블로그 포스트
├── public/
│   └── images/         # 이미지 파일
├── src/
│   ├── app/            # Next.js App Router 페이지
│   │   ├── blog/       # 블로그 목록 및 상세 페이지
│   │   └── [category]/ # 카테고리 페이지
│   ├── components/     # 재사용 가능한 컴포넌트
│   └── lib/            # 유틸리티 함수
└── ...설정 파일들
```

## 라이선스

MIT
