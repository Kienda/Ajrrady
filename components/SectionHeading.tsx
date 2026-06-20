type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-ajGreen">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-[2rem] font-bold leading-[1.15] tracking-tight text-ajPurple md:text-[2.6rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-lg leading-[1.8] text-slate-600">{description}</p>
      ) : null}
    </div>
  );
}
