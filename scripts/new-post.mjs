#!/usr/bin/env node
/**
 * 새 블로그 포스트 생성 스크립트
 *
 * 사용법:
 *   node scripts/new-post.mjs
 *   node scripts/new-post.mjs "포스트 제목" essay
 *
 * 카테고리: health | food | essay | exercise
 */

import fs from "fs";
import path from "path";
import { createInterface } from "readline";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(__dirname, "..", "content", "posts");

const CATEGORIES = ["건강", "식품", "에세이", "운동"];
const CATEGORY_SLUGS = {
  health: "건강",
  food: "식품",
  essay: "에세이",
  exercise: "운동",
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, (char) => {
      // Keep Korean as-is in slug if title is Korean,
      // but prefer English slugs — prompt user for slug.
      return char;
    })
    .replace(/\s+/g, "-")
    .replace(/[^\w\-ㄱ-ㅎㅏ-ㅣ가-힣]/g, "")
    .replace(/^-+|-+$/g, "");
}

function today() {
  return new Date().toISOString().split("T")[0];
}

function createTemplate({ title, slug, category, excerpt, tags, author }) {
  return `---
title: "${title}"
excerpt: "${excerpt}"
date: "${today()}"
category: "${category}"
tags: [${tags.map((t) => `"${t}"`).join(", ")}]
author: "${author}"
coverImage: ""
featured: false
---

## 들어가며

여기에 도입부를 작성하세요.

## 본문 제목

내용을 작성하세요.

> 인용구가 있다면 이렇게 추가하세요.

### 소제목

- 목록 항목 1
- 목록 항목 2
- 목록 항목 3

## 마무리하며

마무리 내용을 작성하세요.
`;
}

async function prompt(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  const args = process.argv.slice(2);
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  console.log("\n✨ 365 Happy 365 — 새 포스트 만들기\n");

  // Title
  let title = args[0] || "";
  if (!title) {
    title = await prompt(rl, "📝 포스트 제목: ");
  }
  if (!title.trim()) {
    console.error("제목을 입력하세요.");
    rl.close();
    process.exit(1);
  }

  // Category
  let categoryInput = args[1] || "";
  let category = CATEGORY_SLUGS[categoryInput] || categoryInput;
  if (!CATEGORIES.includes(category)) {
    console.log(`\n카테고리를 선택하세요:`);
    CATEGORIES.forEach((c, i) => console.log(`  ${i + 1}. ${c}`));
    const choice = await prompt(rl, "번호 입력 (1-4): ");
    category = CATEGORIES[parseInt(choice, 10) - 1] || "에세이";
  }

  // Slug
  const defaultSlug = slugify(title.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, "").trim() || `post-${Date.now()}`);
  const slugInput = await prompt(rl, `\n🔗 URL 슬러그 (영문, 기본값: "${defaultSlug}"): `);
  const slug = slugInput.trim() || defaultSlug;

  // Excerpt
  const excerpt = await prompt(rl, "\n💬 한 줄 요약 (미리보기 텍스트): ");

  // Tags
  const tagsInput = await prompt(rl, "\n🏷  태그 (쉼표로 구분, 예: 건강,식품,행복): ");
  const tags = tagsInput
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  // Author
  const authorInput = await prompt(rl, "\n👤 작성자 (기본값: 365 Happy): ");
  const author = authorInput.trim() || "365 Happy";

  rl.close();

  // Check duplicate
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (fs.existsSync(filePath)) {
    console.error(`\n❌ 파일이 이미 존재합니다: ${filePath}`);
    process.exit(1);
  }

  // Ensure directory
  fs.mkdirSync(POSTS_DIR, { recursive: true });

  // Write file
  const content = createTemplate({ title: title.trim(), slug, category, excerpt: excerpt.trim() || title.trim(), tags, author });
  fs.writeFileSync(filePath, content, "utf8");

  console.log(`\n✅ 포스트가 생성되었습니다!\n`);
  console.log(`   파일: content/posts/${slug}.mdx`);
  console.log(`   URL:  /blog/${slug}`);
  console.log(`\n지금 바로 파일을 열어서 글을 작성하세요 🚀\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
