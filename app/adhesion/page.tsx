import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Adhésion",
  path: "/adhesion",
});

const fields = [
  { label: "Nom", name: "Nom" },
  { label: "Prénom", name: "Prénom" },
  { label: "Téléphone", name: "Téléphone", type: "tel" },
  { label: "Email", name: "Email", type: "email" },
  { label: "Ville", name: "Ville" },
  { label: "Pays", name: "Pays" },
  { label: "Profession", name: "Profession" },
  { label: "Message", name: "Message", multiline: true },
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
            subject="Demande d'adhésion AJRRADY"
          />
        </div>
      </section>
    </>
  );
}
