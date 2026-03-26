import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content/posts");

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

function ensurePostsDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

export function getAllPostSlugs(): string[] {
  ensurePostsDirectory();
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((name) => name.endsWith(".mdx") || name.endsWith(".md"))
    .map((name) => name.replace(/\.(mdx|md)$/, ""));
}

export function getAllPosts(): PostMeta[] {
  ensurePostsDirectory();
  const slugs = getAllPostSlugs();

  const posts = slugs.map((slug) => {
    const fullPath = fs.existsSync(path.join(postsDirectory, `${slug}.mdx`))
      ? path.join(postsDirectory, `${slug}.mdx`)
      : path.join(postsDirectory, `${slug}.md`);

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title || "",
      excerpt: data.excerpt || "",
      date: data.date || new Date().toISOString().split("T")[0],
      category: data.category || "에세이",
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

export function getPostBySlug(slug: string): Post | null {
  ensurePostsDirectory();

  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const mdPath = path.join(postsDirectory, `${slug}.md`);

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
    category: data.category || "에세이",
    tags: data.tags || [],
    author: data.author || "365 Happy",
    coverImage: data.coverImage || "",
    featured: data.featured || false,
    readingTime: `${Math.ceil(stats.minutes)}분`,
    content,
  } as Post;
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getFeaturedPosts(limit = 3): PostMeta[] {
  const allPosts = getAllPosts();
  const featured = allPosts.filter((post) => post.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  const remaining = allPosts.filter((post) => !post.featured);
  return [...featured, ...remaining].slice(0, limit);
}

export function getLatestPosts(limit = 6): PostMeta[] {
  return getAllPosts().slice(0, limit);
}

export function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit = 3
): PostMeta[] {
  return getAllPosts()
    .filter((post) => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories);
}

export function getPostCountByCategory(): Record<string, number> {
  const posts = getAllPosts();
  return posts.reduce(
    (acc, post) => {
      acc[post.category] = (acc[post.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
}
