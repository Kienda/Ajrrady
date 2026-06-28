import type { Metadata } from "next";
import { HighlightText } from "@/components/HighlightText";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { festivalParticipants } from "@/data/site";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, sportsEventSchema, webPageSchema } from "@/lib/schemas";

export const metadata: Metadata = createMetadata({
  title: "FEC-SY 2026 – Festival de Youkounkoun",
  description:
    "FEC-SY 2026 : festival estival et culturel de Youkounkoun du 11 juillet au 9 août. Tournoi de football et journée culturelle, Koundara.",
  keywords: [
    "FEC-SY",
    "FEC-SY 2026",
    "festival",
    "Youkounkoun",
    "Koundara",
    "Guinée",
    "football",
    "culture",
    "AJRRADY",
    "Stade Lonny Allotène",
    "tournoi",
  ],
  path: "/fec-sy",
});

export default function FestivalPage() {
  return (
    <>
      <JsonLd data={sportsEventSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: "Accueil", path: "/" }, { name: "FEC-SY 2026", path: "/fec-sy" }])} />
      <JsonLd data={webPageSchema({ path: "/fec-sy", name: "FEC-SY 2026 – Festival de Youkounkoun | AJRRADY", description: "FEC-SY 2026 : festival estival et culturel de Youkounkoun du 11 juillet au 9 août. Tournoi de football et journée culturelle, Koundara." })} />
      <PageHero
        eyebrow="FEC-SY"
        title="Festival Culturel et Sportif de Youkounkoun"
        description="Le festival valorise le patrimoine culturel, sportif et humain de Youkounkoun."
      />
      <section className="py-16">
        <div className="mx-auto grid w-[min(1160px,calc(100%-32px))] gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <SectionHeading eyebrow="Festival" title="FEC-SY" />
            <p className="text-lg leading-8 text-slate-700">
              <HighlightText text="Le FEC-SY est l’événement phare de l’AJRRADY. Il valorise le patrimoine culturel, sportif et humain de Youkounkoun, renforce le vivre-ensemble et mobilise les communautés autour du développement local." />
            </p>
          </div>
          <aside className="rounded-lg bg-ajPurple p-7 text-white shadow-card transition-[box-shadow,transform] duration-300 hover:-translate-y-1.5 hover:shadow-xl motion-reduce:hover:translate-y-0">
            <h2 className="text-2xl font-black">Édition 2026</h2>
            <p className="mt-4 text-lg leading-8">
              Deuxième édition prévue du 11 juillet au 9 août 2026.
            </p>
          </aside>
        </div>
      </section>

      <section className="bg-ajLight py-16">
        <div className="mx-auto w-[min(1160px,calc(100%-32px))]">
          <SectionHeading
            eyebrow="Participation attendue"
            title="Une édition à dimension sous-régionale"
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {festivalParticipants.map((participant) => (
              <li
                key={participant}
                className="rounded-lg border border-slate-200 bg-white p-5 text-center font-extrabold text-ajPurple shadow-sm transition-[box-shadow,transform] duration-300 hover:-translate-y-1.5 hover:shadow-xl motion-reduce:hover:translate-y-0"
              >
                {participant}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
