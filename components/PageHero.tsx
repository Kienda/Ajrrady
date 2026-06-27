import Image from "next/image";
import { HighlightText } from "@/components/HighlightText";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="overflow-hidden bg-[#f1e5f7]">
      <div className="mx-auto grid min-h-[300px] w-[min(1160px,calc(100%-32px))] items-center gap-8 py-14 md:grid-cols-[1fr_200px] md:py-16">
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-ajGreen">
            {eyebrow}
          </p>
          <h1 className="max-w-4xl text-[2.75rem] font-extrabold leading-[1.1] tracking-tight text-ajPurple md:text-[4rem] lg:text-[5rem]">
            <HighlightText text={title} />
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-[1.8] text-slate-600">
            <HighlightText text={description} />
          </p>
        </div>

        <div>
          <Image
            src="/SymboleAJRRADY.png"
            alt=""
            width={190}
            height={285}
            className="mx-auto max-h-[220px] w-auto object-contain md:ml-auto md:mr-0"
          />
        </div>
      </div>
    </section>
  );
}
