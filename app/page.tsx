"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ButtonLink";
import { IconBadge } from "@/components/IconBadge";
import { HeroContainer, HeroItem, StaggerContainer } from "@/components/motion";
import { homeDomains } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

const domainCardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease } },
};

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
                <span className="block text-[#22C55E]">Youkounkoun</span>
              </h1>
            </HeroItem>
            <HeroItem>
              <p
                className="mt-6 max-w-[520px] rounded-2xl border border-white/15 bg-black/35 px-5 py-4 text-lg font-semibold leading-[1.8] text-white shadow-lg backdrop-blur-[2px]"
                style={{ color: "#fff", textShadow: "0 2px 14px rgba(0,0,0,0.75)" }}
              >
                AJRRADY est une organisation communautaire engagée dans la promotion
                du développement durable à travers l'éducation, la culture, le sport,
                la santé, l'environnement, la solidarité et la mobilisation de la
                diaspora.
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

      <section aria-labelledby="domaines-title" className="bg-white py-8">
        <h2 id="domaines-title" className="sr-only">
          Domaines d'intervention
        </h2>
        <StaggerContainer className="mx-auto grid w-[min(1160px,calc(100%-32px))] divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 md:grid-cols-3 xl:grid-cols-7">
          {homeDomains.map((domain, index) => (
            <motion.article
              key={domain.title}
              variants={domainCardVariants}
              className="domain-card min-h-[185px] px-5 py-7 text-center"
            >
              {domain.image ? (
                <div className="mx-auto mb-4 h-16 w-16 overflow-hidden rounded-3xl bg-slate-100">
                  <Image
                    src={domain.image}
                    alt={domain.title}
                    width={64}
                    height={64}
                    className="h-full w-full object-contain p-2"
                  />
                </div>
              ) : domain.icon ? (
                <IconBadge
                  name={domain.icon}
                  className={`mx-auto mb-3 ${index % 2 === 1 ? "text-ajPurple" : ""}`}
                />
              ) : null}
              <h3 className="text-[13px] font-bold text-ajPurple">{domain.title}</h3>
              <p className="mx-auto mt-2 max-w-[150px] text-[13px] leading-[1.6] text-slate-500">
                {domain.description}
              </p>
            </motion.article>
          ))}
        </StaggerContainer>
      </section>
    </>
  );
}
