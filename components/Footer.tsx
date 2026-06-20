import Image from "next/image";
import Link from "next/link";
import { footerActions, navItems, siteInfo, socialLinks } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-ajPurple to-[#4b087e] text-white">
      <div className="mx-auto grid w-[min(1160px,calc(100%-32px))] justify-items-center gap-10 py-14 text-center md:grid-cols-2 md:justify-items-stretch md:text-left lg:grid-cols-[1.25fr_0.9fr_1fr_1fr_0.8fr]">
        <div className="flex max-w-md flex-col items-center md:items-start">
          <Image
            src="/LOGO.png"
            alt="Logo AJRRADY"
            width={64}
            height={64}
            className="mb-5 h-16 w-16 object-contain"
          />
          <p className="text-[15px] leading-[1.75] text-white/90">{siteInfo.fullName}</p>
          <p className="mt-3 text-[15px] font-semibold leading-[1.75] text-white">
            {siteInfo.slogan}
          </p>
        </div>

        <FooterColumn title="Liens rapides">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link className="footer-link" href={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Nos actions">
          {footerActions.map((action) => (
            <li key={action}>{action}</li>
          ))}
        </FooterColumn>

        <FooterColumn title="Contact">
          <li>
            <a
              className="footer-link"
              href={`tel:${siteInfo.phone.replaceAll(" ", "")}`}
            >
              {siteInfo.phone}
            </a>
          </li>
          <li>
            <a className="footer-link" href={`mailto:${siteInfo.email}`}>
              {siteInfo.email}
            </a>
          </li>
          <li>
            <a className="footer-link" href={siteInfo.url}>
              www.ajrrady.org
            </a>
          </li>
          <li>{siteInfo.location}</li>
        </FooterColumn>

        <FooterColumn title="Suivez-nous">
          {socialLinks.map((social) => (
            <li key={social.href}>
              <a className="footer-link" href={social.href}>
                {social.label}
              </a>
            </li>
          ))}
        </FooterColumn>
      </div>
      <div className="mx-auto w-[min(1160px,calc(100%-32px))] border-t border-white/20 py-5 text-center text-[13px] text-white/60">
        © 2026 AJRRADY. Tous droits réservés.
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-xs md:max-w-none">
      <h2 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
        {title}
      </h2>
      <ul className="space-y-3 text-[15px] leading-[1.6] text-white/90">{children}</ul>
    </div>
  );
}
