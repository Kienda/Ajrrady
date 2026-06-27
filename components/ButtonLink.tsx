import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
};

const variants = {
  primary:
    "bg-ajGreen text-white border-ajGreen hover:bg-ajPurple hover:border-ajPurple",
  secondary:
    "bg-white text-ajPurple border-white hover:bg-ajPurple hover:text-white hover:border-ajPurple",
  light:
    "bg-white text-ajPurple border-slate-200 hover:bg-ajGreen hover:text-white hover:border-ajGreen",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border px-6 py-3.5 text-[15px] font-semibold tracking-wide shadow-sm transition-[background-color,border-color,color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg active:scale-[0.99] motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      <ArrowRight aria-hidden="true" className="h-4 w-4" />
    </Link>
  );
}
