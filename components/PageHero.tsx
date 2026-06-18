import Image from "next/image";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="overflow-hidden bg-[#f1e5f7]">
      <div className="mx-auto grid min-h-[260px] w-[min(1160px,calc(100%-32px))] items-center gap-8 py-10 md:grid-cols-[1fr_220px] md:py-0">
        <div>
          <p className="mb-2 text-xs font-black uppercase text-ajGreen">{eyebrow}</p>
          <h1 className="max-w-4xl text-4xl font-black uppercase leading-tight text-ajPurple md:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">{description}</p>
        </div>
        <Image
          src="/SymboleAJRRADY.png"
          alt=""
          width={190}
          height={285}
          className="mx-auto max-h-[210px] w-auto object-contain md:ml-auto md:mr-0"
        />
      </div>
    </section>
  );
}
