import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";

export default async function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="animate-fade-in">

      {/* ── Tagline ── */}
      <div className="border-b border-stone-200/60 py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm text-stone-500 word-break-keep">
            건강한 삶, 맛있는 음식, 활기찬 운동, 그리고 일상의 작은 행복을 나눕니다.
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
                  <PostCard key={post.slug} post={post} variant="list" />
                ))}
                <div className="pt-8 text-center">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-amber-600 transition-colors"
                  >
                    전체 글 보기
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </>
            ) : (
              <div className="py-20 text-center">
                <h2 className="text-xl font-semibold text-stone-700 mb-2">아직 글이 없습니다</h2>
                <p className="text-stone-400 text-sm">첫 번째 글을 작성해보세요.</p>
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
