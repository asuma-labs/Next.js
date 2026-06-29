export default function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Asuma Bot",
    url: "https://asuma.my.id",
    logo: "https://asuma.my.id/icons/android-chrome-512x512.png",
    description: "Asuma adalah bot WhatsApp multifungsi — AI assistant, manajemen grup, downloader media, RPG & games, dan lebih dari 100 perintah siap pakai.",
    image: "https://asuma.my.id/icons/android-chrome-512x512.png",
    sameAs: [
       "https://instagram.com/ditss.ceo",
       "https://tiktok.com/asuma.id",
       "https://github.com/asuma-labs"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "me@asuma.my.id",
      url: "https://asuma.my.id/contact",
    },
    foundingDate: "2024", 
    areaServed: {
      "@type": "AdministrativeArea",
      name: "World"
    }
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Asuma Bot",
    url: "https://asuma.my.id",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://asuma.my.id/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
