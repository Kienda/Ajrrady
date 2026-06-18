import {
  BookOpen,
  Globe2,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  Landmark,
  Leaf,
  Theater,
  Trophy,
} from "lucide-react";
import type { IconName } from "@/types/site";

const icons = {
  education: GraduationCap,
  culture: Theater,
  sport: Trophy,
  environment: Leaf,
  solidarity: HeartHandshake,
  diaspora: Globe2,
  community: Landmark,
} satisfies Record<IconName, typeof BookOpen>;

type IconBadgeProps = {
  name: IconName;
  className?: string;
};

export function IconBadge({ name, className = "" }: IconBadgeProps) {
  const Icon = icons[name] ?? HandHeart;

  return (
    <span
      className={`inline-flex h-12 w-12 items-center justify-center text-ajGreen ${className}`}
    >
      <Icon aria-hidden="true" className="h-10 w-10 stroke-[1.8]" />
    </span>
  );
}
