import type { Metadata } from "next";
import { InfoCard } from "@/components/InfoCard";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { AlternatingItem } from "@/components/motion";
import { JsonLd } from "@/components/JsonLd";
import { achievements } from "@/data/site";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, webPageSchema } from "@/lib/schemas";

export const metadata: Metadata = createMetadata({
  title: "Projets & Réalisations à Youkounkoun",
  description:
    "Projets et réalisations de l'AJRRADY à Youkounkoun, Koundara : stade, école, infrastructure communautaire et développement local.",
  keywords: [
    "AJRRADY",
    "Youkounkoun",
    "Koundara",
    "Guinée",
    "réalisations",
    "projets",
    "Stade Lonny Allotène",
    "école",
    "infrastructure",
    "développement local",
  ],
  path: "/realisations",
});

export default function AchievementsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Accueil", path: "/" }, { name: "Réalisations", path: "/realisations" }])} />
      <JsonLd data={webPageSchema({ path: "/realisations", name: "Projets & Réalisations à Youkounkoun | AJRRADY", description: "Projets et réalisations de l'AJRRADY à Youkounkoun, Koundara : stade, école, infrastructure communautaire et développement local." })} />
      <PageHero
        eyebrow="Réalisations"
        title="Actions documentées"
        description="Les réalisations présentées correspondent aux initiatives portées ou accompagnées par l'AJRRADY."
      />
      <section className="py-16">
        <div className="mx-auto w-[min(1160px,calc(100%-32px))]">
          <SectionHeading
            eyebrow="Réalisations"
            title="Principales réalisations de l'AJRRADY"
          />
          <div className="grid gap-5 md:grid-cols-2">
            {achievements.map((item, index) => (
              <AlternatingItem key={item.title} index={index}>
                <InfoCard item={item} />
              </AlternatingItem>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
