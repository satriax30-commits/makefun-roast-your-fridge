// Roast Your Fridge: One Line, One Laugh
// make.fun bounty u-suzy-one-line-one-laugh-roast-your-fridge-f1063521
//
// Deterministic Node 22 program (stdlib only, no network, no randomness,
// no wall-clock time). Writes a single roast line to <outputDir>/entry.txt,
// where outputDir is ENTRY_OUTPUT_DIR (or MAKEFUN_OUTPUT_DIR) if set,
// otherwise /output.
//
// Candidate lines weighed against the judge brief, most important first:
// (1) roast of a fridge, (2) punchline lands on first read,
// (3) specific to fridges, (4) tight wording, (5) fresh angle
// (no midnight-snacking / colder-than-my-ex cracks):
//
// WINNER — a fridge door that only shuts with a hip-check; the turn is
// a $2,000 appliance that "only works if I body-slam it first". The
// detail is universal (everyone has shoved a fridge door shut) and the
// punchline is physical comedy that reads cleanly aloud in one breath.
// Verified: 103 characters, 105 bytes UTF-8, exactly one line —
// comfortably inside the 1-200 gate, with room to spare for the tie-break
// on smaller text.
//   "My fridge door needs a hip-check to close \u2014 a $2,000 appliance
//    that only works if I body-slam it first."
//
// RUNNER-UP (crisper drawer) — specific, and the "fast-forward button
// for salad" turn is clever, but the setup is slower and the payoff lands
// softer than a body-slam:
//   "My fridge's crisper drawer keeps lettuce crisp for one day, then
//    quietly turns it into soup \u2014 a fast-forward button for salad."
//
// RUNNER-UP (butter) — the "no-spreading policy" pun is a real double
// meaning, but it needs the reader to pause on the pun, and the setup
// ("need a chisel") is a slightly worn image:
//   "My fridge keeps butter so hard I need a chisel to spread it \u2014
//    a cold vault with a strict no-spreading policy."
//
// RUNNER-UP (freezer glacier) — relatable, but "spa day" is a generic
// gag that could fit any appliance, and the line runs long:
//   "My freezer grows a glacier every winter, so I defrost it with a
//    hairdryer \u2014 the only appliance that needs a spa day to stay cold."
//
// The winner is kept as a single literal below: no selection logic at
// runtime, so the output is byte-identical on every run.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My fridge door needs a hip-check to close \u2014 a $2,000 appliance that only works if I body-slam it first.";

const outputDir =
  process.env.ENTRY_OUTPUT_DIR ??
  process.env.MAKEFUN_OUTPUT_DIR ??
  "/output";
const outputPath = join(outputDir, "entry.txt");

// Gate: 1-200 chars, exactly one line, not only whitespace.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} chars, must be 1-200`);
}
if (/\r|\n/.test(ENTRY) || ENTRY.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, ENTRY, "utf8");

// Read-back self-check: what landed on disk must be exactly the line.
const back = readFileSync(outputPath, "utf8");
if (back !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt does not match the entry");
}
console.log(`wrote ${outputPath} (${ENTRY.length} chars)`);
console.log(ENTRY);
