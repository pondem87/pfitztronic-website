import type { APIRoute } from "astro";
import { siteConfig } from "../config";
import { routePath, siteRoutes } from "../routes";

export const GET: APIRoute = () => {
  const urls = siteRoutes
    .filter(({ indexable }) => indexable)
    .map(({ route }) => `  <url><loc>${siteConfig.origin}${routePath(route)}</loc></url>`)
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
