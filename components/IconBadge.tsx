import {
  BookOpen,
  Globe2,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  HeartPulse,
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
  health: HeartPulse,
} satisfies Record<IconName, typeof BookOpen>;

type IconBadgeProps = {
  name: IconName;
  className?: string;
};

export function IconBadge({ name, className = "" }: IconBadgeProps) {
  const Icon = icons[name] ?? HandHeart;

  return (
    <span
      className={`inline-flex h-14 w-14 items-center justify-center text-ajGreen ${className}`}
    >
      <Icon aria-hidden="true" className="h-9 w-9 stroke-[1.5]" />
    </span>
  );
}
