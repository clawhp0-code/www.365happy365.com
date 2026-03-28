import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Locale } from "./i18n";

const contentBase = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  author: string;
  coverImage: string;
  featured: boolean;
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

function getPostsDirectory(locale: Locale): string {
  const localeDir = path.join(contentBase, locale);
  if (fs.existsSync(localeDir)) return localeDir;
  // Fallback to ko if locale directory doesn't exist
  return path.join(contentBase, "ko");
}

function ensurePostsDirectory(locale: Locale) {
  const dir = getPostsDirectory(locale);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function getAllPostSlugs(locale: Locale = "ko"): string[] {
  ensurePostsDirectory(locale);
  const dir = getPostsDirectory(locale);
  const fileNames = fs.readdirSync(dir);
  return fileNames
    .filter((name) => name.endsWith(".mdx") || name.endsWith(".md"))
    .map((name) => name.replace(/\.(mdx|md)$/, ""));
}

export function getAllPosts(locale: Locale = "ko"): PostMeta[] {
  ensurePostsDirectory(locale);
  const dir = getPostsDirectory(locale);
  const slugs = getAllPostSlugs(locale);
  const isKo = locale === "ko" || !fs.existsSync(path.join(contentBase, locale));

  const posts = slugs.map((slug) => {
    const fullPath = fs.existsSync(path.join(dir, `${slug}.mdx`))
      ? path.join(dir, `${slug}.mdx`)
      : path.join(dir, `${slug}.md`);

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title || "",
      excerpt: data.excerpt || "",
      date: data.date || new Date().toISOString().split("T")[0],
      category: data.category || (isKo ? "에세이" : "Essay"),
      tags: data.tags || [],
      author: data.author || "365 Happy",
      coverImage: data.coverImage || "",
      featured: data.featured || false,
      readingTime: `${Math.ceil(stats.minutes)}분`,
    } as PostMeta;
  });

  return posts.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
}

export function getPostBySlug(slug: string, locale: Locale = "ko"): Post | null {
  ensurePostsDirectory(locale);
  const dir = getPostsDirectory(locale);
  const isKo = locale === "ko" || !fs.existsSync(path.join(contentBase, locale));

  const mdxPath = path.join(dir, `${slug}.mdx`);
  const mdPath = path.join(dir, `${slug}.md`);

  const fullPath = fs.existsSync(mdxPath)
    ? mdxPath
    : fs.existsSync(mdPath)
      ? mdPath
      : null;

  if (!fullPath) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || "",
    excerpt: data.excerpt || "",
    date: data.date || new Date().toISOString().split("T")[0],
    category: data.category || (isKo ? "에세이" : "Essay"),
    tags: data.tags || [],
    author: data.author || "365 Happy",
    coverImage: data.coverImage || "",
    featured: data.featured || false,
    readingTime: `${Math.ceil(stats.minutes)}분`,
    content,
  } as Post;
}

export function getPostsByCategory(category: string, locale: Locale = "ko"): PostMeta[] {
  return getAllPosts(locale).filter((post) => post.category === category);
}

export function getFeaturedPosts(limit = 3, locale: Locale = "ko"): PostMeta[] {
  const allPosts = getAllPosts(locale);
  const featured = allPosts.filter((post) => post.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  const remaining = allPosts.filter((post) => !post.featured);
  return [...featured, ...remaining].slice(0, limit);
}

export function getLatestPosts(limit = 6, locale: Locale = "ko"): PostMeta[] {
  return getAllPosts(locale).slice(0, limit);
}

export function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit = 3,
  locale: Locale = "ko"
): PostMeta[] {
  return getAllPosts(locale)
    .filter((post) => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
}

export function getAllCategories(locale: Locale = "ko"): string[] {
  const posts = getAllPosts(locale);
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories);
}

export function getPostCountByCategory(locale: Locale = "ko"): Record<string, number> {
  const posts = getAllPosts(locale);
  return posts.reduce(
    (acc, post) => {
      acc[post.category] = (acc[post.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
}
