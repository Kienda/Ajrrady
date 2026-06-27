import { NextResponse } from "next/server";
import { Resend } from "resend";

const NOTIFY_TO = "ajrrady224@gmail.com";
const FROM = "AJRRADY <contact@ajrrady.org>";

// ─── In-memory rate limiter ────────────────────────────────────────────────────
const rl = new Map<string, { n: number; until: number }>();
const RL_MAX = 3;
const RL_WINDOW_MS = 15 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rl.get(ip);
  if (!entry || now > entry.until) {
    rl.set(ip, { n: 1, until: now + RL_WINDOW_MS });
    return false;
  }
  if (entry.n >= RL_MAX) return true;
  entry.n += 1;
  return false;
}

// ─── HTML escape ──────────────────────────────────────────────────────────────
function h(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// ─── Email template ───────────────────────────────────────────────────────────
type AdhesionParams = {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  ville: string;
  pays: string;
  profession: string;
  message: string;
};

function adhesionHtml(p: AdhesionParams): string {
  const date = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #E5E7EB;font-weight:700;color:#6A0DAD;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;width:140px;vertical-align:top">${label}</td>
      <td style="padding:10px 0 10px 16px;border-bottom:1px solid #E5E7EB;color:#111827;font-size:15px">${value || "—"}</td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Nouvelle demande d'adhésion – AJRRADY</title>
</head>
<body style="margin:0;padding:0;background:#F4F4F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#F4F4F5;padding:40px 20px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.09)">

        <tr>
          <td style="background:#6A0DAD;padding:28px 48px">
            <p style="margin:0;color:#FFFFFF;font-size:24px;font-weight:900;letter-spacing:1.5px">AJRRADY</p>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.72);font-size:13px">Nouvelle demande d'adhésion reçue · ${date}</p>
          </td>
        </tr>

        <tr><td style="background:#0FA958;height:4px;padding:0;font-size:0;line-height:0">&nbsp;</td></tr>

        <tr>
          <td style="padding:40px 48px 32px">
            <h2 style="margin:0 0 28px;color:#111827;font-size:20px;font-weight:800">Demande d'adhésion</h2>

            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse">
              ${row("Nom", h(p.nom))}
              ${row("Prénom", h(p.prenom))}
              ${row("Email", `<a href="mailto:${h(p.email)}" style="color:#6A0DAD;text-decoration:none">${h(p.email)}</a>`)}
              ${row("Téléphone", h(p.telephone))}
              ${row("Ville", h(p.ville))}
              ${row("Pays", h(p.pays))}
              ${row("Profession", h(p.profession))}
            </table>

            <p style="margin:28px 0 10px;color:#6A0DAD;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em">Message</p>
            <div style="background:#F8F8FC;border-left:4px solid #6A0DAD;padding:20px;border-radius:0 8px 8px 0;white-space:pre-wrap;color:#1F2937;font-size:15px;line-height:1.7">${h(p.message)}</div>

            <div style="margin-top:24px;background:#F0FDF4;border:1px solid #86EFAC;border-radius:8px;padding:14px 18px">
              <p style="margin:0;color:#166534;font-size:13px">
                <strong>Répondre à :</strong>&nbsp;
                <a href="mailto:${h(p.email)}" style="color:#166534;text-decoration:underline">${h(p.email)}</a>
              </p>
            </div>
          </td>
        </tr>

        <tr>
          <td style="background:#F9FAFB;padding:18px 48px;border-top:1px solid #E5E7EB;text-align:center">
            <p style="margin:0;color:#9CA3AF;font-size:12px">
              © 2026 AJRRADY · Demande reçue depuis
              <a href="https://www.ajrrady.org" style="color:#6A0DAD;text-decoration:none">www.ajrrady.org</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    console.error("[adhesion] RESEND_API_KEY is not configured");
    return NextResponse.json(
      { error: "RESEND_API_KEY is not configured" },
      { status: 503 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Trop de tentatives. Veuillez patienter 15 minutes avant de réessayer." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Honeypot
  if (body._honey) {
    return NextResponse.json({ success: true });
  }

  // Extract — keys must match the `name` attributes in adhesion/page.tsx exactly
  const nom        = String(body.nom        ?? "").trim();
  const prenom     = String(body.prenom     ?? "").trim();
  const email      = String(body.email      ?? "").trim().toLowerCase();
  const telephone  = String(body.telephone  ?? "").trim();
  const ville      = String(body.ville      ?? "").trim();
  const pays       = String(body.pays       ?? "").trim();
  const profession = String(body.profession ?? "").trim();
  const message    = String(body.message    ?? "").trim();

  // Required: nom, prenom, email, ville, pays, profession, message
  // No `sujet` — adhesion forms don't have a subject field
  const missing: string[] = [];
  if (!nom)        missing.push("nom");
  if (!prenom)     missing.push("prenom");
  if (!email)      missing.push("email");
  if (!ville)      missing.push("ville");
  if (!pays)       missing.push("pays");
  if (!profession) missing.push("profession");
  if (!message)    missing.push("message");

  if (missing.length > 0) {
    console.log("[adhesion] Missing fields:", missing);
    return NextResponse.json(
      { error: `Champs manquants : ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Adresse email invalide." },
      { status: 400 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  console.log("Sending adhesion notification to:", NOTIFY_TO);
  console.log("Applicant email:", email);

  const { data, error } = await resend.emails.send({
    from: FROM,
    to: NOTIFY_TO,
    replyTo: email,
    subject: "Nouvelle demande d'adhésion AJRRADY",
    html: adhesionHtml({ nom, prenom, email, telephone, ville, pays, profession, message }),
  });

  console.log("Resend result:", data);
  console.log("Resend error:", error);

  if (error) {
    console.error("[adhesion] Resend failed:", JSON.stringify(error));
    return NextResponse.json(
      { error: "Impossible d'envoyer la demande. Veuillez réessayer plus tard." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
