import { Helmet } from "react-helmet-async";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    "name": "Yashoda Mahadeo Kakade College of Engineering",
    "alternateName": "YMKCOE",
    "url": "https://ymkcoe.com",
    "logo": "https://ymkcoe.com/ymkcoe_logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Near Railway Station, Talegaon Dabhade",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "410507",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-89836-83005",
      "contactType": "Admissions",
      "email": "admission@ymkcoe.com"
    },
    "sameAs": [
      "https://www.facebook.com/ymkcoe",
      "https://www.linkedin.com/school/ymkcoe"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Yashoda Mahadeo Kakade College of Engineering",
    "image": "https://ymkcoe.com/ymkcoe_logo.png",
    "@id": "https://ymkcoe.com",
    "url": "https://ymkcoe.com",
    "telephone": "+91 89836 83005",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Near Railway Station, Talegaon Dabhade",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "410507",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.7303,
      "longitude": 73.6644
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "17:00"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
