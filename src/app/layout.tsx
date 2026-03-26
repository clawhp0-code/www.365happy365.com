import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-noto-kr",
});

export const metadata: Metadata = {
  title: {
    default: "365 Happy 365 | 매일 행복을 찾는 이야기",
    template: "%s | 365 Happy 365",
  },
  description:
    "매일매일 작은 행복을 발견하는 이야기. 건강, 음식, 운동, 그리고 일상의 에세이를 통해 함께 행복을 나눕니다.",
  keywords: ["행복", "건강", "식품", "에세이", "운동", "라이프스타일", "웰빙"],
  authors: [{ name: "365 Happy" }],
  creator: "365 Happy 365",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://365happy365.com"
  ),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "365 Happy 365",
    title: "365 Happy 365 | 매일 행복을 찾는 이야기",
    description:
      "매일매일 작은 행복을 발견하는 이야기. 건강, 음식, 운동, 그리고 일상의 에세이를 통해 함께 행복을 나눕니다.",
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
    title: "365 Happy 365 | 매일 행복을 찾는 이야기",
    description:
      "매일매일 작은 행복을 발견하는 이야기. 건강, 음식, 운동, 그리고 일상의 에세이를 통해 함께 행복을 나눕니다.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${GeistSans.variable} ${GeistMono.variable} ${notoSansKR.variable}`}
    >
      <body className="font-sans antialiased bg-warm-bg min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
