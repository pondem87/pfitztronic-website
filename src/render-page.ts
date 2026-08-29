import { readFile } from "node:fs/promises";
import { resolve, sep } from "node:path";
import { siteConfig } from "./config";

const contentRoot = resolve(process.cwd(), "src/content/pages");

export interface PageContent {
  title: string;
  description: string;
  heading: string;
  html: string;
  structuredData: string[];
}

function replaceAll(source: string, search: string, replacement: string): string {
  return source.split(search).join(replacement);
}

function countryContent(html: string): string {
  html = replaceAll(html, "https://pfitztronic.co.bw", siteConfig.origin);
  html = replaceAll(html, "tendai@pfitztronic.co.bw", siteConfig.email);
  html = replaceAll(html, "Kanye, Botswana", siteConfig.location);
  html = replaceAll(html, "+ 267 74 178 111", siteConfig.phoneDisplay);
  html = replaceAll(html, "+267 74 178 111", siteConfig.phoneDisplay);
  html = replaceAll(html, "tel:+0123456789", `tel:${siteConfig.phoneHref}`);
  html = replaceAll(html, "tel:+26774178111", `tel:${siteConfig.phoneHref}`);
  html = replaceAll(html, "mailto:info@example.com", `mailto:${siteConfig.email}`);
  return html;
}

function textOf(value: string): string {
  return value.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').trim();
}

function betweenMarkers(html: string, start: string, end: string): string | undefined {
  return html.match(new RegExp(`<!--\\s*${start}\\s*-->([\\s\\S]*?)<!--\\s*${end}\\s*-->`, "i"))?.[1].trim();
}

function mainContent(html: string): string {
  const match = html.match(/<main\b([^>]*)>([\s\S]*?)<\/main>/i);
  if (!match) return "";
  const content = match[2].replace(/<header\b[^>]*>[\s\S]*?<\/header>/i, "").trim();
  return `<main${match[1]}>${content}</main>`;
}

function extractContent(html: string, route: string): string {
  if (route === "") {
    const start = html.indexOf("<!-- About Start -->");
    const end = html.indexOf("<!-- Contact Start -->");
    if (start >= 0 && end > start) return html.slice(start, end).trim();
  }
  if (route === "404") return betweenMarkers(html, "Error Start", "Error End") ?? mainContent(html);

  const factEnd = html.match(/<!--\s*Fact End\s*-->/i);
  if (factEnd?.index !== undefined) {
    const start = factEnd.index + factEnd[0].length;
    const contact = html.indexOf("<!-- Contact Start -->", start);
    const footer = html.indexOf("<!-- Footer Start -->", start);
    const end = contact >= 0 ? contact : footer;
    if (end > start) return html.slice(start, end).trim();
  }
  return mainContent(html);
}

export async function loadPageContent(sourceFile: string, route: string): Promise<PageContent> {
  const filePath = resolve(contentRoot, sourceFile);
  if (!filePath.startsWith(`${contentRoot}${sep}`)) throw new Error(`Page source escapes content directory: ${sourceFile}`);

  const source = countryContent(await readFile(filePath, "utf8"));
  const title = textOf(source.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "Pfitztronic");
  const description = source.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)?.[1] ?? "";
  const pageHeader = source.match(/<(?:header|div)\b[^>]*class=["'][^"']*page-header[^"']*["'][^>]*>([\s\S]*?)(?:<\/(?:header|div)>)/i)?.[1] ?? "";
  const heading = textOf(pageHeader.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? title.split(" - ")[0]);
  const structuredData = [...source.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)].map((match) => match[1].trim());

  return { title, description, heading, html: extractContent(source, route), structuredData };
}
