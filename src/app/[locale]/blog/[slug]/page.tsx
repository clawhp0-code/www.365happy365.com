import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {
  getPostBySlug,
  getAllPostSlugs,
  getRelatedPosts,
} from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { getDictionary } from "@/lib/dictionaries";
import { isValidLocale, locales, type Locale } from "@/lib/i18n";
import CategoryBadge from "@/components/CategoryBadge";
import PostCard from "@/components/PostCard";
import ReadingProgress from "@/components/ReadingProgress";

interface PostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const slugs = getAllPostSlugs(locale);
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  const post = getPostBySlug(slug, locale as Locale);
  if (!post) return { title: dict.post.notFound };
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
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const validLocale = locale as Locale;
  const dict = getDictionary(validLocale);
  const post = getPostBySlug(slug, validLocale);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug, post.category, 3, validLocale);

  return (
    <>
      <ReadingProgress />

      <article>
        {/* ── Article header ── */}
        <header className="border-b border-stone-200/60 pt-10 pb-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-stone-400 text-xs mb-6">
              <Link href={`/${validLocale}`} className="hover:text-stone-700 transition-colors">{dict.post.home}</Link>
              <span>&rsaquo;</span>
              <Link href={`/${validLocale}/blog`} className="hover:text-stone-700 transition-colors">{dict.post.blog}</Link>
              <span>&rsaquo;</span>
              <CategoryBadge category={post.category} size="sm" linked locale={validLocale} />
            </nav>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-tight word-break-keep tracking-tight">
              {post.title}
            </h1>

            <p className="mt-3 text-stone-500 text-base sm:text-lg leading-relaxed word-break-keep">
              {post.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-stone-400 text-sm">
              <span>{post.author}</span>
              <span>&middot;</span>
              <span>{formatDate(post.date, validLocale)}</span>
              <span>&middot;</span>
              <span>{dict.post.readingTime(post.readingTime)}</span>
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
          <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800 leading-[1.8] word-break-keep">
            {dict.post.aiDisclaimer}
          </div>
          <div className="mdx-content">
            <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
          </div>

          {/* ── Bottom navigation ── */}
          <div className="mt-14 pt-8 border-t border-stone-200 flex items-center justify-between">
            <Link
              href={`/${validLocale}/blog`}
              className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {dict.post.backToBlog}
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-400">{dict.post.share}</span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://365happy365.com/${validLocale}/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
                aria-label={dict.post.shareOnTwitter}
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
                {dict.post.authorBio}
              </p>
            </div>
          </div>
        </div>

        {/* ── Related posts ── */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-stone-200/60 py-12 px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-base font-semibold text-stone-900 mb-6">{dict.post.relatedPosts}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedPosts.map((related) => (
                  <PostCard key={related.slug} post={related} locale={validLocale} />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
