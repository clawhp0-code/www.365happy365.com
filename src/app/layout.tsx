import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-noto-kr",
});

export const metadata: Metadata = {
  title: {
    default: "365 Happy 365",
    template: "%s | 365 Happy 365",
  },
  description:
    "매일매일 작은 행복을 발견하는 이야기. 건강, 음식, 운동, 그리고 일상의 에세이를 통해 함께 행복을 나눕니다.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://365happy365.com"
  ),
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
        {children}
      </body>
    </html>
  );
}
