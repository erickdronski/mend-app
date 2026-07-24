import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const expected = {
  tables: new Set([
    "mend_daily_answers",
    "mend_notes",
    "mend_profiles",
    "mend_space_members",
    "mend_spaces",
    "mend_state",
  ]),
  rpcs: new Set([
    "mend_create_space",
    "mend_daily_reveal",
    "mend_join_space",
    "mend_leave_space",
    "mend_my_tier",
    "mend_space_progress",
  ]),
  functions: new Set(["mend-checkout", "mend-delete-account"]),
};

async function sourceFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return sourceFiles(full);
      if (/\.(ts|tsx)$/.test(entry.name) && !entry.name.endsWith(".d.ts")) return [full];
      return [];
    })
  );
  return files.flat();
}

const files = await sourceFiles("src");
const found = {
  tables: new Set(),
  rpcs: new Set(),
  functions: new Set(),
};

for (const file of files) {
  const source = await readFile(file, "utf8");
  for (const match of source.matchAll(/\.from\("([^"]+)"\)/g)) found.tables.add(match[1]);
  for (const match of source.matchAll(/\.rpc\("([^"]+)"(?:,|\))/g)) found.rpcs.add(match[1]);
  for (const match of source.matchAll(/\.functions\.invoke\("([^"]+)"/g)) {
    found.functions.add(match[1]);
  }
}

let failed = false;

function report(kind, label) {
  const unexpected = [...found[kind]].filter((name) => !expected[kind].has(name));
  const stale = [...expected[kind]].filter((name) => !found[kind].has(name));
  if (unexpected.length) {
    failed = true;
    console.error(`Unexpected Supabase ${label}: ${unexpected.join(", ")}`);
  }
  if (stale.length) {
    failed = true;
    console.error(`Contract lists unused Supabase ${label}: ${stale.join(", ")}`);
  }
}

report("tables", "tables");
report("rpcs", "RPCs");
report("functions", "Edge Functions");

if (failed) {
  console.error("\nUpdate scripts/check-backend-contract.mjs and the live Supabase schema together.");
  process.exit(1);
}

console.log("Supabase backend contract matches app references.");
