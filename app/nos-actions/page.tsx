import type { Metadata } from "next";
import { InfoCard } from "@/components/InfoCard";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { StaggerContainer } from "@/components/motion";
import { actionDomains } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Nos Actions",
  path: "/nos-actions",
});

export default function ActionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos Actions"
        title="Domaines d’intervention"
        description="Les programmes stratégiques structurent l’engagement communautaire de l’AJRRADY à Youkounkoun."
      />
      <section className="bg-ajLight py-16">
        <div className="mx-auto w-[min(1160px,calc(100%-32px))]">
          <SectionHeading
            eyebrow="Actions"
            title="Des interventions simples, utiles et communautaires"
          />
          <StaggerContainer className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {actionDomains.map((item) => (
              <InfoCard key={item.title} item={item} />
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
