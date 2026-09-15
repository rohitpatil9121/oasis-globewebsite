import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://oasisglobe.in",
  output: "static",
  build: { inlineStylesheets: "always" },
  compressHTML: true,
});
