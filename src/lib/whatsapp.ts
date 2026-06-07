const API_URL = "https://graph.facebook.com/v19.0";

function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return "91" + digits;
  if (digits.startsWith("0") && digits.length === 11) return "91" + digits.slice(1);
  return digits;
}

export async function uploadImageToWhatsApp(imageBuffer: Buffer): Promise<string> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneNumberId) throw new Error("WhatsApp credentials missing");

  const formData = new FormData();
  formData.append("messaging_product", "whatsapp");
  formData.append("type", "image/png");
  formData.append("file", new Blob([new Uint8Array(imageBuffer)], { type: "image/png" }), "badge.png");

  const res = await fetch(`${API_URL}/${phoneNumberId}/media`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`Media upload failed: ${JSON.stringify(data)}`);
  return data.id;
}

export async function sendWhatsAppBadge(
  phoneNumber: string,
  mediaId: string,
  visitorName: string,
): Promise<void> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME || "visitor_badge";
  if (!token || !phoneNumberId) throw new Error("WhatsApp credentials missing");

  const res = await fetch(`${API_URL}/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: formatPhone(phoneNumber),
      type: "template",
      template: {
        name: templateName,
        language: { code: "en" },
        components: [
          {
            type: "header",
            parameters: [{ type: "image", image: { id: mediaId } }],
          },
          {
            type: "body",
            parameters: [{ type: "text", text: visitorName }],
          },
        ],
      },
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`WhatsApp send failed: ${JSON.stringify(data)}`);
}
