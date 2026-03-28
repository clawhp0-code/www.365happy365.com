import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Footer({ locale, dict }: FooterProps) {
  const categories = [
    { href: `/${locale}/health`,   label: dict.nav.health },
    { href: `/${locale}/food`,     label: dict.nav.food },
    { href: `/${locale}/essay`,    label: dict.nav.essay },
    { href: `/${locale}/exercise`, label: dict.nav.exercise },
  ];

  const siteLinks = [
    { href: `/${locale}/blog`,    label: dict.footer.allPosts },
    { href: `/${locale}/about`,   label: dict.footer.about },
    { href: `/${locale}/privacy`, label: dict.footer.privacy },
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-50 border-t border-stone-200 mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Brand */}
          <div className="md:col-span-5">
            <Link href={`/${locale}`} className="inline-block mb-4">
              <span className="font-bold text-[15px] text-stone-900 tracking-tight">
                <span className="text-amber-500">365</span>
                <span className="mx-1 text-stone-300">&middot;</span>
                <span>Happy</span>
                <span className="mx-1 text-stone-300">&middot;</span>
                <span className="text-amber-500">365</span>
              </span>
            </Link>
            <p className="text-sm text-stone-500 leading-[1.85] max-w-xs word-break-keep">
              {dict.footer.description}
            </p>
          </div>

          {/* Categories */}
          <div className="md:col-span-3 md:col-start-7">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-4">
              {dict.footer.categories}
            </h3>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-sm text-stone-500 hover:text-amber-600 transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Site Links */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-4">
              {dict.footer.site}
            </h3>
            <ul className="space-y-2.5">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-500 hover:text-amber-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-200 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-400">
            &copy; {year} 365 Happy 365. All rights reserved.
          </p>
          <p className="text-xs text-stone-400">
            {dict.footer.madeWith}
          </p>
        </div>
      </div>
    </footer>
  );
}
