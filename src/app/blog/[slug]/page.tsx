import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getPostBySlug,
  getAllPostSlugs,
  getRelatedPosts,
} from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import CategoryBadge from "@/components/CategoryBadge";
import PostCard from "@/components/PostCard";
import ReadingProgress from "@/components/ReadingProgress";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "글을 찾을 수 없습니다" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug, post.category, 3);

  return (
    <>
      <ReadingProgress />

      <article>
        {/* ── Article header ── */}
        <header className="border-b border-stone-200/60 pt-10 pb-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-stone-400 text-xs mb-6">
              <Link href="/" className="hover:text-stone-700 transition-colors">홈</Link>
              <span>›</span>
              <Link href="/blog" className="hover:text-stone-700 transition-colors">블로그</Link>
              <span>›</span>
              <CategoryBadge category={post.category} size="sm" linked />
            </nav>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-tight word-break-keep tracking-tight">
              {post.title}
            </h1>

            <p className="mt-3 text-stone-500 text-base sm:text-lg leading-relaxed word-break-keep">
              {post.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-stone-400 text-sm">
              <span>{post.author}</span>
              <span>·</span>
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>{post.readingTime} 읽기</span>
            </div>
          </div>
        </header>

        {/* ── Tags ── */}
        {post.tags && post.tags.length > 0 && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-0 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-stone-100 text-stone-500 px-2.5 py-1 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* ── Article content ── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="mdx-content">
            <MDXRemote source={post.content} />
          </div>

          {/* ── Bottom navigation ── */}
          <div className="mt-14 pt-8 border-t border-stone-200 flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              블로그로 돌아가기
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-400">공유</span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://365happy365.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
                aria-label="X(Twitter)에 공유"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Author card ── */}
          <div className="mt-8 p-5 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-sm font-semibold flex-shrink-0">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-stone-900 text-sm mb-1">{post.author}</p>
              <p className="text-sm text-stone-500 leading-relaxed word-break-keep">
                매일 행복을 찾는 365 Happy 365의 필자입니다. 건강, 식품, 운동,
                에세이 등 다양한 주제로 일상의 행복을 나누고 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* ── Related posts ── */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-stone-200/60 py-12 px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-base font-semibold text-stone-900 mb-6">관련 글</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedPosts.map((related) => (
                  <PostCard key={related.slug} post={related} />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
