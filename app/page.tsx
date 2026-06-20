import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { IconBadge } from "@/components/IconBadge";
import { homeDomains } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <section className="overflow-hidden bg-[#f1e5f7]">
        <div className="mx-auto grid min-h-[460px] w-[min(1160px,calc(100%-32px))] items-center gap-6 md:grid-cols-[0.95fr_1.05fr]">
          <div className="py-14 md:py-20">
            <h1 className="max-w-[580px] text-[2.75rem] font-extrabold leading-[1.1] tracking-tight text-ajPurple sm:text-[3.5rem] lg:text-[4.25rem]">
              Unis pour servir,
              <br />
              engagés pour développer
              <span className="block text-ajGreen">Youkounkoun</span>
            </h1>
            <p className="mt-6 max-w-[480px] text-lg leading-[1.8] text-slate-600">
              AJRRADY est une organisation communautaire engagée dans la promotion
              du développement durable à travers l'éducation, la culture, le sport,
              la santé, l'environnement, la solidarité et la mobilisation de la
              diaspora.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/nos-actions">Découvrir Nos Actions</ButtonLink>
              <ButtonLink href="/adhesion" variant="light">
                Adhérer
              </ButtonLink>
            </div>
          </div>

          <div className="relative min-h-[320px] md:min-h-[460px]" aria-hidden="true">
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
          </div>
        </div>
      </section>

      <section aria-labelledby="domaines-title" className="bg-white py-8">
        <h2 id="domaines-title" className="sr-only">
          Domaines d'intervention
        </h2>
        <div className="mx-auto grid w-[min(1160px,calc(100%-32px))] divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 md:grid-cols-3 xl:grid-cols-7">
          {homeDomains.map((domain, index) => (
            <article
              key={domain.title}
              className="domain-card min-h-[185px] px-5 py-7 text-center"
            >
              {domain.icon ? (
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
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
