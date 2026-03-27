import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개",
  description: "365 Happy 365 블로그 소개 - 개인 건강 공부 블로그",
};

export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-2xl font-bold text-stone-900 mb-8">소개</h1>

      <div className="prose prose-stone max-w-none space-y-6 text-stone-700 leading-[1.9] word-break-keep">
        <p>
          <strong>365 Happy 365</strong>는 전문적인 의료·건강 정보
          사이트가 아닙니다.
        </p>

        <p>
          이 블로그는 개인이 자신의 건강을 위해 AI의 도움을 받아 공부하고
          정리한 내용을 기록하는 공간입니다. 전문가의 의학적 조언이나 진단을
          대체할 수 없으며, 건강과 관련된 중요한 결정은 반드시 의료
          전문가와 상담하시기 바랍니다.
        </p>

        <p>
          글 작성에는 AI 도구를 활용하고 있으며, 내용의 정확성을 보장하지
          않습니다. 참고 자료로만 활용해 주세요.
        </p>
      </div>
    </main>
  );
}
