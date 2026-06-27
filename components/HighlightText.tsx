type HighlightTone = "default" | "dark" | "hero";

type HighlightTextProps = {
  text: string;
  tone?: HighlightTone;
};

const highlightPattern = /(AJRRADY|Youkounkoun)/gi;

const toneStyles: Record<
  HighlightTone,
  {
    ajrrady: string;
    youkounkoun: string;
  }
> = {
  default: {
    ajrrady: "font-black text-ajPurple",
    youkounkoun: "font-black text-ajGreen",
  },
  dark: {
    ajrrady: "font-black text-white",
    youkounkoun: "font-black text-emerald-200",
  },
  hero: {
    ajrrady: "font-black text-white",
    youkounkoun: "font-black text-[#22C55E]",
  },
};

export function HighlightText({ text, tone = "default" }: HighlightTextProps) {
  const styles = toneStyles[tone];

  return (
    <>
      {text.split(highlightPattern).map((part, index) => {
        if (/^AJRRADY$/i.test(part)) {
          return (
            <strong key={`${part}-${index}`} className={styles.ajrrady}>
              {part}
            </strong>
          );
        }

        if (/^Youkounkoun$/i.test(part)) {
          return (
            <strong key={`${part}-${index}`} className={styles.youkounkoun}>
              {part}
            </strong>
          );
        }

        return part;
      })}
    </>
  );
}
