import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  minify: true,
  injectStyle: true, // Injects CSS directly into JS
  external: ["react", "react-dom"],
});