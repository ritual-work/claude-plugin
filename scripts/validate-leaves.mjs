#!/usr/bin/env node
/*
 * Primitive leaf-registry validator (prototype).
 *
 * The real generation + validation source of truth is ritual-enterprise's
 * work-graph.ts (WORK_ITEM_META / LEAD_PERSONAS). Here we validate authored
 * registries against a blessed SUBSET allowlist so no leaf can ship with a
 * hand-invented or mistyped jtbd_id / persona. Dependency-free on purpose.
 *
 * Run: node scripts/validate-leaves.mjs   (exits non-zero on any violation)
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const allow = JSON.parse(readFileSync(join(root, 'canonical/jtbd-allowlist.json'), 'utf8'));
const jtbdOk = new Set(allow.jtbd_ids);
const personaOk = new Set(allow.personas);
const MODES = new Set(['standalone', 'discovery']);

const errors = [];
const seen = new Set(); // role_pack|action|leaf_key uniqueness

function findRegistries(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...findRegistries(p));
    else if (e.name === 'leaf-registry.json') out.push(p);
  }
  return out;
}

const pluginsDir = join(root, 'plugins');
const regs = existsSync(pluginsDir) ? findRegistries(pluginsDir) : [];
let leafCount = 0;

for (const f of regs) {
  let reg;
  try {
    reg = JSON.parse(readFileSync(f, 'utf8'));
  } catch (e) {
    errors.push(`${f}: invalid JSON (${e.message})`);
    continue;
  }
  const { role_pack, action, leaves } = reg;
  if (!role_pack) errors.push(`${f}: missing role_pack`);
  if (!action) errors.push(`${f}: missing action`);
  for (const l of leaves || []) {
    leafCount++;
    const id = `${role_pack}|${action}|${l.leaf_key}`;
    if (!l.leaf_key) errors.push(`${f}: a leaf is missing leaf_key`);
    if (seen.has(id)) errors.push(`${id}: duplicate (role_pack + action + leaf_key must be unique)`);
    seen.add(id);
    if (!l.jtbd_id) errors.push(`${id}: missing jtbd_id`);
    else if (!jtbdOk.has(l.jtbd_id)) errors.push(`${id}: jtbd_id "${l.jtbd_id}" not in canonical allowlist`);
    if (!l.persona) errors.push(`${id}: missing persona`);
    else if (!personaOk.has(l.persona)) errors.push(`${id}: persona "${l.persona}" not in canonical allowlist`);
    if (!MODES.has(l.mode)) errors.push(`${id}: mode must be standalone|discovery (got "${l.mode}")`);
    if (l.mode === 'discovery' && !l.ritual_entrypoint) errors.push(`${id}: discovery leaf missing ritual_entrypoint`);
    if (l.mode === 'standalone' && !l.done_criteria) errors.push(`${id}: standalone leaf missing done_criteria`);
  }
}

if (errors.length) {
  console.error(`FAILED leaf validation (${errors.length} issue(s)):`);
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
console.log(`PASS leaf validation - ${leafCount} leaves across ${regs.length} registr${regs.length === 1 ? 'y' : 'ies'}; all jtbd_id/persona canonical, all leaf keys unique.`);
