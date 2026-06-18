import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { seo, siteInfo } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteInfo.url),
  title: {
    default: seo.title,
    template: "%s | AJRRADY",
  },
  description: seo.description,
  icons: {
    icon: "/Favicon.png",
    shortcut: "/Favicon.png",
    apple: "/Favicon.png",
  },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: siteInfo.url,
    siteName: siteInfo.name,
    locale: "fr_GN",
    type: "website",
    images: [
      {
        url: "/Landingpage.jpg",
        width: 1366,
        height: 768,
        alt: "AJRRADY - Unis pour servir, engagés pour développer Youkounkoun",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: ["/Landingpage.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
