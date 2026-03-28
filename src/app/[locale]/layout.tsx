import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import Header from "@/components/Header";
import type { HeaderStrings } from "@/components/Header";
import Footer from "@/components/Footer";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const dict = getDictionary(locale);

  return {
    title: {
      default: dict.metadata.siteTitle,
      template: "%s | 365 Happy 365",
    },
    description: dict.metadata.siteDescription,
    keywords:
      locale === "ko"
        ? ["행복", "건강", "식품", "에세이", "운동", "라이프스타일", "웰빙"]
        : [
            "happiness",
            "health",
            "food",
            "essay",
            "exercise",
            "lifestyle",
            "wellness",
          ],
    authors: [{ name: "365 Happy" }],
    creator: "365 Happy 365",
    openGraph: {
      type: "website",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      url: "/",
      siteName: "365 Happy 365",
      title: dict.metadata.siteTitle,
      description: dict.metadata.siteDescription,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "365 Happy 365",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.siteTitle,
      description: dict.metadata.siteDescription,
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const validLocale = locale as Locale;
  const dict = getDictionary(validLocale);

  const headerStrings: HeaderStrings = {
    allPosts: dict.nav.allPosts,
    health: dict.nav.health,
    food: dict.nav.food,
    essay: dict.nav.essay,
    exercise: dict.nav.exercise,
    about: dict.nav.about,
    menuOpen: dict.nav.menuOpen,
    mainMenu: dict.nav.mainMenu,
  };

  return (
    <>
      <Header locale={validLocale} strings={headerStrings} />
      <main className="flex-1">{children}</main>
      <Footer locale={validLocale} dict={dict} />
    </>
  );
}
