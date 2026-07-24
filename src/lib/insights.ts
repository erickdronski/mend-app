import data from "../../content/insights.json";

export type InsightCategory = "research" | "practice" | "education" | "resource";

export type Insight = {
  id: string;
  status: "draft" | "published";
  category: InsightCategory;
  eyebrow: string;
  headline: string;
  summary: string;
  studyDetail: string;
  tryThis: string;
  readTime: string;
  relatedHref: string;
  relatedLabel: string;
  publishedAt: string;
  source: {
    authors: string;
    title: string;
    journal: string;
    year: number;
    url: string;
    sample: string;
    caveat: string;
  };
  social: {
    coverTitle: string;
    coverBody: string;
    explainTitle: string;
    explainBody: string;
    practiceTitle: string;
    practiceBody: string;
    caption: string;
    altText: string;
    hashtags: string[];
  };
};

export const insights = (data.items as Insight[])
  .filter((item) => item.status === "published")
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const insightCategories: { id: "all" | InsightCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "research", label: "Research" },
  { id: "practice", label: "Practice" },
  { id: "education", label: "Education" },
  { id: "resource", label: "Resources" },
];
