// Generated so a new page can never be forgotten: every route the site builds
// is listed here. robots.txt points at this file.
import { biz, slug } from "../data/business.js";

export function GET({ site }) {
  const paths = ["/", "/custom/", "/price-list/", ...biz.areas.map((a) => `/areas/${slug(a)}/`)];
  const today = new Date().toISOString().slice(0, 10);
  const urls = paths
    .map((p) => `  <url><loc>${new URL(p, site).href}</loc><lastmod>${today}</lastmod>` +
                `<priority>${p === "/" ? "1.0" : p.startsWith("/areas/") ? "0.7" : "0.8"}</priority></url>`)
    .join("\n");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml" } },
  );
}
