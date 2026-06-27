import type { Metadata } from "next";
import { HighlightText } from "@/components/HighlightText";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { festivalParticipants } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "FEC-SY",
  path: "/fec-sy",
});

export default function FestivalPage() {
  return (
    <>
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
          <aside className="rounded-lg bg-ajPurple p-7 text-white">
            <h2 className="text-2xl font-black">Édition 2026</h2>
            <p className="mt-4 text-lg leading-8">
              Deuxième édition prévue du 10 juillet au 11 août 2026.
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
                className="rounded-lg border border-slate-200 bg-white p-5 text-center font-extrabold text-ajPurple shadow-sm"
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
