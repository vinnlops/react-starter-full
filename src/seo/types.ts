export interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    canonical?: string;
    image?: string;
    robots?: string;

    structuredData?: Record<string, unknown>;
}