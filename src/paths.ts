/** Return a link that works when a country build is mounted at any path. */
export function pageHref(currentRoute: string, targetRoute: string): string {
  const depth = Math.max(0, currentRoute.split("/").length - 1);
  const prefix = "../".repeat(depth);
  return targetRoute ? `${prefix}${targetRoute}.html` : `${prefix}index.html`;
}
