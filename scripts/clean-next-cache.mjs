import { rmSync, existsSync } from "node:fs";
import { resolve, relative } from "node:path";

const root = process.cwd();
const target = resolve(root, ".next");
const relativeTarget = relative(root, target);

if (relativeTarget.startsWith("..") || relativeTarget === "") {
  throw new Error(`Refusing to clean unsafe path: ${target}`);
}

if (!existsSync(target)) {
  process.exit(0);
}

for (let attempt = 1; attempt <= 3; attempt += 1) {
  try {
    rmSync(target, { recursive: true, force: true, maxRetries: 3, retryDelay: 250 });
    console.log("Cleaned stale .next cache.");
    process.exit(0);
  } catch (error) {
    if (attempt === 3) {
      console.warn("Could not fully clean .next. Stop any running Next.js server and run npm run dev again.");
      console.warn(error instanceof Error ? error.message : error);
      process.exit(0);
    }
  }
}
