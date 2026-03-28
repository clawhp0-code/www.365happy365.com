const ko = {
  // Header
  nav: {
    allPosts: "전체 글",
    health: "건강",
    food: "식품",
    essay: "에세이",
    exercise: "운동",
    about: "소개",
    menuOpen: "메뉴 열기",
    mainMenu: "메인 메뉴",
  },

  // Home
  home: {
    noticeBanner:
      "최근 건강 검진에서 건강이 문제가 있다는 진단을 받아, AI의 도움을 받아 건강을 챙기려고 시작한 개인 블로그입니다. 전문적인 의료 정보가 아닌 개인 공부 기록이오니 참조하시기 바랍니다.",
    viewAllPosts: "전체 글 보기",
    noPosts: "아직 글이 없습니다",
    noPostsSub: "첫 번째 글을 작성해보세요.",
  },

  // Blog
  blog: {
    title: "블로그",
    allPosts: "전체 글",
    all: "전체",
    postsCount: (n: number) => `${n}개의 글`,
    totalStories: (n: number) => `총 ${n}개의 이야기`,
    noPosts: "아직 글이 없습니다",
    noPostsCategory: (cat: string) => `${cat} 카테고리에 아직 글이 없습니다.`,
    noPostsGeneral: "아직 작성된 글이 없습니다.",
    description:
      "365 Happy 365의 모든 글을 만나보세요. 건강, 식품, 에세이, 운동에 관한 다양한 이야기들.",
  },

  // Post
  post: {
    notFound: "글을 찾을 수 없습니다",
    home: "홈",
    blog: "블로그",
    readingTime: (min: string) => `${min} 읽기`,
    aiDisclaimer:
      "이 글은 AI의 도움을 받아 개인적인 건강 관리 차원에서 작성한 것입니다. 전문적인 의료 정보가 아니오니 참고용으로만 활용해 주세요.",
    backToBlog: "블로그로 돌아가기",
    share: "공유",
    shareOnTwitter: "X(Twitter)에 공유",
    relatedPosts: "관련 글",
    authorBio:
      "매일 행복을 찾는 365 Happy 365의 필자입니다. 건강, 식품, 운동, 에세이 등 다양한 주제로 일상의 행복을 나누고 있습니다.",
  },

  // Category
  category: {
    notFound: "카테고리를 찾을 수 없습니다",
    postsCount: (n: number) => `${n}개의 글`,
    noPosts: "아직 글이 없습니다",
    noPostsSub: (cat: string) =>
      `${cat} 카테고리에 곧 새로운 글이 업로드될 예정입니다.`,
  },

  // About
  about: {
    title: "소개",
    description: "365 Happy 365 블로그 소개 - 개인 건강 공부 블로그",
    content: {
      intro: "365 Happy 365는 전문적인 의료·건강 정보 사이트가 아닙니다.",
      body: "이 블로그는 개인이 자신의 건강을 위해 AI의 도움을 받아 공부하고 정리한 내용을 기록하는 공간입니다. 전문가의 의학적 조언이나 진단을 대체할 수 없으며, 건강과 관련된 중요한 결정은 반드시 의료 전문가와 상담하시기 바랍니다.",
      disclaimer:
        "글 작성에는 AI 도구를 활용하고 있으며, 내용의 정확성을 보장하지 않습니다. 참고 자료로만 활용해 주세요.",
    },
  },

  // Sidebar
  sidebar: {
    categories: "카테고리",
    all: "전체",
    recentPosts: "최근 글",
  },

  // Footer
  footer: {
    description:
      "매일매일 작은 행복을 발견하는 이야기. 건강, 음식, 운동, 그리고 일상의 에세이를 통해 함께 행복을 나눕니다.",
    categories: "카테고리",
    site: "사이트",
    allPosts: "전체 글",
    about: "소개",
    privacy: "개인정보처리방침",
    madeWith: "Made with love in Korea",
  },

  // Metadata
  metadata: {
    siteTitle: "365 Happy 365 | 매일 행복을 찾는 이야기",
    siteDescription:
      "매일매일 작은 행복을 발견하는 이야기. 건강, 음식, 운동, 그리고 일상의 에세이를 통해 함께 행복을 나눕니다.",
  },

  // Categories data
  categoriesData: {
    health: { name: "건강", description: "건강한 생활을 위한 팁과 정보" },
    food: { name: "식품", description: "맛있고 건강한 음식 이야기" },
    essay: { name: "에세이", description: "일상의 행복을 담은 글" },
    exercise: { name: "운동", description: "활기찬 몸과 마음을 위한 운동" },
  },
};

export default ko;

// Use a widened type so that en.ts can assign different string values
export type Dictionary = {
  nav: { allPosts: string; health: string; food: string; essay: string; exercise: string; about: string; menuOpen: string; mainMenu: string };
  home: { noticeBanner: string; viewAllPosts: string; noPosts: string; noPostsSub: string };
  blog: {
    title: string; allPosts: string; all: string;
    postsCount: (n: number) => string; totalStories: (n: number) => string;
    noPosts: string; noPostsCategory: (cat: string) => string; noPostsGeneral: string; description: string;
  };
  post: {
    notFound: string; home: string; blog: string;
    readingTime: (min: string) => string;
    aiDisclaimer: string; backToBlog: string; share: string; shareOnTwitter: string;
    relatedPosts: string; authorBio: string;
  };
  category: { notFound: string; postsCount: (n: number) => string; noPosts: string; noPostsSub: (cat: string) => string };
  about: { title: string; description: string; content: { intro: string; body: string; disclaimer: string } };
  sidebar: { categories: string; all: string; recentPosts: string };
  footer: { description: string; categories: string; site: string; allPosts: string; about: string; privacy: string; madeWith: string };
  metadata: { siteTitle: string; siteDescription: string };
  categoriesData: {
    health: { name: string; description: string };
    food: { name: string; description: string };
    essay: { name: string; description: string };
    exercise: { name: string; description: string };
  };
};
