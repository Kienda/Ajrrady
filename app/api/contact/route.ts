import { NextResponse } from "next/server";
import { Resend } from "resend";

// ─── Email config ──────────────────────────────────────────────────────────────
// Email 1 goes to the Cloudflare alias which forwards to ajrrady224@gmail.com.
// Email 2 goes to the visitor's email address from the form (never hardcoded).
// Switch FROM to "AJRRADY <contact@ajrrady.org>" after verifying ajrrady.org
// in the Resend dashboard. While using onboarding@resend.dev, Resend restricts
// outbound to your account's own verified address — Email 2 will only succeed
// once the domain is verified.
const NOTIFY_TO = "contact@ajrrady.org";
const FROM = "AJRRADY <onboarding@resend.dev>";

// ─── In-memory rate limiter ────────────────────────────────────────────────────
// Resets per cold-start on Vercel, but still stops casual spam within a session.
const rl = new Map<string, { n: number; until: number }>();
const RL_MAX = 5;
const RL_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

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

// ─── Email templates ──────────────────────────────────────────────────────────

type NotifParams = {
  nom: string;
  email: string;
  telephone: string;
  sujet: string;
  message: string;
};

function notificationHtml({ nom, email, telephone, sujet, message }: NotifParams): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Nouveau message – AJRRADY</title>
</head>
<body style="margin:0;padding:0;background:#F4F4F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#F4F4F5;padding:40px 20px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.09)">

        <!-- Header -->
        <tr>
          <td style="background:#6A0DAD;padding:28px 48px">
            <p style="margin:0;color:#FFFFFF;font-size:24px;font-weight:900;letter-spacing:1.5px">AJRRADY</p>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.72);font-size:13px">Nouveau message reçu depuis le site</p>
          </td>
        </tr>

        <!-- Green accent -->
        <tr><td style="background:#0FA958;height:4px;padding:0;font-size:0;line-height:0">&nbsp;</td></tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 48px 32px">
            <h2 style="margin:0 0 28px;color:#111827;font-size:20px;font-weight:800">Nouveau message depuis le site AJRRADY</h2>

            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;font-size:15px">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #E5E7EB;font-weight:700;color:#6A0DAD;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;width:140px;vertical-align:top">Nom complet</td>
                <td style="padding:12px 0 12px 16px;border-bottom:1px solid #E5E7EB;color:#111827">${h(nom)}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #E5E7EB;font-weight:700;color:#6A0DAD;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;vertical-align:top">Email</td>
                <td style="padding:12px 0 12px 16px;border-bottom:1px solid #E5E7EB;color:#111827">
                  <a href="mailto:${h(email)}" style="color:#6A0DAD;text-decoration:none">${h(email)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #E5E7EB;font-weight:700;color:#6A0DAD;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;vertical-align:top">Téléphone</td>
                <td style="padding:12px 0 12px 16px;border-bottom:1px solid #E5E7EB;color:#111827">${telephone ? h(telephone) : "—"}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;font-weight:700;color:#6A0DAD;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;vertical-align:top">Sujet</td>
                <td style="padding:12px 0 12px 16px;color:#111827">${h(sujet)}</td>
              </tr>
            </table>

            <p style="margin:28px 0 10px;color:#6A0DAD;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em">Message</p>
            <div style="background:#F8F8FC;border-left:4px solid #6A0DAD;padding:20px;border-radius:0 8px 8px 0;white-space:pre-wrap;color:#1F2937;font-size:15px;line-height:1.7">${h(message)}</div>

            <div style="margin-top:24px;background:#F0FDF4;border:1px solid #86EFAC;border-radius:8px;padding:14px 18px">
              <p style="margin:0;color:#166534;font-size:13px">
                <strong>Répondre à :</strong>&nbsp;
                <a href="mailto:${h(email)}" style="color:#166534;text-decoration:underline">${h(email)}</a>
              </p>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#F9FAFB;padding:18px 48px;border-top:1px solid #E5E7EB;text-align:center">
            <p style="margin:0;color:#9CA3AF;font-size:12px">
              © 2026 AJRRADY · Message reçu depuis
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

type ConfirmParams = { nom: string; sujet: string };

function confirmationHtml({ nom, sujet }: ConfirmParams): string {
  const date = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Nous avons bien reçu votre message – AJRRADY</title>
</head>
<body style="margin:0;padding:0;background:#F4F4F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#F4F4F5;padding:40px 20px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.09)">

        <!-- Purple header -->
        <tr>
          <td style="background:linear-gradient(135deg,#6A0DAD 0%,#9333EA 100%);padding:48px 48px 40px;text-align:center">
            <div style="display:inline-block;background:rgba(255,255,255,0.18);border-radius:12px;padding:10px 24px;margin-bottom:20px">
              <span style="color:#FFFFFF;font-size:30px;font-weight:900;letter-spacing:2px;display:block">AJRRADY</span>
            </div>
            <p style="margin:0;color:rgba(255,255,255,0.80);font-size:13px;line-height:1.6">
              Association des Jeunes Ressortissants, Résidents et Amis<br>
              pour le Développement de Youkounkoun
            </p>
          </td>
        </tr>

        <!-- Green accent bar -->
        <tr><td style="background:#0FA958;height:4px;padding:0;font-size:0;line-height:0">&nbsp;</td></tr>

        <!-- Main content -->
        <tr>
          <td style="padding:48px 48px 36px">
            <p style="margin:0 0 6px;color:#6A0DAD;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Confirmation de réception</p>
            <h1 style="margin:0 0 28px;color:#111827;font-size:26px;font-weight:800;line-height:1.3">
              Nous avons bien reçu<br>votre message
            </h1>

            <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.75">
              Bonjour <strong style="color:#111827">${h(nom)}</strong>,
            </p>

            <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.75">
              Nous vous remercions d'avoir contacté AJRRADY.
            </p>

            <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.75">
              Votre demande a bien été reçue avec succès.
            </p>

            <p style="margin:0 0 36px;color:#374151;font-size:16px;line-height:1.75">
              Notre équipe l'examinera et vous répondra dans les meilleurs délais.
            </p>

            <!-- Summary block -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
              style="background:#F8F8FC;border-left:4px solid #6A0DAD;border-radius:0 8px 8px 0;margin-bottom:36px">
              <tr>
                <td style="padding:20px 24px">
                  <p style="margin:0 0 14px;color:#6A0DAD;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">
                    Résumé de votre demande
                  </p>
                  <table cellpadding="0" cellspacing="0" role="presentation" style="font-size:14px;width:100%">
                    <tr>
                      <td style="padding:5px 0;color:#6B7280;font-weight:700;width:70px;vertical-align:top">Nom</td>
                      <td style="padding:5px 0 5px 8px;color:#111827">${h(nom)}</td>
                    </tr>
                    <tr>
                      <td style="padding:5px 0;color:#6B7280;font-weight:700;vertical-align:top">Sujet</td>
                      <td style="padding:5px 0 5px 8px;color:#111827">${h(sujet)}</td>
                    </tr>
                    <tr>
                      <td style="padding:5px 0;color:#6B7280;font-weight:700;vertical-align:top">Date</td>
                      <td style="padding:5px 0 5px 8px;color:#111827">${date}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 4px;color:#374151;font-size:16px;line-height:1.75">Merci de votre confiance.</p>
            <p style="margin:0 0 28px;color:#374151;font-size:16px;line-height:1.75">&nbsp;</p>

            <p style="margin:0 0 4px;color:#374151;font-size:15px;line-height:1.6">
              Association des Jeunes Ressortissants,<br>
              Résidents et Amis pour le Développement de Youkounkoun
            </p>
            <p style="margin:12px 0 0">
              <a href="https://www.ajrrady.org" style="color:#6A0DAD;font-size:15px;font-weight:600;text-decoration:none">
                www.ajrrady.org
              </a>
            </p>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:0 48px"><hr style="border:none;border-top:1px solid #E5E7EB;margin:0"></td></tr>

        <!-- Contact info -->
        <tr>
          <td style="padding:28px 48px">
            <table cellpadding="0" cellspacing="0" role="presentation" style="font-size:14px;color:#374151">
              <tr>
                <td style="padding:5px 0">
                  <span style="color:#6A0DAD;font-weight:700;margin-right:8px">Téléphone</span>
                  +224 628 70 27 34
                </td>
              </tr>
              <tr>
                <td style="padding:5px 0">
                  <span style="color:#6A0DAD;font-weight:700;margin-right:8px">Email</span>
                  <a href="mailto:contact@ajrrady.org" style="color:#6A0DAD;text-decoration:none">contact@ajrrady.org</a>
                </td>
              </tr>
              <tr>
                <td style="padding:5px 0">
                  <span style="color:#6A0DAD;font-weight:700;margin-right:8px">Site web</span>
                  <a href="https://www.ajrrady.org" style="color:#6A0DAD;text-decoration:none">www.ajrrady.org</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer bar -->
        <tr>
          <td style="background:#F9FAFB;padding:20px 48px;border-top:1px solid #E5E7EB;text-align:center">
            <p style="margin:0;color:#9CA3AF;font-size:12px;line-height:1.6">
              &copy; 2026 AJRRADY &middot; Tous droits réservés.<br>
              <span style="font-size:11px">Association des Jeunes Ressortissants, Résidents et Amis pour le Développement de Youkounkoun</span>
            </p>
          </td>
        </tr>

      </table>

      <!-- Below-card note -->
      <p style="margin:16px auto 0;max-width:500px;color:#9CA3AF;font-size:11px;text-align:center;line-height:1.6">
        Cet email a été envoyé automatiquement suite à votre message sur
        <a href="https://www.ajrrady.org" style="color:#9CA3AF">ajrrady.org</a>.
        Merci de ne pas y répondre directement.
      </p>

    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  // 1. Check API key is configured
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Service de messagerie non configuré." },
      { status: 503 }
    );
  }

  // 2. Rate limiting by IP
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

  // 3. Parse body
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // 4. Honeypot — bots fill hidden fields, humans don't
  if (body._honey) {
    return NextResponse.json({ success: true }); // silent discard
  }

  // 5. Extract and sanitize fields
  const nom       = String(body.nom       ?? "").trim();
  const email     = String(body.email     ?? "").trim().toLowerCase();
  const telephone = String(body.telephone ?? "").trim();
  const sujet     = String(body.sujet     ?? "").trim();
  const message   = String(body.message   ?? "").trim();

  // 6. Validate required fields
  if (!nom || !email || !sujet || !message) {
    return NextResponse.json(
      { error: "Veuillez remplir tous les champs obligatoires." },
      { status: 400 }
    );
  }

  // 7. Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Adresse email invalide." },
      { status: 400 }
    );
  }

  // 8. Enforce field length limits to prevent abuse
  if (nom.length > 120 || sujet.length > 200 || message.length > 5000) {
    return NextResponse.json(
      { error: "Un ou plusieurs champs dépassent la taille maximale autorisée." },
      { status: 400 }
    );
  }

  // 9. Send emails — each in its own try/catch so one failure can't suppress the other
  const resend = new Resend(process.env.RESEND_API_KEY);

  // EMAIL 1 — Organization notification (critical)
  try {
    await resend.emails.send({
      from: FROM,
      to: NOTIFY_TO,
      replyTo: email,
      subject: "Nouveau message depuis le site AJRRADY",
      html: notificationHtml({ nom, email, telephone, sujet, message }),
    });
  } catch (err) {
    console.error("[contact] Organization email failed:", err);
    return NextResponse.json(
      { error: "Impossible d'envoyer le message. Veuillez réessayer plus tard." },
      { status: 500 }
    );
  }

  // EMAIL 2 — Visitor confirmation (non-critical: log failure, still return success)
  // to: visitor's email from the form — never a hardcoded address
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Nous avons bien reçu votre message",
      html: confirmationHtml({ nom, sujet }),
    });
  } catch (err) {
    console.error("[contact] Confirmation email failed:", err);
  }

  return NextResponse.json({ success: true });
}
