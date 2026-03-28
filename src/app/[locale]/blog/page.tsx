import { Metadata } from "next";
import { getAllPosts, getPostsByCategory } from "@/lib/posts";
import { getDictionary } from "@/lib/dictionaries";
import { isValidLocale, locales, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import { CATEGORIES, getCategoryFromSlugLocalized } from "@/lib/utils";

interface BlogPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  return {
    title: dict.blog.title,
    description: dict.blog.description,
  };
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const validLocale = locale as Locale;
  const dict = getDictionary(validLocale);
  const sp = await searchParams;
  const selectedSlug = sp.category;
  const koreanCategory = selectedSlug
    ? getCategoryFromSlugLocalized(selectedSlug, validLocale)
    : undefined;
  const posts = koreanCategory
    ? getPostsByCategory(koreanCategory, validLocale)
    : getAllPosts(validLocale);
  const allPosts = getAllPosts(validLocale);

  return (
    <div className="min-h-screen animate-fade-in">

      {/* ── Page header ── */}
      <div className="border-b border-stone-200/60 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
            {koreanCategory ? koreanCategory : dict.blog.allPosts}
          </h1>
          <p className="mt-1 text-stone-400 text-sm">
            {koreanCategory
              ? dict.blog.postsCount(posts.length)
              : dict.blog.totalStories(allPosts.length)}
          </p>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex gap-14">

          {/* Post list */}
          <main className="flex-1 min-w-0">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-stone-100">
              <a
                href={`/${validLocale}/blog`}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  !selectedSlug
                    ? "bg-stone-900 text-white"
                    : "text-stone-500 hover:text-stone-900"
                }`}
              >
                {dict.blog.all}
              </a>
              {CATEGORIES.map((cat) => {
                const catName =
                  validLocale === "ko"
                    ? cat.name
                    : dict.categoriesData[cat.slug as keyof typeof dict.categoriesData]
                        ?.name ?? cat.name;
                return (
                  <a
                    key={cat.slug}
                    href={`/${validLocale}/blog?category=${cat.slug}`}
                    className={`px-3 py-1 rounded-md text-sm transition-colors ${
                      selectedSlug === cat.slug
                        ? "bg-stone-900 text-white"
                        : "text-stone-500 hover:text-stone-900"
                    }`}
                  >
                    {catName}
                  </a>
                );
              })}
            </div>

            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard key={post.slug} post={post} variant="list" locale={validLocale} />
              ))
            ) : (
              <div className="text-center py-20">
                <h2 className="text-lg font-semibold text-stone-700 mb-2">{dict.blog.noPosts}</h2>
                <p className="text-stone-400 text-sm">
                  {koreanCategory
                    ? dict.blog.noPostsCategory(koreanCategory)
                    : dict.blog.noPostsGeneral}
                </p>
              </div>
            )}
          </main>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <Sidebar locale={validLocale} />
          </div>

        </div>
      </div>
    </div>
  );
}
