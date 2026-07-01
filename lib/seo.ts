import { Metadata } from 'next';

export const siteConfig = {
  name: "Rizonn",
  description: "Advanced Networking Solutions & Access Point Controllers",
  url: "https://rizonn.in",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com/rizonn",
    linkedin: "https://linkedin.com/company/rizonn",
    facebook: "https://facebook.com/rizonn",
  },
};

export function generateMetadata({
  title,
  description,
  image = siteConfig.ogImage,
  noIndex = false,
  keywords = [],
  canonical,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
  canonical?: string;
} = {}): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} - ${siteConfig.description}`;
  const metaDescription = description || "Leading provider of WiFi 6 access points, network controllers, and enterprise wireless infrastructure. Delivering secure, scalable networking solutions for businesses worldwide.";

  const defaultKeywords = [
    "networking solutions",
    "WiFi 6 access points",
    "network controllers",
    "wireless infrastructure",
    "enterprise networking",
    "access point controllers",
    "network security",
    "bandwidth management",
    "hotspot solutions",
    "cloud managed WiFi",
    "network access control",
    "wireless LAN controllers",
    "enterprise WiFi",
    "network management",
    "WiFi solutions"
  ];

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: [...defaultKeywords, ...keywords],
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "website",
      url: canonical || siteConfig.url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [image],
    },
    alternates: {
      canonical: canonical || siteConfig.url,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };
}

// Product-specific SEO metadata generator
export function generateProductMetadata({
  productName,
  productType,
  brand,
  description,
  features = [],
  applications = [],
}: {
  productName: string;
  productType: string;
  brand: string;
  description: string;
  features?: string[];
  applications?: string[];
}): Metadata {
  const title = `${productName} - ${productType} by ${brand}`;
  const metaDescription = `${description} Perfect for ${applications.join(', ')}. Features: ${features.slice(0, 3).join(', ')}.`;
  
  const productKeywords = [
    productName.toLowerCase(),
    productType.toLowerCase(),
    brand.toLowerCase(),
    ...features.map(f => f.toLowerCase()),
    ...applications.map(a => a.toLowerCase()),
    "enterprise networking",
    "wireless solutions",
    "network infrastructure"
  ];

  return generateMetadata({
    title,
    description: metaDescription,
    keywords: productKeywords,
  });
}

// Blog-specific SEO metadata generator
export function generateBlogMetadata({
  title,
  excerpt,
  author,
  publishedDate,
  tags = [],
  slug,
}: {
  title: string;
  excerpt: string;
  author: string;
  publishedDate: string;
  tags?: string[];
  slug: string;
}): Metadata {
  const metaDescription = excerpt.length > 160 ? `${excerpt.substring(0, 157)}...` : excerpt;
  
  const blogKeywords = [
    ...tags,
    "networking blog",
    "technology insights",
    "network solutions",
    "WiFi technology",
    "enterprise networking"
  ];

  return {
    ...generateMetadata({
      title,
      description: metaDescription,
      keywords: blogKeywords,
      canonical: `${siteConfig.url}/blog/${slug}`,
    }),
    authors: [{ name: author }],
    openGraph: {
      type: "article",
      publishedTime: publishedDate,
      authors: [author],
      tags: tags,
    },
  };
}

// Structured data generators
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Rizonn Technologies",
    "url": "https://rizonn.in",
    "logo": "https://rizonn.in/logo.png",
    "description": "Leading provider of advanced networking solutions, WiFi 6 access points, and enterprise wireless infrastructure.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9667656203",
      "contactType": "customer service",
      "email": "info@rizonn.in"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Noida",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://twitter.com/rizonn",
      "https://linkedin.com/company/rizonn",
      "https://facebook.com/rizonn"
    ]
  };
}

export function generateProductSchema(product: {
  name: string;
  description: string;
  brand: string;
  model: string;
  category: string;
  features: string[];
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "model": product.model,
    "category": product.category,
    "image": product.image || "/default-product-image.jpg",
    "manufacturer": {
      "@type": "Organization",
      "name": "Rizonn Technologies"
    },
    "additionalProperty": product.features.map(feature => ({
      "@type": "PropertyValue",
      "name": "Feature",
      "value": feature
    }))
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}