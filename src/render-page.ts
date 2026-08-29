import { readFile } from "node:fs/promises";
import { resolve, sep } from "node:path";
import { siteConfig } from "./config";
import { routePath } from "./routes";

const contentRoot = resolve(process.cwd(), "src/content/pages");

function replaceAll(source: string, search: string, replacement: string): string {
  return source.split(search).join(replacement);
}

function escapeAttribute(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

export async function renderPage(sourceFile: string, route: string): Promise<string> {
  const filePath = resolve(contentRoot, sourceFile);

  if (!filePath.startsWith(`${contentRoot}${sep}`)) {
    throw new Error(`Page source escapes content directory: ${sourceFile}`);
  }

  let html = await readFile(filePath, "utf8");
  const pathname = routePath(route);
  const canonical = `${siteConfig.origin}${pathname}`;

  html = replaceAll(html, "https://pfitztronic.co.bw", siteConfig.origin);
  html = replaceAll(html, "tendai@pfitztronic.co.bw", siteConfig.email);
  html = replaceAll(html, "Kanye, Botswana", siteConfig.location);
  html = replaceAll(html, "+ 267 74 178 111", siteConfig.phoneDisplay);
  html = replaceAll(html, "+267 74 178 111", siteConfig.phoneDisplay);
  html = replaceAll(html, "tel:+0123456789", `tel:${siteConfig.phoneHref}`);
  html = replaceAll(html, "tel:+26774178111", `tel:${siteConfig.phoneHref}`);
  html = replaceAll(html, "mailto:info@example.com", `mailto:${siteConfig.email}`);
  html = replaceAll(
    html,
    "https://www.google.com/maps?q=-24.966750,25.332731&z=17&output=embed",
    siteConfig.mapUrl,
  );
  html = replaceAll(html, "G-MX8N9PZCH4", siteConfig.googleAnalyticsId);
  html = replaceAll(html, "https://www.facebook.com/profile.php?id=61572125436868", siteConfig.facebookUrl);
  html = replaceAll(html, "https://x.com/TindoWaTakue", siteConfig.xUrl);
  html = replaceAll(html, "https://www.linkedin.com/company/pfitztronic", siteConfig.linkedinUrl);

  html = html.replace(
    /<html\s+lang="[^"]*"/,
    `<html lang="${escapeAttribute(siteConfig.locale)}" data-site-country="${siteConfig.countryCode}" data-contact-form-endpoint="${escapeAttribute(siteConfig.contactFormEndpoint)}"`,
  );
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, "");

  const domainMetadata = [
    `    <link rel="canonical" href="${canonical}">`,
    `    <link rel="alternate" hreflang="${siteConfig.locale}" href="${siteConfig.origin}${pathname}">`,
    `    <link rel="alternate" hreflang="${siteConfig.alternateLocale}" href="${siteConfig.alternateOrigin}${pathname}">`,
    `    <link rel="alternate" hreflang="x-default" href="${siteConfig.defaultOrigin}${pathname}">`,
  ].join("\n");

  html = html.replace(/<\/head>/i, `${domainMetadata}\n</head>`);
  return html;
}
