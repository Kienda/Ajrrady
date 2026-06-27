import { siteInfo } from "@/data/site";

const BASE = siteInfo.url;

// Approximate GPS coordinates for Youkounkoun
const YOUKOUNKOUN = { latitude: 12.5333, longitude: -13.1167 };

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["NGO", "Organization"],
    "@id": `${BASE}/#organization`,
    name: siteInfo.fullName,
    alternateName: "AJRRADY",
    url: BASE,
    logo: {
      "@type": "ImageObject",
      url: `${BASE}/Favicon.png`,
    },
    image: `${BASE}/Landingpage.jpg`,
    description:
      "AJRRADY est une association communautaire guinéenne engagée dans l'éducation, la culture, le sport, la santé, l'environnement, la solidarité et la mobilisation de la diaspora pour le développement de Youkounkoun, Koundara.",
    telephone: siteInfo.phone,
    email: siteInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lansanaya Barrage",
      addressLocality: "Conakry",
      addressRegion: "Commune de Tombolia",
      addressCountry: "GN",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Youkounkoun, Préfecture de Koundara, Région de Boké, Guinée",
    },
    sameAs: [
      "https://www.facebook.com/profile.php?id=61590795758568",
      "https://www.instagram.com/ajrrady_/",
      "https://www.linkedin.com/company/ajrrady",
      "https://www.youtube.com/channel/UCPKJ1dicFi2TvyGnzAzbDjw",
    ],
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    name: "AJRRADY",
    url: BASE,
    description:
      "Site officiel de l'AJRRADY – Association pour le Développement de Youkounkoun, Koundara, Guinée.",
    inLanguage: "fr",
    publisher: { "@id": `${BASE}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE}/galerie?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE}/#localbusiness`,
    name: "AJRRADY – Youkounkoun",
    description:
      "Association guinéenne pour le développement de Youkounkoun, Koundara. Éducation, culture, sport, santé, environnement et solidarité.",
    url: BASE,
    telephone: siteInfo.phone,
    email: siteInfo.email,
    image: `${BASE}/Landingpage.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lansanaya Barrage",
      addressLocality: "Conakry",
      addressRegion: "Commune de Tombolia",
      addressCountry: "GN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: YOUKOUNKOUN.latitude,
      longitude: YOUKOUNKOUN.longitude,
    },
    areaServed: "Youkounkoun, Koundara, Boké, Guinée",
    sameAs: [
      "https://www.facebook.com/profile.php?id=61590795758568",
      "https://www.instagram.com/ajrrady_/",
    ],
  };
}

export function sportsEventSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    "@id": `${BASE}/fec-sy#event-2026`,
    name: "FEC-SY 2026 – Festival Estival et Culturel de la Sous-Préfecture de Youkounkoun",
    alternateName: "FEC-SY 2026",
    description:
      "Deuxième édition du FEC-SY : tournoi de football et journée culturelle organisés par l'AJRRADY au Stade Lonny Allotène de Youkounkoun, du 11 juillet au 9 août 2026.",
    startDate: "2026-07-11",
    endDate: "2026-08-09",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    sport: "Football",
    url: `${BASE}/fec-sy`,
    image: `${BASE}/Landingpage.jpg`,
    location: {
      "@type": "Place",
      name: "Stade Lonny Allotène de Youkounkoun",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Youkounkoun",
        addressRegion: "Koundara",
        addressCountry: "GN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: YOUKOUNKOUN.latitude,
        longitude: YOUKOUNKOUN.longitude,
      },
    },
    organizer: {
      "@id": `${BASE}/#organization`,
      "@type": "Organization",
      name: "AJRRADY",
      url: BASE,
    },
  };
}
