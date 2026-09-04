import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => readFileSync(resolve(root, file), "utf8");
const html = read("index.html");
const readme = read("README.md");
const evidence = read("CHALLENGE_EVIDENCE.md");
const license = read("LICENSE");

const expectedTools = [
  "aplai_read_workspace",
  "aplai_find_jobs",
  "aplai_select_job",
  "aplai_prepare_package",
  "aplai_prepare_review",
];

let passed = 0;
const check = (condition, message) => {
  if (!condition) throw new Error(`FAIL: ${message}`);
  passed += 1;
  console.log(`PASS: ${message}`);
};

const scriptMatches = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
check(scriptMatches.length === 1, "one inline application script is present");
new Function(scriptMatches[0][1]);
check(true, "inline JavaScript compiles");

const declaredTools = [...html.matchAll(/\bname:\s*"(aplai_[a-z0-9_]+)"/g)].map(
  (match) => match[1],
);
check(
  JSON.stringify(declaredTools) === JSON.stringify(expectedTools),
  `exact five-tool contract: ${expectedTools.join(", ")}`,
);
check(
  (html.match(/document\.modelContext\.registerTool\(/g) ?? []).length === 1,
  "tools use the imperative document.modelContext.registerTool API",
);
check(
  (html.match(/\breadOnlyHint:/g) ?? []).length === expectedTools.length &&
    (html.match(/\buntrustedContentHint:/g) ?? []).length === expectedTools.length,
  "all five tools declare safety annotations",
);

check(
  readme.includes("Production APLAI `/generator`") &&
    readme.includes("**Exactly 2**") &&
    readme.includes("aplai_read_visible_workspace_v1") &&
    readme.includes("aplai_update_visible_job_target_v1"),
  "README states the exact two-tool production /generator boundary",
);
check(
  readme.includes("APLAI remote MCP") &&
    readme.includes("separate, complementary product integration"),
  "README separates remote MCP from page-level WebMCP",
);
check(
  html.includes('class="skip-link"') &&
    html.includes('id="main-content"') &&
    html.includes('aria-live="polite"') &&
    html.includes(":focus-visible"),
  "key keyboard and screen-reader markers are present",
);
check(
  html.includes("@media (max-width: 520px)") &&
    html.includes("@media (prefers-reduced-motion: reduce)"),
  "mobile and reduced-motion styles are present",
);
check(
  license.startsWith("MIT License") && license.includes("Copyright (c) 2026 Shaun Sequeira"),
  "root MIT license is present",
);
check(
  evidence.includes("A placeholder is not evidence") &&
    evidence.includes("https://knat01.github.io/aplai-webmcp-challenge/") &&
    evidence.includes("https://github.com/knat01/aplai-webmcp-challenge") &&
    evidence.includes("Final release tag will be added after the video URL is recorded"),
  "challenge evidence ledger records public proof and keeps final release proof open",
);

const releaseText = [html, readme, evidence, license].join("\n");
const credentialSignatures = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bgh[pousr]_[A-Za-z0-9]{30,}\b/,
  /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/,
  /\bsk-[A-Za-z0-9_-]{32,}\b/,
];
check(
  credentialSignatures.every((pattern) => !pattern.test(releaseText)),
  "release files contain no common private-key or token signatures",
);
check(
  !/\b(fetch|XMLHttpRequest|WebSocket)\s*\(/.test(scriptMatches[0][1]) &&
    !/<form\b/i.test(html),
  "demo code contains no network or form-submission surface",
);

console.log(`\n${passed} checks passed.`);
