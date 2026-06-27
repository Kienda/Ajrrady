import type { Metadata } from "next";
import { ProgramCard } from "@/components/ProgramCard";
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
        title="Domaines d'intervention"
        description="Les programmes stratégiques structurent l'engagement communautaire de l'AJRRADY à Youkounkoun."
      />
      <section className="bg-ajLight py-20">
        <div className="mx-auto w-[min(1160px,calc(100%-32px))]">
          <SectionHeading
            eyebrow="Actions"
            title="Nos secteurs d'intervention"
            description="Des actions concrètes pour un impact durable à Youkounkoun."
            centered
          />
          <StaggerContainer className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {actionDomains.map((item) => (
              <ProgramCard key={item.title} item={item} />
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
