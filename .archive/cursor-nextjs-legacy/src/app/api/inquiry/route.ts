import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { sendInquiryEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import {
  ALLOWED_FILE_TYPES,
  MAX_FILE_BYTES,
  inquirySchema,
} from "@/lib/validation/inquiry";

function clientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

async function maybeStore(payload: unknown) {
  if (process.env.INQUIRY_STORE !== "true") return;
  const dir = process.env.INQUIRY_STORE_DIR ?? path.join(process.cwd(), ".data");
  await mkdir(dir, { recursive: true });
  const file = path.join(dir, "inquiries.jsonl");
  await appendFile(file, `${JSON.stringify({ at: new Date().toISOString(), payload })}\n`, "utf8");
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit(`inquiry:${ip}`);
  if (!limited.ok) {
    return NextResponse.json(
      { message: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSec) } },
    );
  }

  const form = await request.formData();

  const raw = {
    fullName: String(form.get("fullName") ?? ""),
    email: String(form.get("email") ?? ""),
    country: String(form.get("country") ?? ""),
    phone: String(form.get("phone") ?? ""),
    businessName: String(form.get("businessName") ?? ""),
    service: String(form.get("service") ?? ""),
    package: String(form.get("package") ?? ""),
    budget: String(form.get("budget") ?? ""),
    currency: String(form.get("currency") ?? ""),
    deadline: String(form.get("deadline") ?? ""),
    websiteUrl: String(form.get("websiteUrl") ?? ""),
    description: String(form.get("description") ?? ""),
    referenceLinks: String(form.get("referenceLinks") ?? ""),
    privacyConsent: String(form.get("privacyConsent") ?? "") === "true",
    website: String(form.get("website") ?? ""),
  };

  if (raw.website) {
    return NextResponse.json({ ok: true, message: "Thank you." });
  }

  const parsed = inquirySchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.issues.forEach((issue) => {
      const key = issue.path[0]?.toString() ?? "form";
      if (!errors[key]) errors[key] = issue.message;
    });
    return NextResponse.json({ message: "Please fix the highlighted fields.", errors }, { status: 400 });
  }

  const file = form.get("attachment");
  let attachment: { filename: string; content: Buffer } | null = null;

  if (file && file instanceof File && file.size > 0) {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { message: "Invalid file type.", errors: { file: "Invalid file type." } },
        { status: 400 },
      );
    }
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { message: "File too large.", errors: { file: "Max 5MB." } },
        { status: 400 },
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    attachment = { filename: file.name, content: buffer };
  }

  const emailResult = await sendInquiryEmail(parsed.data, attachment);

  if (!emailResult.ok) {
    if (emailResult.reason === "not_configured") {
      await maybeStore({ ...parsed.data, emailStatus: "not_configured" });
      return NextResponse.json(
        {
          pending: true,
          message:
            "Inquiry could not be emailed yet. Configure RESEND_API_KEY and BUSINESS_EMAIL (see README). Your message was not marked as delivered.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { message: emailResult.message ?? "Email delivery failed. Please email us directly." },
      { status: 502 },
    );
  }

  await maybeStore({ ...parsed.data, emailId: emailResult.id });

  return NextResponse.json({
    ok: true,
    message: "Thank you! Your inquiry was sent successfully. We will reply within 1–2 business days.",
  });
}
