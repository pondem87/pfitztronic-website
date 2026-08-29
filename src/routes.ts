export interface SiteRoute {
  route: string;
  sourceFile?: string;
  indexable: boolean;
}

export const siteRoutes: SiteRoute[] = [
  { route: "", sourceFile: "index.html", indexable: true },
  { route: "about", sourceFile: "about.html", indexable: true },
  { route: "service", sourceFile: "service.html", indexable: true },
  { route: "services/business-architecture-design", sourceFile: "services/business-architecture-design.html", indexable: true },
  { route: "services/capability-maturity-assessment", sourceFile: "services/capability-maturity-assessment.html", indexable: true },
  { route: "services/digital-transformation-readiness", sourceFile: "services/digital-transformation-readiness.html", indexable: true },
  { route: "services/enterprise-architecture", sourceFile: "services/enterprise-architecture.html", indexable: true },
  { route: "services/process-and-experience-design", sourceFile: "services/process-and-experience-design.html", indexable: true },
  { route: "services/solution-delivery-and-support", sourceFile: "services/solution-delivery-and-support.html", indexable: true },
  { route: "blog", sourceFile: "blog.html", indexable: true },
  { route: "blogs/clinical-information-architecture", indexable: true },
  { route: "blogs/first-pdca-cycle", indexable: true },
  { route: "blogs/africa-fourth-industrial-revolution", indexable: true },
  { route: "blogs/healthcare-digital-transformation", indexable: true },
  { route: "blogs/right-level-of-formality", indexable: true },
  { route: "contact", sourceFile: "contact.html", indexable: true },
  { route: "faqs", sourceFile: "faqs.html", indexable: true },
  { route: "privacy", sourceFile: "privacy.html", indexable: true },
  { route: "404", sourceFile: "404.html", indexable: false },
];

export function routePath(route: string): string {
  return route ? `/${route}.html` : "/";
}
