import type { Metadata } from "next";
import { Image as ImageIcon } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Galerie",
  path: "/galerie",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Galerie"
        title="Photos officielles"
        description="La galerie publiera les photos validées par AJRRADY."
      />
      <section className="py-16">
        <div className="mx-auto w-[min(900px,calc(100%-32px))] rounded-lg border border-dashed border-ajPurple/35 bg-ajLight p-10 text-center">
          <ImageIcon aria-hidden="true" className="mx-auto h-12 w-12 text-ajGreen" />
          <h2 className="mt-4 text-2xl font-black text-ajPurple">
            Les photos officielles seront bientôt disponibles.
          </h2>
        </div>
      </section>
    </>
  );
}
