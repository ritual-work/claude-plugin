#!/usr/bin/env node
/**
 * generate-packs.mjs — DETERMINISTIC generator for the development-function
 * persona packs, from the canonical snapshot (canonical/plugin-snapshot.json,
 * synced from Ritual's monorepo work-graph). NO LLM.
 *
 * For each dev persona that LEADS ≥1 job, emits a pack:
 *   plugins/<persona>/.claude-plugin/plugin.json
 *   plugins/<persona>/commands/<command-name>.md   (one per LEAD job)
 *   plugins/<persona>/skills/<persona>-guide/SKILL.md   (thin discoverability)
 * and updates .claude-plugin/marketplace.json + canonical/jtbd-allowlist.json.
 *
 * Commands are job-native (`/<persona>:<command-name>`), user-invoked — zero
 * model arbitration. The command body embeds the PUBLIC Ritual orchestration
 * seeded with the job's jtbd_id + persona (an L1 projection — it points at the
 * MCP capability, never restates Ritual's internal flow), and degrades to
 * build-discipline when Ritual isn't connected.
 *
 * Usage: node scripts/generate-packs.mjs [--check]
 *   --check : exit 1 if any committed pack file is stale (CI guard).
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SNAPSHOT = join(ROOT, 'canonical', 'plugin-snapshot.json');
const ALLOWLIST = join(ROOT, 'canonical', 'jtbd-allowlist.json');
const MARKETPLACE = join(ROOT, '.claude-plugin', 'marketplace.json');

const AUTHOR = { name: 'Ritual', url: 'https://ritual.work' };
const COMMON = {
  author: AUTHOR,
  homepage: 'https://ritual.work',
  repository: 'https://github.com/ritual-work/claude-plugin',
  license: 'MIT',
};
// dev-backend-services is REPLACED by the generated dev packs.
const REMOVED_PACKS = new Set(['dev-backend-services']);

function fail(msg) {
  console.error(`\n❌ generate-packs: ${msg}\n`);
  process.exit(1);
}
function titleCase(s) {
  return s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
function readJson(p) {
  return JSON.parse(readFileSync(p, 'utf8'));
}
/** Preserve an existing plugin.json's version so regen doesn't churn versions. */
function existingVersion(persona, fallback) {
  const p = join(ROOT, 'plugins', persona, '.claude-plugin', 'plugin.json');
  return existsSync(p) ? readJson(p).version ?? fallback : fallback;
}

const snapshot = readJson(SNAPSHOT);
if (snapshot.function !== 'development') fail(`unexpected snapshot function ${snapshot.function}`);

const files = new Map(); // path -> string content

for (const pack of snapshot.personas) {
  const { persona, label, commands } = pack;
  const version = existingVersion(persona, '0.1.0');

  // plugin.json
  files.set(join('plugins', persona, '.claude-plugin', 'plugin.json'), JSON.stringify({
    name: persona,
    displayName: `Ritual — ${label}`,
    version,
    description:
      `Role pack for ${label.toLowerCase()}s. Job-native commands that scope ${label.toLowerCase()} work into a ` +
      `decision-ready Ritual brief before you build — one command per job this lens leads. Depends on build-discipline.`,
    ...COMMON,
    keywords: ['ritual', 'agentic-coding', persona, 'discovery'],
    dependencies: ['build-discipline'],
  }, null, 2) + '\n');

  // commands/<name>.md — one per lead job
  for (const cmd of commands) {
    const sections = cmd.sections.map((s) => `- ${s}`).join('\n');
    const body = `---
description: ${`Scope "${titleCase(cmd.jtbdId)}" as a ${label} — produces a ${cmd.deliverableTemplate} (a decision-ready brief, not code).`}
---

# ${label}: ${titleCase(cmd.commandName)}

Scope **${titleCase(cmd.jtbdId)}** through the ${label} lens. This is a Ritual
discovery command — it produces a **${cmd.deliverableTemplate}** (a decision-ready
brief, not code) by running the Ritual engine seeded with this job, then folds
that brief into plan mode before any implementation.

The user's request: $ARGUMENTS

## What you contribute (${label} sections)
${sections}

The full ${cmd.deliverableTemplate} composes ${cmd.composedSectionCount} sections
across every contributing lens; the above are the ${label}'s own.

## How to run it
1. **Confirm Ritual is connected** — the \`ritual\` CLI or \`mcp__ritual__*\` tools.
   If it isn't, say so plainly and offer to connect
   (\`npm i -g @ritualai/cli\` → \`ritual init\`), then fall back to the
   **build-discipline** skill for generic tiering. Don't proceed as if the
   missing context didn't matter.
2. **Run the discovery, seeded with this job.** Create a Ritual exploration for
   the request above with **jtbd \`${cmd.jtbdId}\`** under the **${persona}** lens,
   then walk discovery → recommendations → build brief: poll
   \`get_exploration_status.recommendationsStatus\` until \`ready\`, review the
   recommendations, and fold the returned brief into plan mode.
3. **Speak the practitioner's language.** Talk about the work and its outcome in
   ${label} terms — never the routing internals (jtbd ids, registries, leaves).
`;
    files.set(join('plugins', persona, 'commands', `${cmd.commandName}.md`), body);
  }

  // thin discoverability guide skill
  const cmdList = commands.map((c) => `- \`/${persona}:${c.commandName}\` — ${titleCase(c.jtbdId)}`).join('\n');
  files.set(join('plugins', persona, 'skills', `${persona}-guide`, 'SKILL.md'), `---
name: ${persona}-guide
description: >-
  Discoverability for the ${label} pack. When a task reads like ${label} work
  that needs scoping before building, point the user to the matching job-native
  command below. This skill does NOT run discovery itself — the commands do.
---

# ${label} — pack guide

When a task looks like ${label} work, the right entry is a **job-native command**
(user-invoked, no guessing). Suggest the closest match:

${cmdList}

Each command scopes its job into a decision-ready Ritual brief (not code) and
degrades cleanly when Ritual isn't connected. If none fit, defer to
**build-discipline** for generic tiering.
`);
}

// merged allowlist = existing ∪ snapshot (preserve product/marketing entries).
const existingAllow = readJson(ALLOWLIST);
const jtbd_ids = [...new Set([...existingAllow.jtbd_ids, ...snapshot.allowlist.jtbdIds])].sort();
const personas = [...new Set([...existingAllow.personas, ...snapshot.allowlist.personas])].sort();
files.set(join('canonical', 'jtbd-allowlist.json'), JSON.stringify({
  _comment: existingAllow._comment,
  jtbd_ids,
  personas,
}, null, 2) + '\n');

// marketplace: keep build-discipline + non-dev/non-removed packs; insert dev packs.
const market = readJson(MARKETPLACE);
const devPersonas = new Set(snapshot.personas.map((p) => p.persona));
const base = market.plugins.find((p) => p.name === 'build-discipline');
const kept = market.plugins.filter(
  (p) => p.name !== 'build-discipline' && !devPersonas.has(p.name) && !REMOVED_PACKS.has(p.name),
);
const devEntries = snapshot.personas.map((pack) => {
  const pj = JSON.parse(files.get(join('plugins', pack.persona, '.claude-plugin', 'plugin.json')));
  return {
    name: pack.persona,
    source: `./plugins/${pack.persona}`,
    description: pj.description,
    version: pj.version,
    ...COMMON,
    keywords: pj.keywords,
    category: 'productivity',
  };
});
files.set(join('.claude-plugin', 'marketplace.json'), JSON.stringify({
  ...market,
  plugins: [...(base ? [base] : []), ...devEntries, ...kept],
}, null, 2) + '\n');

// ---- apply or check ----
if (process.argv.includes('--check')) {
  const stale = [];
  for (const [rel, content] of files) {
    const abs = join(ROOT, rel);
    if (!existsSync(abs) || readFileSync(abs, 'utf8') !== content) stale.push(rel);
  }
  // a removed pack still present = stale
  for (const name of REMOVED_PACKS) {
    if (existsSync(join(ROOT, 'plugins', name))) stale.push(`plugins/${name} (should be removed)`);
  }
  if (stale.length) {
    fail('packs are STALE — regenerate with `node scripts/generate-packs.mjs`:\n  ' + stale.join('\n  '));
  }
  console.log(`✓ packs in sync with the snapshot (${files.size} files).`);
  process.exit(0);
}

for (const name of REMOVED_PACKS) {
  const dir = join(ROOT, 'plugins', name);
  if (existsSync(dir)) rmSync(dir, { recursive: true, force: true });
}
for (const [rel, content] of files) {
  const abs = join(ROOT, rel);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, content);
}
console.log(
  `✓ generated ${snapshot.personas.length} dev packs (${snapshot.commandCount} commands), ` +
    `removed [${[...REMOVED_PACKS].join(', ')}], updated marketplace + allowlist.`,
);
