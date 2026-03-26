import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostsByCategory } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import { CATEGORIES, getCategoryFromSlug } from "@/lib/utils";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);

  if (!cat) return { title: "카테고리를 찾을 수 없습니다" };

  return {
    title: `${cat.name} - ${cat.description}`,
    description: `365 Happy 365의 ${cat.name} 카테고리입니다. ${cat.description}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);

  if (!cat) {
    notFound();
  }

  const koreanName = getCategoryFromSlug(category);
  const posts = getPostsByCategory(koreanName);

  return (
    <div className="min-h-screen animate-fade-in">

      {/* ── Category header ── */}
      <div className="border-b border-stone-200/60 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-xl">{cat.icon}</span>
            <h1 className="text-2xl font-bold text-stone-900 tracking-tight">{cat.name}</h1>
          </div>
          <p className="mt-1 text-stone-400 text-sm">{posts.length}개의 글</p>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex gap-14">

          {/* Post list */}
          <main className="flex-1 min-w-0">
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard key={post.slug} post={post} variant="list" />
              ))
            ) : (
              <div className="text-center py-20">
                <h2 className="text-lg font-semibold text-stone-700 mb-2">아직 글이 없습니다</h2>
                <p className="text-stone-400 text-sm word-break-keep">
                  {cat.name} 카테고리에 곧 새로운 글이 업로드될 예정입니다.
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
