import Link from "next/link";
import { cn, getCategorySlug } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
  size?: "sm" | "md" | "lg";
  linked?: boolean;
  className?: string;
}

const categoryStyles: Record<string, string> = {
  건강: "bg-emerald-50 text-emerald-700",
  식품: "bg-amber-50 text-amber-700",
  에세이: "bg-stone-100 text-stone-600",
  운동: "bg-sky-50 text-sky-700",
};

const sizeStyles = {
  sm: "text-[11px] px-2 py-0.5",
  md: "text-xs px-2.5 py-1",
  lg: "text-sm px-3 py-1.5",
};

export default function CategoryBadge({
  category,
  size = "md",
  linked = false,
  className,
}: CategoryBadgeProps) {
  const base = cn(
    "inline-flex items-center rounded-md font-medium transition-opacity duration-200",
    categoryStyles[category] ?? "bg-stone-100 text-stone-600",
    sizeStyles[size],
    linked && "hover:opacity-70",
    className
  );

  const content = <span>{category}</span>;

  if (linked) {
    return (
      <Link href={`/${getCategorySlug(category)}`} className={base}>
        {content}
      </Link>
    );
  }

  return <span className={base}>{content}</span>;
}
