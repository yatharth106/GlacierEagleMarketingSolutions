import { useEffect } from 'react';

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: Record<string, any>;
}

export const useSEO = (config: SEOConfig) => {
  useEffect(() => {
    // Set title
    document.title = config.title;

    // Helper to set meta tag
    const setMeta = (name: string, content: string, isProperty = false) => {
      let element = document.querySelector(
        isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`
      );
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Set standard meta tags
    setMeta('description', config.description);
    if (config.keywords) {
      setMeta('keywords', config.keywords);
    }

    // Set Open Graph tags
    setMeta('og:title', config.ogTitle || config.title, true);
    setMeta('og:description', config.ogDescription || config.description, true);
    setMeta('og:type', config.ogType || 'website', true);
    if (config.ogImage) {
      setMeta('og:image', config.ogImage, true);
    }

    // Set Twitter Card tags
    setMeta('twitter:card', config.twitterCard || 'summary_large_image');
    setMeta('twitter:title', config.twitterTitle || config.title);
    setMeta('twitter:description', config.twitterDescription || config.description);
    if (config.twitterImage) {
      setMeta('twitter:image', config.twitterImage);
    }

    // Set canonical URL
    if (config.canonical) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', config.canonical);
    }

    // Add structured data (JSON-LD)
    if (config.structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(config.structuredData);
    }

    return () => {
      // Cleanup is optional - meta tags can persist
    };
  }, [config]);
};
