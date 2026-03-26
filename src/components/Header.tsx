"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const categories = [
  { href: "/health",   label: "건강" },
  { href: "/food",     label: "식품" },
  { href: "/essay",    label: "에세이" },
  { href: "/exercise", label: "운동" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-200 border-b",
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-stone-200"
          : "bg-[#FAFAF8]/90 backdrop-blur-sm border-stone-200/60"
      )}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[60px]">

          {/* Logo */}
          <Link
            href="/"
            className="font-bold text-[15px] tracking-tight text-stone-900 hover:text-amber-600 transition-colors"
            aria-label="365 Happy 365 홈"
          >
            <span className="text-amber-500">365</span>
            <span className="mx-1 text-stone-300">·</span>
            <span>Happy</span>
            <span className="mx-1 text-stone-300">·</span>
            <span className="text-amber-500">365</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="메인 메뉴">
            <Link
              href="/blog"
              className={cn(
                "px-3 py-1.5 text-sm rounded-lg transition-colors",
                pathname === "/blog"
                  ? "text-amber-600 font-semibold bg-amber-50"
                  : "text-stone-500 hover:text-stone-900 hover:bg-stone-100/80"
              )}
            >
              전체 글
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-lg transition-colors",
                  pathname.startsWith(cat.href)
                    ? "text-amber-600 font-semibold bg-amber-50"
                    : "text-stone-500 hover:text-stone-900 hover:bg-stone-100/80"
                )}
              >
                {cat.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            aria-expanded={isMenuOpen}
            aria-label="메뉴 열기"
          >
            {isMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 animate-fade-in">
          <nav className="max-w-5xl mx-auto px-4 py-3 flex flex-col gap-0.5" role="navigation">
            <Link
              href="/blog"
              className={cn(
                "px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                pathname === "/blog"
                  ? "text-amber-600 bg-amber-50"
                  : "text-stone-700 hover:text-amber-600 hover:bg-stone-50"
              )}
            >
              전체 글
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className={cn(
                  "px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  pathname.startsWith(cat.href)
                    ? "text-amber-600 bg-amber-50"
                    : "text-stone-700 hover:text-amber-600 hover:bg-stone-50"
                )}
              >
                {cat.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
