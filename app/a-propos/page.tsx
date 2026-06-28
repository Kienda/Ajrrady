import type { Metadata } from "next";
import { HighlightText } from "@/components/HighlightText";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { FadeUp, SlideIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { JsonLd } from "@/components/JsonLd";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, webPageSchema } from "@/lib/schemas";
import { siteInfo, values } from "@/data/site";

export const metadata: Metadata = createMetadata({
  title: "Notre Association – AJRRADY Youkounkoun",
  description:
    "Découvrez la mission, la vision et les valeurs de l'AJRRADY, association guinéenne engagée pour Youkounkoun, Koundara, Guinée.",
  keywords: [
    "AJRRADY",
    "Youkounkoun",
    "Koundara",
    "Guinée",
    "association guinéenne",
    "mission",
    "vision",
    "valeurs",
    "histoire",
    "développement local",
  ],
  path: "/a-propos",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Accueil", path: "/" }, { name: "À Propos", path: "/a-propos" }])} />
      <JsonLd data={webPageSchema({ path: "/a-propos", name: "Notre Association – AJRRADY Youkounkoun | AJRRADY", description: "Découvrez la mission, la vision et les valeurs de l'AJRRADY, association guinéenne engagée pour Youkounkoun, Koundara, Guinée." })} />
      <PageHero
        eyebrow="À Propos"
        title="AJRRADY"
        description="Une association communautaire à but non lucratif mobilisée pour le développement de Youkounkoun."
      />

      {/* Présentation + info box */}
      <section className="py-16">
        <div className="mx-auto grid w-[min(1160px,calc(100%-32px))] gap-10 lg:grid-cols-[1fr_0.8fr]">
          <SlideIn from="left">
            <SectionHeading
              eyebrow="Présentation"
              title="Une organisation au service de Youkounkoun"
              description={`${siteInfo.fullName} rassemble les ressortissants, résidents et amis de Youkounkoun autour d'initiatives utiles au développement local.`}
            />
            <div className="space-y-5 text-lg leading-8 text-slate-700">
              <p>
                <HighlightText text="AJRRADY accompagne les dynamiques communautaires dans les domaines de l'éducation, de la culture, du sport, de la santé, de la cohésion sociale, de l'environnement et du développement durable." />
              </p>
              <p>
                <HighlightText text="L'association renforce les liens de solidarité entre les ressortissants, promeut les valeurs de paix et de vivre-ensemble, et soutient les initiatives engagées en faveur des populations de Youkounkoun." />
              </p>
            </div>
          </SlideIn>
          <SlideIn from="right" delay={0.1}>
            <div className="rounded-lg border-l-4 border-ajGreen bg-ajLight p-7 shadow-card transition-[box-shadow,transform] duration-300 hover:-translate-y-1.5 hover:shadow-xl motion-reduce:hover:translate-y-0">
              <dl className="space-y-5">
                <InfoTerm label="Nature juridique" value={siteInfo.legalNature} />
                <InfoTerm label="Siège social" value={siteInfo.headOffice} />
                <InfoTerm label="Zone d'intervention" value={siteInfo.interventionArea} />
                <InfoTerm label="Devise" value={siteInfo.slogan} />
              </dl>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* Historique */}
      <section className="bg-ajLight py-16">
        <div className="mx-auto w-[min(1160px,calc(100%-32px))]">
          <SectionHeading eyebrow="Historique" title="Une structure fédératrice" />
          <FadeUp>
            <div className="max-w-4xl space-y-5 text-lg leading-8 text-slate-700">
              <p>
                <HighlightText text="AJRRADY est née de la volonté des fils, filles, résidents et amis de Youkounkoun de contribuer activement au développement socio-économique, culturel et éducatif de leur localité." />
              </p>
              <p>
                Face aux défis liés à l'éducation, aux infrastructures communautaires,
                à la promotion culturelle, à l'insertion des jeunes et à la cohésion
                sociale, plusieurs ressortissants se sont regroupés au sein d'une
                structure capable de mobiliser les compétences, les ressources et les
                initiatives au service du développement local.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="py-16">
        <StaggerContainer className="mx-auto grid w-[min(1160px,calc(100%-32px))] gap-8 lg:grid-cols-2">
          <StaggerItem>
            <article className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm transition-[box-shadow,transform] duration-300 hover:-translate-y-1.5 hover:shadow-xl motion-reduce:hover:translate-y-0">
              <SectionHeading eyebrow="Mission" title="Mobiliser pour développer" />
              <p className="text-lg leading-8 text-slate-700">
                <HighlightText text="AJRRADY est une organisation communautaire engagée dans le développement durable de Youkounkoun à travers l'éducation, la culture, le sport, la santé, l'environnement, la solidarité et la mobilisation de la diaspora." />
              </p>
            </article>
          </StaggerItem>
          <StaggerItem>
            <article className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm transition-[box-shadow,transform] duration-300 hover:-translate-y-1.5 hover:shadow-xl motion-reduce:hover:translate-y-0">
              <SectionHeading eyebrow="Vision" title="Une communauté forte" />
              <p className="text-lg leading-8 text-slate-700">
                <HighlightText text="Faire de Youkounkoun une communauté unie, dynamique, solidaire et prospère, portée par une jeunesse responsable et engagée dans le développement durable." />
              </p>
            </article>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* Valeurs */}
      <section className="bg-ajLight py-16">
        <div className="mx-auto w-[min(1160px,calc(100%-32px))]">
          <SectionHeading eyebrow="Valeurs" title="Les valeurs de l'association" />
          <StaggerContainer className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((value) => (
              <StaggerItem key={value}>
                <div className="flex min-h-[90px] items-center justify-center rounded-lg border border-slate-200 bg-white p-4 text-center font-extrabold text-ajPurple shadow-sm transition-[box-shadow,transform] duration-300 hover:-translate-y-1.5 hover:shadow-xl motion-reduce:hover:translate-y-0">
                  {value}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}

function InfoTerm({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-black uppercase text-ajPurple">{label}</dt>
      <dd className="mt-1 leading-7 text-slate-700">
        <HighlightText text={value} />
      </dd>
    </div>
  );
}
