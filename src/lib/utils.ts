import { clsx, type ClassValue } from "clsx";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, "yyyy년 M월 d일", { locale: ko });
}

export function formatDateShort(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, "M월 d일", { locale: ko });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getCategorySlug(category: string): string {
  const map: Record<string, string> = {
    건강: "health",
    식품: "food",
    에세이: "essay",
    운동: "exercise",
  };
  return map[category] || category;
}

export function getCategoryFromSlug(slug: string): string {
  const map: Record<string, string> = {
    health: "건강",
    food: "식품",
    essay: "에세이",
    exercise: "운동",
  };
  return map[slug] || slug;
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    건강: "health",
    식품: "food",
    에세이: "essay",
    운동: "exercise",
  };
  return colors[category] || "essay";
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export const CATEGORIES = [
  {
    name: "건강",
    slug: "health",
    description: "건강한 생활을 위한 팁과 정보",
    icon: "💚",
    color: "emerald",
  },
  {
    name: "식품",
    slug: "food",
    description: "맛있고 건강한 음식 이야기",
    icon: "🍊",
    color: "orange",
  },
  {
    name: "에세이",
    slug: "essay",
    description: "일상의 행복을 담은 글",
    icon: "✍️",
    color: "violet",
  },
  {
    name: "운동",
    slug: "exercise",
    description: "활기찬 몸과 마음을 위한 운동",
    icon: "🏃",
    color: "sky",
  },
] as const;

export type CategorySlug = "health" | "food" | "essay" | "exercise";
