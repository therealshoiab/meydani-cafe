import React from 'react';

export default function SEOHead({ title, description, path = '' }) {
  const fullTitle = `${title} | Meydani Cafe`;
  const url = `https://meydanicafe.com${path}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={url} />
    </>
  );
}
