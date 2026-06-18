import type { CardItem, NavItem, SocialLink } from "@/types/site";

export const siteInfo = {
  name: "AJRRADY",
  fullName:
    "Association des Jeunes Ressortissants, Résidents et Amis pour le Développement de Youkounkoun",
  slogan: "Unis pour servir, engagés pour développer Youkounkoun.",
  url: "https://www.ajrrady.org",
  phone: "+224 628 70 27 34",
  email: "contact@ajrrady.org",
  location: "Youkounkoun, Koundara – Guinée",
  legalNature: "Association communautaire à but non lucratif",
  headOffice:
    "Conakry – Commune de Tombolia – Lansanaya Barrage, République de Guinée",
  interventionArea:
    "Youkounkoun, Préfecture de Koundara, Région Administrative de Boké, avec une représentation locale et des ressortissants établis à travers la Guinée et à l'étranger.",
};

export const seo = {
  title: "AJRRADY | Association pour le Développement de Youkounkoun",
  description:
    "AJRRADY est une organisation communautaire engagée dans le développement durable de Youkounkoun à travers l’éducation, la culture, le sport, l’environnement, la solidarité et la diaspora.",
};

export const navItems: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "À Propos", href: "/a-propos" },
  { label: "Nos Actions", href: "/nos-actions" },
  { label: "Réalisations", href: "/realisations" },
  { label: "FEC-SY", href: "/fec-sy" },
  { label: "Galerie", href: "/galerie" },
  { label: "Contact", href: "/contact" },
];

export const homeDomains: CardItem[] = [
  {
    title: "Éducation",
    description: "Soutenir la scolarisation et la formation des jeunes.",
    icon: "education",
  },
  {
    title: "Culture",
    description: "Promouvoir notre culture et valoriser nos traditions.",
    icon: "culture",
  },
  {
    title: "Sport",
    description: "Encourager la pratique sportive et l'esprit d'équipe.",
    icon: "sport",
  },
  {
    title: "Environnement",
    description: "Agir pour un cadre de vie propre et durable.",
    icon: "environment",
  },
  {
    title: "Solidarité",
    description: "Renforcer la cohésion sociale et l'entraide communautaire.",
    icon: "solidarity",
  },
  {
    title: "Diaspora",
    description: "Mobiliser les fils et filles de Youkounkoun du monde entier.",
    icon: "diaspora",
  },
];

export const actionDomains: CardItem[] = [
  {
    title: "Développement communautaire",
    icon: "community",
    items: [
      "Appui aux infrastructures communautaires",
      "Mobilisation citoyenne",
      "Actions de solidarité",
    ],
  },
  {
    title: "Éducation",
    icon: "education",
    items: [
      "Sensibilisation scolaire",
      "Promotion de l'excellence",
      "Organisation de kermesses éducatives",
      "Appui aux établissements scolaires",
    ],
  },
  {
    title: "Culture",
    icon: "culture",
    items: [
      "Sauvegarde du patrimoine culturel",
      "Promotion des traditions locales",
      "Valorisation des arts et du folklore",
    ],
  },
  {
    title: "Sport",
    icon: "sport",
    items: [
      "Organisation de compétitions sportives",
      "Promotion du football et des activités de jeunesse",
      "Développement des infrastructures sportives",
    ],
  },
  {
    title: "Cohésion sociale",
    icon: "solidarity",
    items: [
      "Promotion du vivre-ensemble",
      "Prévention des conflits",
      "Renforcement du dialogue communautaire",
    ],
  },
  {
    title: "Environnement et développement durable",
    icon: "environment",
    items: [
      "Protection de l'environnement",
      "Assainissement communautaire",
      "Sensibilisation écologique",
      "Reboisement",
      "Lutte contre les feux de brousse",
      "Protection des ressources naturelles",
      "Promotion des bonnes pratiques environnementales",
    ],
  },
];

export const achievements: CardItem[] = [
  {
    title: "Promotion de l’éducation et de l’excellence scolaire",
    description:
      "Cérémonies de récompense et encouragement des meilleurs élèves.",
  },
  {
    title: "Distribution de kits scolaires",
    description: "Appui aux élèves issus de familles vulnérables.",
  },
  {
    title: "Organisation de retraites stratégiques",
    description:
      "Rencontres de travail pour renforcer la gouvernance, la cohésion interne et la planification.",
  },
  {
    title: "Réhabilitation des infrastructures scolaires",
    description: "Amélioration de certaines infrastructures éducatives.",
  },
  {
    title: "Rénovation de la Brigade de Gendarmerie de Youkounkoun",
    description:
      "Contribution à l'amélioration des conditions de travail des agents et du service rendu à la population.",
  },
  {
    title: "Construction du magasin communautaire agricole",
    description:
      "Infrastructure destinée au stockage des produits agricoles et d’élevage.",
  },
  {
    title: "Construction du hangar multifonctionnel des femmes",
    description:
      "Infrastructure dédiée aux activités commerciales et génératrices de revenus des femmes.",
  },
  {
    title: "Festival Culturel et Sportif de Youkounkoun",
    description:
      "Événement de mobilisation communautaire, de culture, de sport et de vivre-ensemble.",
  },
  {
    title: "Construction et aménagement du Stade Loni Allotène",
    description:
      "Clôture, amélioration des infrastructures sportives et préparation du site des compétitions.",
  },
  {
    title: "Mobilisation communautaire et solidarité",
    description:
      "Actions de solidarité, missions de mobilisation et rencontres avec les autorités et partenaires.",
  },
  {
    title: "Campagnes de sensibilisation et de reboisement",
    description:
      "Initiatives en faveur de la sensibilisation communautaire et de la protection de l'environnement.",
  },
];

export const values = [
  "Solidarité",
  "Unité",
  "Engagement communautaire",
  "Respect des traditions",
  "Hospitalité et vivre-ensemble",
  "Intégrité et transparence",
  "Responsabilité",
  "Excellence",
  "Inclusion",
  "Protection de l'environnement",
];

export const festivalParticipants = [
  "Sénégal",
  "Gambie",
  "Guinée-Bissau",
  "Préfecture de Gaoual",
  "Ensemble des sous-préfectures de Koundara",
];

export const footerActions = [
  "Éducation",
  "Culture",
  "Sport",
  "Environnement",
  "Solidarité",
  "Diaspora",
];

export const socialLinks: SocialLink[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61590795758568",
  },
  { label: "Instagram", href: "https://www.instagram.com/ajrrady_/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/ajrrady" },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCPKJ1dicFi2TvyGnzAzbDjw",
  },
];

export const routes = [
  "/",
  "/a-propos",
  "/nos-actions",
  "/realisations",
  "/fec-sy",
  "/galerie",
  "/adhesion",
  "/contact",
];
