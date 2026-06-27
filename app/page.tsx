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
      <section className="overflow-hidden bg-[#f1e5f7]">
        <div className="mx-auto grid min-h-[460px] w-[min(1160px,calc(100%-32px))] items-center gap-6 md:grid-cols-[0.95fr_1.05fr]">

          {/* Hero text — stagger on mount */}
          <HeroContainer className="py-14 md:py-20">
            <HeroItem>
              <h1 className="max-w-[580px] text-[2.75rem] font-extrabold leading-[1.1] tracking-tight text-ajPurple sm:text-[3.5rem] lg:text-[4.25rem]">
                Unis pour servir,
                <br />
                engagés pour développer
                <span className="block text-ajGreen">Youkounkoun</span>
              </h1>
            </HeroItem>
            <HeroItem>
              <p className="mt-6 max-w-[480px] text-lg leading-[1.8] text-slate-600">
                AJRRADY est une organisation communautaire engagée dans la promotion
                du développement durable à travers l'éducation, la culture, le sport,
                la santé, l'environnement, la solidarité et la mobilisation de la
                diaspora.
              </p>
            </HeroItem>
            <HeroItem>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/nos-actions">Découvrir Nos Actions</ButtonLink>
                <ButtonLink href="/adhesion" variant="light">
                  Adhérer
                </ButtonLink>
              </div>
            </HeroItem>
          </HeroContainer>

          {/* Hero image — fade in from right */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.25 }}
            className="relative min-h-[320px] md:min-h-[460px]"
            aria-hidden="true"
          >
            <div className="absolute inset-x-6 bottom-6 top-14 rounded-full bg-white/55" />
            <Image
              src="/LOGO.png"
              alt=""
              width={430}
              height={430}
              className="absolute bottom-4 left-0 w-[58%] max-w-[390px] opacity-10"
              priority
            />
            <Image
              src="/SymboleAJRRADY.png"
              alt=""
              width={360}
              height={540}
              className="absolute bottom-0 right-[8%] max-h-[460px] w-auto object-contain md:right-[4%]"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Domain cards — stagger on scroll */}
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
              <h3 className="text-[13px] font-bold text-ajPurple">
                {domain.title}
              </h3>
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
