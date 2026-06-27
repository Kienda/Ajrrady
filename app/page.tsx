"use client";

import { ButtonLink } from "@/components/ButtonLink";
import { HighlightText } from "@/components/HighlightText";
import { HeroContainer, HeroItem, StaggerContainer } from "@/components/motion";
import { ProgramCard } from "@/components/ProgramCard";
import { homeDomains } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ajPurple">
        <video
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover brightness-[0.86] contrast-[1.12] saturate-[1.18]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/Landingpage.jpg"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/76 via-black/42 to-black/12" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/45 via-transparent to-black/20" />
        <div className="absolute inset-0 -z-10 bg-ajPurple/15" />

        <div className="mx-auto flex min-h-[560px] w-[min(1160px,calc(100%-32px))] items-center py-16 md:py-20">
          <HeroContainer className="max-w-[660px]">
            <HeroItem>
              <h1
                className="max-w-[580px] text-[2.75rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-[3.5rem] lg:text-[4.25rem]"
                style={{ textShadow: "0 4px 24px rgba(0,0,0,0.45)" }}
              >
                Unis pour servir,
                <br />
                engagés pour développer
                <span className="block">
                  <HighlightText text="Youkounkoun" tone="hero" />
                </span>
              </h1>
            </HeroItem>
            <HeroItem>
              <p
                className="mt-6 max-w-[520px] rounded-2xl border border-white/15 bg-black/35 px-5 py-4 text-lg font-semibold leading-[1.8] text-white shadow-lg backdrop-blur-[2px]"
                style={{ color: "#fff", textShadow: "0 2px 14px rgba(0,0,0,0.75)" }}
              >
                <HighlightText
                  text="AJRRADY est une organisation communautaire engagée dans la promotion du développement durable à travers l'éducation, la culture, le sport, la santé, l'environnement, la solidarité et la mobilisation de la diaspora."
                  tone="hero"
                />
              </p>
            </HeroItem>
            <HeroItem>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/nos-actions">Découvrir Nos Actions</ButtonLink>
                <ButtonLink href="/galerie" variant="light">
                  Voir la Galerie
                </ButtonLink>
                <ButtonLink href="/adhesion" variant="light">
                  Adhérer
                </ButtonLink>
              </div>
            </HeroItem>
          </HeroContainer>
        </div>
      </section>

      <section aria-labelledby="domaines-title" className="bg-white py-16 sm:py-20">
        <div className="mx-auto w-[min(1160px,calc(100%-32px))]">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-ajGreen">
              Actions
            </p>
            <h2
              id="domaines-title"
              className="text-[2.25rem] font-extrabold leading-[1.1] tracking-tight text-ajPurple md:text-[3.25rem]"
            >
              Nos secteurs d'intervention
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-[1.8] text-slate-600">
              <HighlightText text="Des actions concrètes pour un impact durable à Youkounkoun." />
            </p>
          </div>

          <StaggerContainer className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {homeDomains.map((domain) => (
              <ProgramCard key={domain.title} item={domain} />
            ))}
          </StaggerContainer>

          <div className="mt-10 flex justify-center">
            <ButtonLink href="/nos-actions">Découvrir nos secteurs</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
