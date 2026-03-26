"use client";

export default function NewsletterForm() {
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="이메일 주소를 입력하세요"
        className="flex-1 px-5 py-3 rounded-full border-2 border-white/30 bg-white/20 text-white placeholder-amber-200 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-white backdrop-blur-sm"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-full transition-colors text-sm whitespace-nowrap shadow-md"
      >
        구독하기 ✨
      </button>
    </form>
  );
}
