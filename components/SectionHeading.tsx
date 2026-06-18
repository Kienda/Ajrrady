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
    <div className={`mb-9 max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p className="mb-2 text-xs font-black uppercase text-ajGreen">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-black leading-tight text-ajPurple md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg leading-8 text-slate-700">{description}</p>
      ) : null}
    </div>
  );
}
