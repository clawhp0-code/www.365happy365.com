import Link from "next/link";
import { getLatestPosts, getPostCountByCategory } from "@/lib/posts";
import { CATEGORIES, formatDate } from "@/lib/utils";

export default function Sidebar() {
  const recentPosts = getLatestPosts(5);
  const postCounts = getPostCountByCategory();
  const totalPosts = Object.values(postCounts).reduce((a, b) => a + b, 0);

  return (
    <aside className="space-y-8 w-52 flex-shrink-0">

      {/* Categories */}
      <div>
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-3 pb-2 border-b border-stone-200">
          카테고리
        </h3>
        <ul>
          <li>
            <Link
              href="/blog"
              className="flex items-center justify-between py-1.5 text-sm text-stone-600 hover:text-amber-600 transition-colors"
            >
              <span>전체</span>
              <span className="text-xs text-stone-400">{totalPosts}</span>
            </Link>
          </li>
          {CATEGORIES.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/${cat.slug}`}
                className="flex items-center justify-between py-1.5 text-sm text-stone-600 hover:text-amber-600 transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-xs">{cat.icon}</span>
                  <span>{cat.name}</span>
                </span>
                <span className="text-xs text-stone-400">{postCounts[cat.name] ?? 0}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent posts */}
      <div>
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-3 pb-2 border-b border-stone-200">
          최근 글
        </h3>
        <ul className="space-y-4">
          {recentPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block text-sm text-stone-700 hover:text-amber-600 transition-colors line-clamp-2 leading-snug word-break-keep"
              >
                {post.title}
              </Link>
              <span className="text-xs text-stone-400 mt-0.5 block">
                {formatDate(post.date)}
              </span>
            </li>
          ))}
        </ul>
      </div>

    </aside>
  );
}
