import { readFile } from "node:fs/promises";
import path from "node:path";

export async function loadInsights(root = process.cwd()) {
  const file = path.join(root, "content", "insights.json");
  const data = JSON.parse(await readFile(file, "utf8"));
  validateInsights(data);
  return data;
}

export function validateInsights(data) {
  const errors = [];
  if (!Number.isInteger(data?.version)) errors.push("version must be an integer");
  if (!Array.isArray(data?.items) || data.items.length === 0) errors.push("items must be a non-empty array");

  const ids = new Set();
  for (const [index, item] of (data?.items ?? []).entries()) {
    const at = `items[${index}]`;
    if (!/^[a-z0-9-]+$/.test(item.id ?? "")) errors.push(`${at}.id must be a lowercase slug`);
    if (ids.has(item.id)) errors.push(`${at}.id is duplicated`);
    ids.add(item.id);
    if (!["draft", "published"].includes(item.status)) errors.push(`${at}.status is invalid`);
    if (!["research", "practice", "education", "resource"].includes(item.category)) errors.push(`${at}.category is invalid`);
    for (const field of ["headline", "summary", "studyDetail", "tryThis", "readTime", "relatedHref", "relatedLabel", "publishedAt"]) {
      if (!String(item[field] ?? "").trim()) errors.push(`${at}.${field} is required`);
    }
    if (!/^https:\/\//.test(item.source?.url ?? "")) errors.push(`${at}.source.url must use https`);
    for (const field of ["authors", "title", "journal", "sample", "caveat"]) {
      if (!String(item.source?.[field] ?? "").trim()) errors.push(`${at}.source.${field} is required`);
    }
    if (!Number.isInteger(item.source?.year)) errors.push(`${at}.source.year must be an integer`);
    for (const field of ["coverTitle", "coverBody", "explainTitle", "explainBody", "practiceTitle", "practiceBody", "caption", "altText"]) {
      if (!String(item.social?.[field] ?? "").trim()) errors.push(`${at}.social.${field} is required`);
    }
    if ((item.social?.coverTitle?.length ?? 0) > 58) errors.push(`${at}.social.coverTitle must be 58 characters or fewer`);
    if ((item.social?.caption?.length ?? 0) > 1500) errors.push(`${at}.social.caption must be 1500 characters or fewer`);
    if (!Array.isArray(item.social?.hashtags) || item.social.hashtags.length < 2) errors.push(`${at}.social.hashtags needs at least two tags`);
  }

  if (errors.length) throw new Error(`Insight content failed validation:\n- ${errors.join("\n- ")}`);
  return true;
}
