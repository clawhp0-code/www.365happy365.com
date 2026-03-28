import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostsByCategory } from "@/lib/posts";
import { getDictionary } from "@/lib/dictionaries";
import { isValidLocale, locales, type Locale } from "@/lib/i18n";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import { CATEGORIES, getCategoryFromSlugLocalized } from "@/lib/utils";

interface CategoryPageProps {
  params: Promise<{ locale: string; category: string }>;
}

export async function generateStaticParams() {
  const params: { locale: string; category: string }[] = [];
  for (const locale of locales) {
    for (const cat of CATEGORIES) {
      params.push({ locale, category: cat.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isValidLocale(locale)) return {};
  const validLocale = locale as Locale;
  const dict = getDictionary(validLocale);
  const cat = CATEGORIES.find((c) => c.slug === category);

  if (!cat) return { title: dict.category.notFound };

  const catData =
    dict.categoriesData[cat.slug as keyof typeof dict.categoriesData];

  return {
    title: `${catData.name} - ${catData.description}`,
    description: `365 Happy 365 - ${catData.name}. ${catData.description}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale, category } = await params;
  if (!isValidLocale(locale)) notFound();

  const validLocale = locale as Locale;
  const dict = getDictionary(validLocale);
  const cat = CATEGORIES.find((c) => c.slug === category);

  if (!cat) {
    notFound();
  }

  const catData =
    dict.categoriesData[cat.slug as keyof typeof dict.categoriesData];
  const koreanName = getCategoryFromSlugLocalized(category, validLocale);
  const posts = getPostsByCategory(koreanName, validLocale);

  return (
    <div className="min-h-screen animate-fade-in">

      {/* ── Category header ── */}
      <div className="border-b border-stone-200/60 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-xl">{cat.icon}</span>
            <h1 className="text-2xl font-bold text-stone-900 tracking-tight">{catData.name}</h1>
          </div>
          <p className="mt-1 text-stone-400 text-sm">{dict.category.postsCount(posts.length)}</p>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex gap-14">

          {/* Post list */}
          <main className="flex-1 min-w-0">
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard key={post.slug} post={post} variant="list" locale={validLocale} />
              ))
            ) : (
              <div className="text-center py-20">
                <h2 className="text-lg font-semibold text-stone-700 mb-2">{dict.category.noPosts}</h2>
                <p className="text-stone-400 text-sm word-break-keep">
                  {dict.category.noPostsSub(catData.name)}
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
