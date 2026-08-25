// Structured data for SERA MD. Pre-opening: intentionally no openingHours,
// telephone, or priceRange. Update `sameAs`, add hours/phone at launch.
export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "SERA MD",
  alternateName: "Sera MD Aesthetic Medicine & Longevity",
  description:
    "SERA MD is a physician-led aesthetic medicine, regenerative, and longevity institute coming soon to Monmouth County, New Jersey.",
  url: "https://www.seramd.com",
  email: "david@seramd.com",
  image: "https://www.seramd.com/og-image.png",
  logo: "https://www.seramd.com/og-image.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Monmouth County",
    addressRegion: "NJ",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Monmouth County, NJ" },
    { "@type": "State", name: "New Jersey" },
  ],
  medicalSpecialty: ["Dermatology"],
  knowsAbout: [
    "aesthetic medicine",
    "longevity medicine",
    "laser skin treatment",
    "regenerative medicine",
    "hormone optimization",
  ],
  sameAs: [],
} as const;
