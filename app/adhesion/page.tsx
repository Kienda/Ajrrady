import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Adhésion – Rejoindre l'association",
  description:
    "Rejoignez l'AJRRADY et contribuez au développement de Youkounkoun. Formulaire d'adhésion en ligne pour cette association guinéenne.",
  keywords: [
    "AJRRADY",
    "adhésion",
    "membre",
    "rejoindre",
    "Youkounkoun",
    "Koundara",
    "Guinée",
    "association guinéenne",
  ],
  path: "/adhesion",
});

// Field `name` attributes must match the keys validated in /api/adhesion exactly.
const fields = [
  { label: "Nom",        name: "nom" },
  { label: "Prénom",     name: "prenom" },
  { label: "Téléphone",  name: "telephone", type: "tel", required: false },
  { label: "Email",      name: "email",     type: "email" },
  { label: "Ville",      name: "ville" },
  { label: "Pays",       name: "pays" },
  { label: "Profession", name: "profession" },
  { label: "Message",    name: "message",   multiline: true },
];

export default function AdhesionPage() {
  return (
    <>
      <PageHero
        eyebrow="Adhésion"
        title="Rejoindre AJRRADY"
        description="Un espace simple pour adresser une demande d'adhésion à l'association."
      />
      <section className="bg-ajLight py-16">
        <div className="mx-auto grid w-[min(1160px,calc(100%-32px))] gap-9 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="Adhésion"
              title="Envoyer une demande"
              description="Les ressortissants, résidents et amis de Youkounkoun peuvent manifester leur intérêt à rejoindre la dynamique communautaire."
            />
          </div>
          <ContactForm
            fields={fields}
            submitLabel="Envoyer la demande"
            action="/api/adhesion"
            successMessage="Votre demande d'adhésion a été envoyée avec succès."
          />
        </div>
      </section>
    </>
  );
}
