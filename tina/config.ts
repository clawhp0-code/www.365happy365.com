import { defineConfig } from "tinacms";

export default defineConfig({
  branch:
    process.env.GITHUB_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "post",
        label: "블로그 포스트",
        path: "content/posts",
        format: "mdx",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => {
              return values?.title
                ?.toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-");
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "제목",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "요약",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "datetime",
            name: "date",
            label: "날짜",
            required: true,
            ui: {
              dateFormat: "YYYY-MM-DD",
            },
          },
          {
            type: "string",
            name: "category",
            label: "카테고리",
            required: true,
            options: [
              "에세이",
              "건강",
              "음식",
              "운동",
              "마음챙김",
              "라이프스타일",
            ],
          },
          {
            type: "string",
            name: "tags",
            label: "태그",
            list: true,
          },
          {
            type: "string",
            name: "author",
            label: "작성자",
            required: true,
          },
          {
            type: "image",
            name: "coverImage",
            label: "커버 이미지",
          },
          {
            type: "boolean",
            name: "featured",
            label: "추천 포스트",
          },
          {
            type: "rich-text",
            name: "body",
            label: "본문",
            isBody: true,
          },
        ],
      },
    ],
  },
});
