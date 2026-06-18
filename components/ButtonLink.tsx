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
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-5 py-3 text-sm font-extrabold uppercase tracking-normal transition ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      <ArrowRight aria-hidden="true" className="h-4 w-4" />
    </Link>
  );
}
