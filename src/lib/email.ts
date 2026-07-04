const SENDER_EMAIL = process.env.SMTP_USER || "sales.info@fusiontheera.com";
const SENDER_NAME = "Fusion The Era Events";

function parseRecipients(to: string | string[]): { email: string }[] {
  const list = Array.isArray(to) ? to : to.split(",");
  return list.map((email) => ({ email: email.trim() })).filter((r) => r.email);
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
