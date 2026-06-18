import { IconBadge } from "@/components/IconBadge";
import type { CardItem } from "@/types/site";

type InfoCardProps = {
  item: CardItem;
};

export function InfoCard({ item }: InfoCardProps) {
  return (
    <article className="h-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      {item.icon ? <IconBadge name={item.icon} className="mb-4" /> : null}
      <h2 className="text-xl font-black leading-snug text-ajPurple">{item.title}</h2>
      {item.description ? (
        <p className="mt-3 leading-7 text-slate-700">{item.description}</p>
      ) : null}
      {item.items ? (
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-700">
          {item.items.map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
