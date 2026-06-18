import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { siteInfo } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  path: "/contact",
});

const fields = [
  { label: "Nom", name: "Nom" },
  { label: "Email", name: "Email", type: "email" },
  { label: "Sujet", name: "Sujet" },
  { label: "Message", name: "Message", multiline: true },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contacter AJRRADY"
        description="Coordonnées officielles et formulaire de contact."
      />
      <section className="py-16">
        <div className="mx-auto grid w-[min(1160px,calc(100%-32px))] gap-9 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading eyebrow="Coordonnées" title="AJRRADY" />
            <dl className="space-y-5 text-lg leading-8">
              <ContactTerm label="Téléphone">
                <a className="text-ajPurple hover:text-ajGreen" href="tel:+224628702734">
                  {siteInfo.phone}
                </a>
              </ContactTerm>
              <ContactTerm label="Email">
                <a
                  className="text-ajPurple hover:text-ajGreen"
                  href={`mailto:${siteInfo.email}`}
                >
                  {siteInfo.email}
                </a>
              </ContactTerm>
              <ContactTerm label="Site web">
                <a className="text-ajPurple hover:text-ajGreen" href={siteInfo.url}>
                  www.ajrrady.org
                </a>
              </ContactTerm>
              <ContactTerm label="Localisation">{siteInfo.location}</ContactTerm>
            </dl>
          </div>
          <ContactForm
            fields={fields}
            submitLabel="Envoyer le message"
            subject="Message depuis le site AJRRADY"
          />
        </div>
      </section>
    </>
  );
}

function ContactTerm({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-sm font-black uppercase text-ajPurple">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
