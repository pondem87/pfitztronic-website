export interface SiteRoute {
  route: string;
  sourceFile: string;
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
  { route: "blogs/clinical-information-architecture", sourceFile: "blogs/clinical-information-architecture.html", indexable: true },
  { route: "blogs/first-pdca-cycle", sourceFile: "blogs/first-pdca-cycle.html", indexable: true },
  { route: "blogs/africa-fourth-industrial-revolution", sourceFile: "blogs/africa-fourth-industrial-revolution.html", indexable: true },
  { route: "blogs/healthcare-digital-transformation", sourceFile: "blogs/healthcare-digital-transformation.html", indexable: true },
  { route: "blogs/right-level-of-formality", sourceFile: "blogs/right-level-of-formality.html", indexable: true },
  { route: "contact", sourceFile: "contact.html", indexable: true },
  { route: "faqs", sourceFile: "faqs.html", indexable: true },
  { route: "privacy", sourceFile: "privacy.html", indexable: true },
  { route: "404", sourceFile: "404.html", indexable: false },
];

export function routePath(route: string): string {
  return route ? `/${route}.html` : "/";
}
