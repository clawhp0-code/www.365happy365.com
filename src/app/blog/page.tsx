import { Metadata } from "next";
import { getAllPosts, getPostsByCategory } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import { CATEGORIES } from "@/lib/utils";

export const metadata: Metadata = {
  title: "블로그",
  description:
    "365 Happy 365의 모든 글을 만나보세요. 건강, 식품, 에세이, 운동에 관한 다양한 이야기들.",
};

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>;
}

const categoryMap: Record<string, string> = {
  health:   "건강",
  food:     "식품",
  essay:    "에세이",
  exercise: "운동",
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const selectedSlug = params.category;
  const koreanCategory = selectedSlug ? categoryMap[selectedSlug] : undefined;
  const posts = koreanCategory ? getPostsByCategory(koreanCategory) : getAllPosts();
  const allPosts = getAllPosts();

  return (
    <div className="min-h-screen animate-fade-in">

      {/* ── Page header ── */}
      <div className="border-b border-stone-200/60 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
            {koreanCategory ? koreanCategory : "전체 글"}
          </h1>
          <p className="mt-1 text-stone-400 text-sm">
            {koreanCategory
              ? `${posts.length}개의 글`
              : `총 ${allPosts.length}개의 이야기`}
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
                href="/blog"
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  !selectedSlug
                    ? "bg-stone-900 text-white"
                    : "text-stone-500 hover:text-stone-900"
                }`}
              >
                전체
              </a>
              {CATEGORIES.map((cat) => (
                <a
                  key={cat.slug}
                  href={`/blog?category=${cat.slug}`}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    selectedSlug === cat.slug
                      ? "bg-stone-900 text-white"
                      : "text-stone-500 hover:text-stone-900"
                  }`}
                >
                  {cat.name}
                </a>
              ))}
            </div>

            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard key={post.slug} post={post} variant="list" />
              ))
            ) : (
              <div className="text-center py-20">
                <h2 className="text-lg font-semibold text-stone-700 mb-2">아직 글이 없습니다</h2>
                <p className="text-stone-400 text-sm">
                  {koreanCategory
                    ? `${koreanCategory} 카테고리에 아직 글이 없습니다.`
                    : "아직 작성된 글이 없습니다."}
                </p>
              </div>
            )}
          </main>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>

        </div>
      </div>
    </div>
  );
}
