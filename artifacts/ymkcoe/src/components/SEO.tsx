import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  keywords?: string;
  ogImage?: string;
}

const DEFAULT_TITLE = "YMKCOE - Yashoda Mahadeo Kakade College of Engineering";
const DEFAULT_DESC = "Yashoda Mahadeo Kakade College of Engineering (YMKCOE) offers premier B.Tech programs in Computer Science, AI & Data Science, IT, and more. AICTE approved and DBATU affiliated.";
const BASE_URL = "https://ymkcoe.com"; // Change to your actual domain
const DEFAULT_IMAGE = `${BASE_URL}/ymkcoe_logo.png`;

export function SEO({
  title,
  description = DEFAULT_DESC,
  canonicalUrl,
  keywords,
  ogImage = DEFAULT_IMAGE,
}: SEOProps) {
  const fullTitle = title ? `${title} | YMKCOE` : DEFAULT_TITLE;
  const url = canonicalUrl ? `${BASE_URL}${canonicalUrl}` : BASE_URL;

  return (
    <Helmet>
      {/* Basic HTML Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="YMKCOE" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
