# SEO Implementation Guide

## Overview
This document outlines the SEO implementation across the Strategic Advisory website.

## Components & Files

### 1. **useSEO Hook** (`/src/hooks/use-seo.ts`)
A custom React hook that manages all SEO meta tags and structured data for each page.

**Features:**
- Sets page title
- Manages meta tags (description, keywords)
- Handles Open Graph tags (social sharing)
- Manages Twitter Card tags
- Sets canonical URLs
- Adds JSON-LD structured data

**Usage:**
```typescript
import { useSEO } from '@/hooks/use-seo';

useSEO({
  title: 'Page Title',
  description: 'Page description',
  keywords: 'keyword1, keyword2',
  canonical: 'https://example.com/page',
  ogTitle: 'OG Title',
  ogDescription: 'OG Description',
  ogImage: 'https://example.com/image.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Twitter Title',
  twitterDescription: 'Twitter Description',
  twitterImage: 'https://example.com/image.jpg',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    // ... schema properties
  }
});
```

### 2. **Head Component** (`/src/components/Head.tsx`)
Enhanced with additional SEO meta tags:
- Theme color
- Apple mobile web app capabilities
- Robots directives
- DNS prefetch for performance
- Font preconnect

### 3. **Pages with SEO Implementation**

All pages now include SEO configuration:

#### HomePage (`/src/components/pages/HomePage.tsx`)
- **Title:** Private Equity & AI Advisory | Strategic Business Optimization
- **Description:** Transform your business with expert private equity and AI-driven advisory services.
- **Structured Data:** Organization schema

#### ServicesFrameworkPage (`/src/components/pages/ServicesFrameworkPage.tsx`)
- **Title:** Our Services & Engagement Models | Strategic Advisory
- **Description:** Explore our comprehensive advisory services and flexible engagement models.
- **Structured Data:** Service schema

#### CaseStudiesDetailPage (`/src/components/pages/CaseStudiesDetailPage.tsx`)
- **Title:** Case Studies & Sample Blueprint | Strategic Advisory
- **Description:** Explore our case studies and sample revenue architecture blueprint.
- **Structured Data:** CollectionPage schema

#### FAQDetailPage (`/src/components/pages/FAQDetailPage.tsx`)
- **Title:** Frequently Asked Questions | Strategic Advisory
- **Description:** Find answers to common questions about our advisory services.
- **Structured Data:** FAQPage schema

#### EngagementModelPage (`/src/components/pages/EngagementModelPage.tsx`)
- **Title:** Engagement Models | Strategic Advisory
- **Description:** Discover our flexible engagement models designed to meet your business needs.
- **Structured Data:** Service schema

#### ApplyPage (`/src/components/pages/ApplyPage.tsx`)
- **Title:** Apply for Advisory Services | Strategic Advisory
- **Description:** Apply for our strategic advisory services.

#### ApplicationPage (`/src/components/pages/ApplicationPage.tsx`)
- **Title:** Application Form | Strategic Advisory
- **Description:** Complete our application form to begin your journey.

#### WhyChooseUsPage (`/src/components/pages/WhyChooseUsPage.tsx`)
- **Title:** Why Choose Us | Strategic Advisory
- **Description:** Discover why leading companies choose our strategic advisory services.

#### PrivacyPage (`/src/components/pages/PrivacyPage.tsx`)
- **Title:** Privacy Policy | Strategic Advisory
- **Description:** Read our privacy policy to understand how we protect your information.

#### TermsPage (`/src/components/pages/TermsPage.tsx`)
- **Title:** Terms of Service | Strategic Advisory
- **Description:** Read our terms of service.

#### PhilosophyFrameworkPage (`/src/components/pages/PhilosophyFrameworkPage.tsx`)
- **Title:** Our Philosophy & Framework | Strategic Advisory
- **Description:** Learn about our strategic philosophy and proven advisory framework.
- **Structured Data:** Article schema

## SEO Best Practices Implemented

### 1. **Meta Tags**
- ✅ Unique title tags for each page (50-60 characters)
- ✅ Descriptive meta descriptions (150-160 characters)
- ✅ Relevant keywords for each page
- ✅ Canonical URLs to prevent duplicate content

### 2. **Open Graph Tags**
- ✅ og:title, og:description for social sharing
- ✅ og:type for content classification
- ✅ og:image for visual previews (when available)

### 3. **Twitter Card Tags**
- ✅ twitter:card for Twitter integration
- ✅ twitter:title, twitter:description
- ✅ twitter:image for visual previews

### 4. **Structured Data (Schema.org)**
- ✅ Organization schema on homepage
- ✅ Service schema for service pages
- ✅ CollectionPage schema for case studies
- ✅ FAQPage schema for FAQ page
- ✅ Article schema for philosophy/framework

### 5. **Technical SEO**
- ✅ Responsive meta viewport tag
- ✅ Character encoding (UTF-8)
- ✅ Theme color for browser UI
- ✅ DNS prefetch for performance
- ✅ Font preconnect for faster loading
- ✅ Robots meta tag for crawl directives

### 6. **Performance**
- ✅ Font preconnect reduces render-blocking resources
- ✅ DNS prefetch improves DNS lookup performance

## Adding SEO to New Pages

1. Import the hook:
```typescript
import { useSEO } from '@/hooks/use-seo';
```

2. Call the hook in your component:
```typescript
export default function NewPage() {
  useSEO({
    title: 'Your Page Title | Strategic Advisory',
    description: 'Your page description (150-160 chars)',
    keywords: 'keyword1, keyword2, keyword3',
    canonical: typeof window !== 'undefined' ? window.location.origin + '/your-path' : undefined,
    ogTitle: 'Your OG Title',
    ogDescription: 'Your OG Description',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'YourSchemaType',
      // ... schema properties
    },
  });
  
  // Rest of your component
}
```

## Monitoring & Optimization

### Tools to Use:
1. **Google Search Console** - Monitor indexing and search performance
2. **Google PageSpeed Insights** - Check performance metrics
3. **Schema.org Validator** - Validate structured data
4. **Open Graph Debugger** - Test social sharing previews
5. **Twitter Card Validator** - Test Twitter sharing

### Key Metrics to Monitor:
- Click-through rate (CTR) from search results
- Average position in search results
- Impressions and clicks
- Page load time
- Core Web Vitals

## Future Enhancements

1. **Dynamic Meta Tags** - Generate meta tags based on CMS content
2. **Sitemap** - Create XML sitemap for better crawling
3. **Robots.txt** - Configure crawl directives
4. **Breadcrumb Schema** - Add breadcrumb navigation schema
5. **LocalBusiness Schema** - If applicable for location-based services
6. **Image Optimization** - Add image alt text and schema
7. **Internal Linking** - Optimize internal link structure
8. **Mobile Optimization** - Ensure mobile-first indexing readiness

## Troubleshooting

### Meta tags not updating?
- Clear browser cache
- Check that useSEO hook is called at component mount
- Verify canonical URL is correct

### Structured data not validating?
- Use Schema.org validator
- Ensure JSON-LD is valid JSON
- Check for required properties

### Social sharing not working?
- Use Open Graph debugger
- Verify og:image URL is accessible
- Check og:title and og:description length
