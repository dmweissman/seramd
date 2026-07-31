// Structured data for SERA MD. Pre-opening: intentionally no openingHours,
// telephone, or priceRange. Update `sameAs`, add hours/phone at launch.
export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "SERA MD",
  alternateName: "Sera MD Aesthetic Medicine & Longevity",
  description:
    "SERA MD is a physician-led aesthetic medicine, cosmetic surgery, and longevity institute coming soon to Middletown, New Jersey.",
  url: "https://www.seramd.com",
  email: "david@seramd.com",
  image: "https://www.seramd.com/og-image.png",
  logo: "https://www.seramd.com/og-image.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2 Kings Highway East",
    addressLocality: "Middletown",
    addressRegion: "NJ",
    postalCode: "07748",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.3895,
    longitude: -74.1099,
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Monmouth County, NJ" },
    { "@type": "State", name: "New Jersey" },
  ],
  medicalSpecialty: ["PlasticSurgery", "Dermatology"],
  knowsAbout: [
    "aesthetic medicine",
    "cosmetic surgery",
    "longevity medicine",
    "laser skin treatment",
    "regenerative medicine",
  ],
  sameAs: [],
} as const;
