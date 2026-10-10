import { Resend } from "resend";
import type { InquiryInput } from "@/lib/validation/inquiry";

export type EmailSendResult =
  | { ok: true; id?: string }
  | { ok: false; reason: "not_configured" | "provider_error"; message: string };

export async function sendInquiryEmail(
  data: InquiryInput,
  attachment?: { filename: string; content: Buffer } | null,
): Promise<EmailSendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BUSINESS_EMAIL ?? process.env.NEXT_PUBLIC_BUSINESS_EMAIL;
  const from = process.env.EMAIL_FROM ?? "HaseenTech Inquiries <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return {
      ok: false,
      reason: "not_configured",
      message:
        "Email is not configured. Set RESEND_API_KEY, BUSINESS_EMAIL, and EMAIL_FROM in your environment.",
    };
  }

  const resend = new Resend(apiKey);

  const html = `
    <h2>New project inquiry — HaseenTech</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Country:</strong> ${escapeHtml(data.country)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
    ${data.businessName ? `<p><strong>Business:</strong> ${escapeHtml(data.businessName)}</p>` : ""}
    <p><strong>Service:</strong> ${escapeHtml(data.service)}</p>
    <p><strong>Package:</strong> ${escapeHtml(data.package)}</p>
    <p><strong>Budget:</strong> ${escapeHtml(data.budget)} ${escapeHtml(data.currency)}</p>
    <p><strong>Deadline:</strong> ${escapeHtml(data.deadline)}</p>
    ${data.websiteUrl ? `<p><strong>Current site:</strong> ${escapeHtml(data.websiteUrl)}</p>` : ""}
    <p><strong>Description:</strong></p>
    <pre style="white-space:pre-wrap;font-family:sans-serif">${escapeHtml(data.description)}</pre>
    ${data.referenceLinks ? `<p><strong>References:</strong><br/>${escapeHtml(data.referenceLinks)}</p>` : ""}
  `;

  try {
    const result = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject: `[HaseenTech] Inquiry — ${data.fullName} (${data.service})`,
      html,
      attachments: attachment
        ? [{ filename: attachment.filename, content: attachment.content }]
        : undefined,
    });

    if (result.error) {
      return {
        ok: false,
        reason: "provider_error",
        message: result.error.message ?? "Email provider returned an error.",
      };
    }

    return { ok: true, id: result.data?.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown email error.";
    return { ok: false, reason: "provider_error", message };
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
