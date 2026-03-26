import Link from "next/link";
import Image from "next/image";
import { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import CategoryBadge from "./CategoryBadge";

interface PostCardProps {
  post: PostMeta;
  variant?: "default" | "featured" | "hero" | "compact" | "list";
}

const categoryEmojis: Record<string, string> = {
  건강: "🌿",
  식품: "🍊",
  에세이: "✍️",
  운동: "🏃",
};

function CardImage({
  post,
  className = "",
}: {
  post: PostMeta;
  className?: string;
}) {
  if (post.coverImage) {
    return (
      <Image
        src={post.coverImage}
        alt={post.title}
        fill
        className={`object-cover ${className}`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    );
  }
  const emoji = categoryEmojis[post.category] ?? "✨";
  return (
    <div className="w-full h-full bg-stone-100 flex items-center justify-center">
      <span className="text-4xl opacity-30">{emoji}</span>
    </div>
  );
}

/* ── List variant: 티스토리 스타일 텍스트 리스트 ── */
function ListCard({ post }: { post: PostMeta }) {
  return (
    <article className="py-6 border-b border-stone-100 last:border-0">
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="flex items-center gap-2 mb-2">
          <CategoryBadge category={post.category} size="sm" />
          <span className="text-xs text-stone-400">{formatDate(post.date)}</span>
          <span className="text-xs text-stone-200">·</span>
          <span className="text-xs text-stone-400">{post.readingTime} 읽기</span>
        </div>
        <h2 className="text-[17px] font-semibold text-stone-900 group-hover:text-amber-600 transition-colors mb-2 word-break-keep leading-snug">
          {post.title}
        </h2>
        <p className="text-sm text-stone-500 leading-relaxed line-clamp-2 word-break-keep">
          {post.excerpt}
        </p>
      </Link>
    </article>
  );
}

/* ── Compact variant ── */
function CompactCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex gap-3 items-start p-3 rounded-xl hover:bg-stone-50 transition-colors duration-200"
    >
      <div className="flex-shrink-0 w-[56px] h-[56px] rounded-lg overflow-hidden relative bg-stone-100">
        <CardImage post={post} />
      </div>
      <div className="flex-1 min-w-0">
        <CategoryBadge category={post.category} size="sm" />
        <h3 className="mt-1 text-sm font-semibold text-stone-800 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug word-break-keep">
          {post.title}
        </h3>
        <p className="mt-0.5 text-xs text-stone-400">{formatDate(post.date)}</p>
      </div>
    </Link>
  );
}

/* ── Hero variant ── */
function HeroCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group card-hover block rounded-xl overflow-hidden bg-white border border-stone-200 h-full"
    >
      <div className="relative h-72 sm:h-80 lg:h-full lg:min-h-[380px] overflow-hidden">
        <CardImage post={post} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
        {post.featured && (
          <div className="absolute top-4 left-4 bg-amber-400 text-amber-900 text-[11px] font-semibold px-2.5 py-1 rounded-md">
            추천
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <CategoryBadge category={post.category} size="sm" className="mb-3" />
          <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug group-hover:text-amber-200 transition-colors word-break-keep">
            {post.title}
          </h2>
          <p className="mt-2 text-white/65 text-sm line-clamp-2 leading-relaxed word-break-keep">
            {post.excerpt}
          </p>
          <div className="mt-3 flex items-center gap-3 text-white/50 text-xs">
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readingTime} 읽기</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ── Featured variant ── */
function FeaturedCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group card-hover block rounded-xl overflow-hidden bg-white border border-stone-200 h-full"
    >
      <div className="relative h-40 overflow-hidden bg-stone-100">
        <CardImage post={post} />
        <div className="absolute top-3 left-3">
          <CategoryBadge category={post.category} size="sm" />
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-[15px] font-semibold text-stone-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug word-break-keep">
          {post.title}
        </h2>
        <p className="mt-1.5 text-stone-500 text-sm line-clamp-2 leading-relaxed word-break-keep">
          {post.excerpt}
        </p>
        <p className="mt-3 text-xs text-stone-400">
          {formatDate(post.date)} · {post.readingTime} 읽기
        </p>
      </div>
    </Link>
  );
}

/* ── Default variant ── */
function DefaultCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group card-hover block rounded-xl overflow-hidden bg-white border border-stone-200"
    >
      <div className="relative h-44 overflow-hidden bg-stone-100">
        <CardImage post={post} />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <CategoryBadge category={post.category} size="sm" />
          <span className="text-xs text-stone-400">{formatDate(post.date)}</span>
        </div>
        <h2 className="text-[15px] font-semibold text-stone-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug word-break-keep">
          {post.title}
        </h2>
        <p className="mt-1.5 text-stone-500 text-sm line-clamp-2 leading-relaxed word-break-keep">
          {post.excerpt}
        </p>
        <p className="mt-3 text-xs text-stone-400">{post.readingTime} 읽기</p>
      </div>
    </Link>
  );
}

export default function PostCard({ post, variant = "default" }: PostCardProps) {
  if (variant === "list")     return <ListCard     post={post} />;
  if (variant === "compact")  return <CompactCard  post={post} />;
  if (variant === "hero")     return <HeroCard     post={post} />;
  if (variant === "featured") return <FeaturedCard post={post} />;
  return <DefaultCard post={post} />;
}
