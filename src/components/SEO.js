import { Helmet } from 'react-helmet-async';

function SEO({ title, description, image, url, type = 'website', author = 'Anonymous' }) {
  const siteTitle = 'AnonyPost';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = 'Share your thoughts anonymously with the world.';
  const siteUrl = process.env.APP_SITE_URL ;
  const canonical = process.env.APP_SITE_URL;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <link rel="canonical" href={canonical} />
      <meta name="author" content={author} />

      {/* Open Graph */}
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      {image && <meta property="og:image" content={image} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@anonypost" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Schema.org markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "http://schema.org",
          "@type": type === 'article' ? "Article" : "Website",
          "name": fullTitle,
          "description": description || defaultDescription,
          "url": canonical,
          ...(image && { "image": image }),
          "author": {
            "@type": "Person",
            "name": author
          }
        })}
      </script>
    </Helmet>
  );
}

export default SEO;
