import fs from "node:fs";
import path from "node:path";

const srcFile = path.resolve(process.cwd(), "src/styles.css");
const distDir = path.resolve(process.cwd(), "dist");
const targetFile = path.join(distDir, "styles.css");

if (!fs.existsSync(srcFile)) {
  throw new Error(`Source stylesheet not found: ${srcFile}`);
}

fs.mkdirSync(distDir, { recursive: true });
fs.copyFileSync(srcFile, targetFile);
