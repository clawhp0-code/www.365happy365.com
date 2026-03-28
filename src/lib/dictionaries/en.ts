import type { Dictionary } from "./ko";

const en: Dictionary = {
  // Header
  nav: {
    allPosts: "All Posts",
    health: "Health",
    food: "Food",
    essay: "Essay",
    exercise: "Exercise",
    about: "About",
    menuOpen: "Open menu",
    mainMenu: "Main menu",
  },

  // Home
  home: {
    noticeBanner:
      "This is a personal blog started to take care of my health with the help of AI, after being diagnosed with health issues during a recent checkup. This is a personal study record, not professional medical information — please use it as reference only.",
    viewAllPosts: "View all posts",
    noPosts: "No posts yet",
    noPostsSub: "Write the first post.",
  },

  // Blog
  blog: {
    title: "Blog",
    allPosts: "All Posts",
    all: "All",
    postsCount: (n: number) => `${n} posts`,
    totalStories: (n: number) => `${n} stories in total`,
    noPosts: "No posts yet",
    noPostsCategory: (cat: string) =>
      `No posts in the ${cat} category yet.`,
    noPostsGeneral: "No posts have been written yet.",
    description:
      "Discover all posts from 365 Happy 365. Stories about health, food, essays, and exercise.",
  },

  // Post
  post: {
    notFound: "Post not found",
    home: "Home",
    blog: "Blog",
    readingTime: (min: string) => `${min} read`,
    aiDisclaimer:
      "This article was written with the help of AI for personal health management purposes. It is not professional medical information — please use it as reference only.",
    backToBlog: "Back to blog",
    share: "Share",
    shareOnTwitter: "Share on X (Twitter)",
    relatedPosts: "Related Posts",
    authorBio:
      "A writer at 365 Happy 365 who finds happiness every day. Sharing daily joy through various topics including health, food, exercise, and essays.",
  },

  // Category
  category: {
    notFound: "Category not found",
    postsCount: (n: number) => `${n} posts`,
    noPosts: "No posts yet",
    noPostsSub: (cat: string) =>
      `New posts in the ${cat} category will be uploaded soon.`,
  },

  // About
  about: {
    title: "About",
    description: "About 365 Happy 365 Blog - Personal Health Study Blog",
    content: {
      intro:
        "365 Happy 365 is not a professional medical or health information site.",
      body: "This blog is a space where an individual records content studied and organized with the help of AI for personal health. It cannot replace professional medical advice or diagnosis, and important health-related decisions should always be made in consultation with medical professionals.",
      disclaimer:
        "AI tools are used in writing, and accuracy of content is not guaranteed. Please use as reference material only.",
    },
  },

  // Sidebar
  sidebar: {
    categories: "Categories",
    all: "All",
    recentPosts: "Recent Posts",
  },

  // Footer
  footer: {
    description:
      "Stories of discovering small happiness every day. Sharing joy together through health, food, exercise, and everyday essays.",
    categories: "Categories",
    site: "Site",
    allPosts: "All Posts",
    about: "About",
    privacy: "Privacy Policy",
    madeWith: "Made with love in Korea",
  },

  // Metadata
  metadata: {
    siteTitle: "365 Happy 365 | Finding Happiness Every Day",
    siteDescription:
      "Stories of discovering small happiness every day. Sharing joy together through health, food, exercise, and everyday essays.",
  },

  // Categories data
  categoriesData: {
    health: {
      name: "Health",
      description: "Tips and information for a healthy life",
    },
    food: {
      name: "Food",
      description: "Delicious and healthy food stories",
    },
    essay: { name: "Essay", description: "Stories of everyday happiness" },
    exercise: {
      name: "Exercise",
      description: "Exercise for an active body and mind",
    },
  },
} as const;

export default en;
