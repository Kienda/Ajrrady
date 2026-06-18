import type { Metadata } from "next";
import { InfoCard } from "@/components/InfoCard";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { achievements } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Réalisations",
  path: "/realisations",
});

export default function AchievementsPage() {
  return (
    <>
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
            {achievements.map((item) => (
              <InfoCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
