import { defineConfig } from "astro/config";

// GitHub Pages serves the repo under /oasis-globewebsite until the custom
// domain is attached. SITE / BASE come from the workflow env; local dev and
// the eventual oasisglobe.in build use the defaults.
const site = process.env.SITE || "https://oasisglobe.in";
const base = process.env.BASE || "/";

export default defineConfig({
  site,
  base,
  trailingSlash: "always",
  output: "static",
  build: { inlineStylesheets: "always" },
  compressHTML: true,
});
