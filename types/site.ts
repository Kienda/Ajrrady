export type NavItem = {
  label: string;
  href: string;
};

export type IconName =
  | "education"
  | "culture"
  | "sport"
  | "environment"
  | "solidarity"
  | "diaspora"
  | "community"
  | "health";

export type CardItem = {
  title: string;
  description?: string;
  icon?: IconName;
  items?: string[];
};

export type SocialLink = {
  label: string;
  href: string;
};
