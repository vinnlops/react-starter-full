import { Helmet } from "react-helmet-async";

import { defaultSeo } from "./defaultSeo";
import type { SEOProps } from "./types";

export function SEO({
    title,
    description,
    keywords,
    canonical,
    image,
    robots,
    structuredData,
}: SEOProps) {
    const pageTitle =
        title ?? defaultSeo.title;

    const pageDescription =
        description ?? defaultSeo.description;

    const pageKeywords =
        keywords ?? defaultSeo.keywords;

    const pageImage =
        image ?? defaultSeo.image;

    const pageRobots =
        robots ?? defaultSeo.robots;

    return (
        <Helmet>
            {/* Base */}

            <title>
                {pageTitle}
            </title>

            <meta
                name="description"
                content={pageDescription}
            />

            <meta
                name="keywords"
                content={pageKeywords}
            />

            <meta
                name="robots"
                content={pageRobots}
            />

            {/* Canonical */}

            {canonical && (
                <link
                    rel="canonical"
                    href={canonical}
                />
            )}

            {/* Open Graph */}

            <meta
                property="og:title"
                content={pageTitle}
            />

            <meta
                property="og:description"
                content={pageDescription}
            />

            <meta
                property="og:image"
                content={pageImage}
            />

            <meta
                property="og:site_name"
                content={defaultSeo.siteName}
            />

            <meta
                property="og:type"
                content="website"
            />

            {/* Twitter */}

            <meta
                name="twitter:card"
                content="summary_large_image"
            />

            <meta
                name="twitter:title"
                content={pageTitle}
            />

            <meta
                name="twitter:description"
                content={pageDescription}
            />

            <meta
                name="twitter:image"
                content={pageImage}
            />

            {/* JSON-LD */}

            {structuredData && (
                <script
                    type="application/ld+json"
                >
                    {JSON.stringify(
                        structuredData
                    )}
                </script>
            )}
        </Helmet>
    );
}