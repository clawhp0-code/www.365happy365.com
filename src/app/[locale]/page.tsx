import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { getDictionary } from "@/lib/dictionaries";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const validLocale = locale as Locale;
  const dict = getDictionary(validLocale);
  const posts = getAllPosts(validLocale);

  return (
    <div className="animate-fade-in">

      {/* ── Notice ── */}
      <div className="bg-stone-50 border-b border-stone-200/60 py-5 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm text-stone-600 leading-[1.8] word-break-keep">
            {dict.home.noticeBanner}
          </p>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex gap-14">

          {/* Post list */}
          <main className="flex-1 min-w-0">
            {posts.length > 0 ? (
              <>
                {posts.map((post) => (
                  <PostCard key={post.slug} post={post} variant="list" locale={validLocale} />
                ))}
                <div className="pt-8 text-center">
                  <Link
                    href={`/${validLocale}/blog`}
                    className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-amber-600 transition-colors"
                  >
                    {dict.home.viewAllPosts}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </>
            ) : (
              <div className="py-20 text-center">
                <h2 className="text-xl font-semibold text-stone-700 mb-2">{dict.home.noPosts}</h2>
                <p className="text-stone-400 text-sm">{dict.home.noPostsSub}</p>
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
