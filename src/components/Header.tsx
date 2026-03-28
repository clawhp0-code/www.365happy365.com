"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

export interface HeaderStrings {
  allPosts: string;
  health: string;
  food: string;
  essay: string;
  exercise: string;
  about: string;
  menuOpen: string;
  mainMenu: string;
}

interface HeaderProps {
  locale: Locale;
  strings: HeaderStrings;
}

export default function Header({ locale, strings }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const categories = [
    { href: `/${locale}/health`,   label: strings.health },
    { href: `/${locale}/food`,     label: strings.food },
    { href: `/${locale}/essay`,    label: strings.essay },
    { href: `/${locale}/exercise`, label: strings.exercise },
  ];

  const otherLocale: Locale = locale === "ko" ? "en" : "ko";
  const otherLocaleLabel = locale === "ko" ? "EN" : "한국어";

  // Compute the switched-locale path
  const switchedPath = pathname.replace(`/${locale}`, `/${otherLocale}`) || `/${otherLocale}`;

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
            href={`/${locale}`}
            className="font-bold text-[15px] tracking-tight text-stone-900 hover:text-amber-600 transition-colors"
            aria-label="365 Happy 365"
          >
            <span className="text-amber-500">365</span>
            <span className="mx-1 text-stone-300">&middot;</span>
            <span>Happy</span>
            <span className="mx-1 text-stone-300">&middot;</span>
            <span className="text-amber-500">365</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label={strings.mainMenu}>
            <Link
              href={`/${locale}/blog`}
              className={cn(
                "px-3 py-1.5 text-sm rounded-lg transition-colors",
                pathname === `/${locale}/blog`
                  ? "text-amber-600 font-semibold bg-amber-50"
                  : "text-stone-500 hover:text-stone-900 hover:bg-stone-100/80"
              )}
            >
              {strings.allPosts}
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
            <Link
              href={`/${locale}/about`}
              className={cn(
                "px-3 py-1.5 text-sm rounded-lg transition-colors",
                pathname === `/${locale}/about`
                  ? "text-amber-600 font-semibold bg-amber-50"
                  : "text-stone-500 hover:text-stone-900 hover:bg-stone-100/80"
              )}
            >
              {strings.about}
            </Link>

            {/* Language switcher */}
            <Link
              href={switchedPath}
              className="ml-2 px-2.5 py-1 text-xs font-medium rounded-md border border-stone-200 text-stone-500 hover:text-stone-900 hover:border-stone-400 transition-colors"
            >
              {otherLocaleLabel}
            </Link>
          </nav>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile language switcher */}
            <Link
              href={switchedPath}
              className="px-2 py-1 text-xs font-medium rounded-md border border-stone-200 text-stone-500 hover:text-stone-900 transition-colors"
            >
              {otherLocaleLabel}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              aria-expanded={isMenuOpen}
              aria-label={strings.menuOpen}
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
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 animate-fade-in">
          <nav className="max-w-5xl mx-auto px-4 py-3 flex flex-col gap-0.5" role="navigation">
            <Link
              href={`/${locale}/blog`}
              className={cn(
                "px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                pathname === `/${locale}/blog`
                  ? "text-amber-600 bg-amber-50"
                  : "text-stone-700 hover:text-amber-600 hover:bg-stone-50"
              )}
            >
              {strings.allPosts}
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
            <Link
              href={`/${locale}/about`}
              className={cn(
                "px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                pathname === `/${locale}/about`
                  ? "text-amber-600 bg-amber-50"
                  : "text-stone-700 hover:text-amber-600 hover:bg-stone-50"
              )}
            >
              {strings.about}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
