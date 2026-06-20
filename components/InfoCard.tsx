import { IconBadge } from "@/components/IconBadge";
import type { CardItem } from "@/types/site";

type InfoCardProps = {
  item: CardItem;
};

export function InfoCard({ item }: InfoCardProps) {
  return (
    <article className="h-full rounded-xl border border-slate-200 bg-white p-8 shadow-card">
      {item.icon ? <IconBadge name={item.icon} className="mb-5" /> : null}
      <h2 className="text-xl font-bold leading-snug tracking-tight text-ajPurple">
        {item.title}
      </h2>
      {item.description ? (
        <p className="mt-3 text-[15px] leading-[1.75] text-slate-600">
          {item.description}
        </p>
      ) : null}
      {item.items ? (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-[1.75] text-slate-600">
          {item.items.map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
