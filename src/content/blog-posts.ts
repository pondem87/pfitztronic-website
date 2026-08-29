export interface BlogPost {
  slug: string;
  title: string;
  heading: string;
  description: string;
  image: string;
  imageAlt: string;
  published: string;
  publishedDisplay: string;
  ctaHeading: string;
  ctaText: string;
}

export const blogPosts = {
  "clinical-information-architecture": {
    slug: "clinical-information-architecture",
    title: "Beyond the Diagnosis: Clinical Information Architecture for Chronic Care - Pfitztronic",
    heading: "Beyond the Diagnosis: Clinical Information Architecture for Chronic Care",
    description: "Why chronic care records should preserve clinical goals, progress, interventions and next decisions across encounters.",
    image: "/img/blogs/clinical-information-architecture.jpg",
    imageAlt: "Clinician reviewing a digital patient record",
    published: "2026-08-24",
    publishedDisplay: "24 August 2026",
    ctaHeading: "Architect better clinical systems",
    ctaText: "Pfitztronic helps healthcare organisations connect clinical goals, information, processes and technology through practical architecture.",
  },
  "first-pdca-cycle": {
    slug: "first-pdca-cycle",
    title: "Implementing a QMS with the First PDCA Cycle - Pfitztronic",
    heading: "Implementing a Quality Management System Without Trying to Fix Everything at Once",
    description: "A practical approach to implementing a quality management system through strategic priorities, risk-based thinking and successive PDCA cycles.",
    image: "/img/blogs/implementing-a-quality-management-system.jpg",
    imageAlt: "Four colleagues reviewing work together on a laptop",
    published: "2026-08-21",
    publishedDisplay: "21 August 2026",
    ctaHeading: "Build your first improvement cycle",
    ctaText: "Pfitztronic helps organisations connect strategic priorities, risks, capabilities and processes to practical improvement roadmaps.",
  },
  "africa-fourth-industrial-revolution": {
    slug: "africa-fourth-industrial-revolution",
    title: "Is Africa Preparing for the Fourth Industrial Revolution? - Pfitztronic",
    heading: "Is Africa Preparing for the Fourth Industrial Revolution?",
    description: "Why Africa's Fourth Industrial Revolution readiness depends on architecture, capabilities, leadership, skills and governance—not technology adoption alone.",
    image: "/img/blogs/fourth-industrial-rev-blog-1.jpg",
    imageAlt: "Technology and the Fourth Industrial Revolution in Africa",
    published: "2026-08-16",
    publishedDisplay: "16 August 2026",
    ctaHeading: "Build transformation capability",
    ctaText: "Pfitztronic helps organisations connect strategic outcomes to the architecture, capabilities, governance, and technology required to deliver them.",
  },
  "healthcare-digital-transformation": {
    slug: "healthcare-digital-transformation",
    title: "Digital Transformation in African Healthcare: Why Digitising Broken Systems Is Not Enough - Pfitztronic",
    heading: "Digital Transformation in African Healthcare: Why Digitising Broken Systems Is Not Enough",
    description: "Why African healthcare digital transformation must improve processes, capabilities, information flows and architecture instead of simply digitising broken systems.",
    image: "/img/blogs/healthcare-digital-transformation-blog-1.jpg",
    imageAlt: "Digital transformation in African healthcare",
    published: "2026-08-16",
    publishedDisplay: "16 August 2026",
    ctaHeading: "Architect better health systems",
    ctaText: "Pfitztronic helps healthcare organisations connect outcomes, processes, information, people, and technology through practical architecture.",
  },
  "right-level-of-formality": {
    slug: "right-level-of-formality",
    title: "Enterprise Architecture for SME Growth: A Critical Look at the SMEAG Model - Pfitztronic",
    heading: "Enterprise Architecture for SME Growth: A Critical Look at the SMEAG Model",
    description: "A critical assessment of the SMEAG model and how enterprise architecture can help SMEs manage growth and increasing organisational complexity.",
    image: "/img/blogs/the-right-level-of-formality-blog-1.jpg",
    imageAlt: "Enterprise architecture supporting SME growth",
    published: "2026-08-16",
    publishedDisplay: "16 August 2026",
    ctaHeading: "Plan your next stage of growth",
    ctaText: "Pfitztronic helps SMEs align capabilities, processes, information, governance, and technology with their growth strategy.",
  },
} satisfies Record<string, BlogPost>;

export type BlogSlug = keyof typeof blogPosts;

export function blogStructuredData(post: BlogPost, origin: string): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.heading,
    description: post.description,
    image: `${origin}${post.image}`,
    datePublished: post.published,
    dateModified: post.published,
    author: { "@type": "Person", name: "Dr Tendai Pfidze" },
    publisher: {
      "@type": "Organization",
      name: "Pfitztronic Pty Ltd",
      logo: { "@type": "ImageObject", url: `${origin}/img/logo.png` },
    },
    mainEntityOfPage: `${origin}/blogs/${post.slug}.html`,
  });
}
