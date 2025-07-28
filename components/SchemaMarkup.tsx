export default function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CarRental",
    "name": "Location Maroc",
    "image": "https://www.krilicar.com/Gelogo.png",
    "description": "Location de voitures à Fès et partout au Maroc. Prix compétitifs, large gamme de véhicules, service professionnel.",
    "@id": "https://www.krilicar.com",
    "url": "https://www.krilicar.com",
    "telephone": "+212 648 985 150",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+212 648 985 150",
      "contactType": "customer service",
      "email": "locationmaroc@gmail.com",
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Avenue Mecque",
      "addressLocality": "Fès",
      "addressRegion": "Fès-Meknès",
      "postalCode": "30070",
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 34.0367,
      "longitude": -5.0003
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "08:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Saturday",
          "Sunday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/oualidcar",
      "https://www.instagram.com/oualidcar"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
