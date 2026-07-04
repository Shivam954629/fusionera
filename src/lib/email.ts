const SENDER_EMAIL = "sales.info@fusiontheera.com";
const SENDER_NAME = "Fusion The Era Events";
const LOGO_URL = "https://res.cloudinary.com/dofwvxjzg/image/upload/v1783154301/fusion-the-era-logo.jpg";

function parseRecipients(to: string | string[]): { email: string }[] {
  const list = Array.isArray(to) ? to : to.split(",");
  return list.map((email) => ({ email: email.trim() })).filter((r) => r.email);
}

export function emailHeader(title: string, subtitle?: string): string {
  return `
    <div style="background:#ffffff;padding:32px 32px 24px;text-align:center;border-bottom:1px solid #f0f0f0;">
      <img src="${LOGO_URL}" alt="Fusion The Era" width="200" style="max-width:70%;height:auto;margin-bottom:20px;" />
      <h1 style="color:#1a1560;margin:0;font-size:20px;">${title}</h1>
      ${subtitle ? `<p style="color:#6b7280;margin:6px 0 0;font-size:13px;">${subtitle}</p>` : ""}
    </div>
  `;
}

export function emailFooter(): string {
  return `
    <div style="background:#f9fafb;padding:18px 32px;text-align:center;border-top:1px solid #eef0f5;">
      <p style="color:#9ca3af;font-size:12px;margin:0;">Fusion The Era · fusiontheera.com</p>
    </div>
  `;
}

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string | string[];
  subject: string;
  html: string;
}) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error("BREVO_API_KEY is not configured.");

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      to: parseRecipients(to),
      subject,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Brevo send failed (${res.status}): ${body}`);
  }

  return res.json();
}
