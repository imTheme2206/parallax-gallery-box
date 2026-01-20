#!/usr/bin/env bun
import { existsSync } from "fs";
import { rm } from "fs/promises";
import path from "path";

const outdir = path.join(process.cwd(), "dist");

if (existsSync(outdir)) {
  await rm(outdir, { recursive: true, force: true });
}

// Build ESM
const esmResult = await Bun.build({
  entrypoints: ["./src/lib/index.ts"],
  outdir,
  target: "browser",
  format: "esm",
  splitting: false,
  sourcemap: "linked",
  minify: true,
  external: ["react", "react-dom"],
  naming: "[dir]/[name].js",
});

if (!esmResult.success) {
  console.error("❌ ESM build failed:");
  esmResult.logs.forEach((log) => console.error(log));
  process.exit(1);
}

// Build CJS
const cjsResult = await Bun.build({
  entrypoints: ["./src/lib/index.ts"],
  outdir,
  target: "browser",
  format: "cjs",
  splitting: false,
  sourcemap: "linked",
  minify: true,
  external: ["react", "react-dom"],
  naming: "[dir]/[name].cjs",
});

if (!cjsResult.success) {
  console.error("❌ CJS build failed:");
  cjsResult.logs.forEach((log) => console.error(log));
  process.exit(1);
}

// Generate TypeScript declarations
console.log("📝 Generating TypeScript declarations...");
const tscResult = Bun.spawnSync(["bunx", "tsc", "-p", "tsconfig.build.json"], {
  stdout: "inherit",
  stderr: "inherit",
});

if (tscResult.exitCode !== 0) {
  console.error("❌ TypeScript declaration generation failed");
  process.exit(1);
}

console.log("✅ Library built successfully!");
