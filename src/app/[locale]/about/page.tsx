import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isValidLocale, locales, type Locale } from "@/lib/i18n";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  return {
    title: dict.about.title,
    description: dict.about.description,
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const validLocale = locale as Locale;
  const dict = getDictionary(validLocale);

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-2xl font-bold text-stone-900 mb-8">{dict.about.title}</h1>

      <div className="prose prose-stone max-w-none space-y-6 text-stone-700 leading-[1.9] word-break-keep">
        <p>
          <strong>{dict.about.content.intro}</strong>
        </p>

        <p>
          {dict.about.content.body}
        </p>

        <p>
          {dict.about.content.disclaimer}
        </p>
      </div>
    </main>
  );
}
