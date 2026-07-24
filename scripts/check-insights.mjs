import { loadInsights } from "./lib/insights.mjs";

const data = await loadInsights();
const published = data.items.filter((item) => item.status === "published");
console.log(`Insight content is valid: ${published.length} published, ${data.items.length - published.length} drafts.`);
