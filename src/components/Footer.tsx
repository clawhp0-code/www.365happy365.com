import Link from "next/link";

const categories = [
  { href: "/health",   label: "건강" },
  { href: "/food",     label: "식품" },
  { href: "/essay",    label: "에세이" },
  { href: "/exercise", label: "운동" },
];

const siteLinks = [
  { href: "/blog",    label: "전체 글" },
  { href: "/about",   label: "소개" },
  { href: "/privacy", label: "개인정보처리방침" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-50 border-t border-stone-200 mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block mb-4">
              <span className="font-bold text-[15px] text-stone-900 tracking-tight">
                <span className="text-amber-500">365</span>
                <span className="mx-1 text-stone-300">·</span>
                <span>Happy</span>
                <span className="mx-1 text-stone-300">·</span>
                <span className="text-amber-500">365</span>
              </span>
            </Link>
            <p className="text-sm text-stone-500 leading-[1.85] max-w-xs word-break-keep">
              매일매일 작은 행복을 발견하는 이야기. 건강, 음식, 운동,
              그리고 일상의 에세이를 통해 함께 행복을 나눕니다.
            </p>
          </div>

          {/* Categories */}
          <div className="md:col-span-3 md:col-start-7">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-4">
              카테고리
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
              사이트
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
            © {year} 365 Happy 365. All rights reserved.
          </p>
          <p className="text-xs text-stone-400">
            Made with love in Korea
          </p>
        </div>
      </div>
    </footer>
  );
}
