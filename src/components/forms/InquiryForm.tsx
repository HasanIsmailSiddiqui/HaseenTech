"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { packages } from "@/data/packages";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { ALLOWED_FILE_TYPES, MAX_FILE_BYTES } from "@/lib/validation/inquiry";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type FormState = {
  fullName: string;
  email: string;
  country: string;
  phone: string;
  businessName: string;
  service: string;
  package: string;
  budget: string;
  currency: string;
  deadline: string;
  websiteUrl: string;
  description: string;
  referenceLinks: string;
  privacyConsent: boolean;
  website: string;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  country: "",
  phone: "",
  businessName: "",
  service: "",
  package: "",
  budget: "",
  currency: siteConfig.defaultCurrency,
  deadline: "",
  websiteUrl: "",
  description: "",
  referenceLinks: "",
  privacyConsent: false,
  website: "",
};

export function InquiryForm() {
  const searchParams = useSearchParams();
  const defaults = useMemo(() => {
    const service = searchParams.get("service") ?? "";
    const pkg = searchParams.get("package") ?? "";
    const validService = services.some((s) => s.slug === service) ? service : "";
    const validPkg = packages.some((p) => p.id === pkg) ? pkg : "";
    return { service: validService, package: validPkg };
  }, [searchParams]);

  const [form, setForm] = useState<FormState>({ ...initialState, ...defaults });
  const [file, setFile] = useState<File | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setFormError(null);
    setFieldErrors({});
    setSuccess(null);

    if (form.website) {
      setPending(false);
      setSuccess("Thank you. Your inquiry has been received.");
      return;
    }

    if (file) {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setFieldErrors({ file: "Allowed: PDF, PNG, JPG, WEBP, ZIP (max 5MB)." });
        setPending(false);
        return;
      }
      if (file.size > MAX_FILE_BYTES) {
        setFieldErrors({ file: "File must be 5MB or smaller." });
        setPending(false);
        return;
      }
    }

    const body = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "privacyConsent") {
        body.append(key, value ? "true" : "false");
      } else {
        body.append(key, String(value));
      }
    });
    if (file) body.append("attachment", file);

    try {
      const res = await fetch("/api/inquiry", { method: "POST", body });
      const data = (await res.json()) as {
        ok?: boolean;
        message?: string;
        errors?: Record<string, string>;
        pending?: boolean;
      };

      if (!res.ok) {
        if (data.errors) setFieldErrors(data.errors);
        setFormError(data.message ?? "Something went wrong. Please try again.");
        setPending(false);
        return;
      }

      if (data.pending) {
        setFormError(data.message ?? "Submission saved but email is pending configuration.");
        setPending(false);
        return;
      }

      setSuccess(data.message ?? "Thank you! We will reply within 1–2 business days.");
      setForm(initialState);
      setFile(null);
    } catch {
      setFormError("Network error. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-body shadow-sm transition focus:border-brand-blue focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-brand-blue/30";

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" error={fieldErrors.fullName} required>
          <input
            className={inputClass}
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            autoComplete="name"
            required
          />
        </Field>
        <Field label="Email" error={fieldErrors.email} required>
          <input
            type="email"
            className={inputClass}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            autoComplete="email"
            required
          />
        </Field>
        <Field label="Country" error={fieldErrors.country} required>
          <input
            className={inputClass}
            value={form.country}
            onChange={(e) => update("country", e.target.value)}
            autoComplete="country-name"
            required
          />
        </Field>
        <Field label="WhatsApp / phone" error={fieldErrors.phone} required>
          <input
            className={inputClass}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            autoComplete="tel"
            required
          />
        </Field>
      </div>

      <Field label="Business name (optional)" error={fieldErrors.businessName}>
        <input
          className={inputClass}
          value={form.businessName}
          onChange={(e) => update("businessName", e.target.value)}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Service required" id="service" error={fieldErrors.service} required>
          <select
            id="service"
            className={inputClass}
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
            required
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Package" id="package" error={fieldErrors.package} required>
          <select
            id="package"
            className={inputClass}
            value={form.package}
            onChange={(e) => update("package", e.target.value)}
            required
          >
            <option value="">Select a package</option>
            {packages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Estimated budget" error={fieldErrors.budget} required className="sm:col-span-2">
          <input
            className={inputClass}
            placeholder="e.g. 30000 or 500"
            value={form.budget}
            onChange={(e) => update("budget", e.target.value)}
            required
          />
        </Field>
        <Field label="Currency" error={fieldErrors.currency} required>
          <select
            className={inputClass}
            value={form.currency}
            onChange={(e) => update("currency", e.target.value)}
            required
          >
            {siteConfig.currencies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Desired deadline" error={fieldErrors.deadline} required>
        <input
          className={inputClass}
          placeholder="e.g. Launch in 4 weeks"
          value={form.deadline}
          onChange={(e) => update("deadline", e.target.value)}
          required
        />
      </Field>

      <Field label="Current website URL (optional)" error={fieldErrors.websiteUrl}>
        <input
          type="url"
          className={inputClass}
          placeholder="https://"
          value={form.websiteUrl}
          onChange={(e) => update("websiteUrl", e.target.value)}
        />
      </Field>

      <Field label="Project description" error={fieldErrors.description} required>
        <textarea
          className={cn(inputClass, "min-h-[140px]")}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          required
        />
      </Field>

      <Field label="Reference links (optional)" error={fieldErrors.referenceLinks}>
        <textarea
          className={cn(inputClass, "min-h-[80px]")}
          value={form.referenceLinks}
          onChange={(e) => update("referenceLinks", e.target.value)}
        />
      </Field>

      <Field label="Attachment (optional)" error={fieldErrors.file}>
        <input
          type="file"
          className="block w-full text-sm text-body file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2"
          accept=".pdf,.png,.jpg,.jpeg,.webp,.zip"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <p className="mt-1 text-xs text-slate-500">PDF, images, or ZIP up to 5MB.</p>
      </Field>

      <label className="flex items-start gap-3 text-sm text-body">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
          checked={form.privacyConsent}
          onChange={(e) => update("privacyConsent", e.target.checked)}
          required
        />
        <span>
          I agree to the{" "}
          <Link href="/privacy-policy" className="text-brand-blue underline">
            Privacy Policy
          </Link>
          .
        </span>
      </label>
      {fieldErrors.privacyConsent ? (
        <p className="text-sm text-red-600">{fieldErrors.privacyConsent}</p>
      ) : null}

      {formError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {formError}
        </div>
      ) : null}
      {success ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900" role="status">
          {success}
        </div>
      ) : null}

      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          "Submit project inquiry"
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  id,
  children,
  error,
  required,
  className,
}: {
  label: string;
  id?: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-midnight">
        {label}
        {required ? <span className="text-brand-blue"> *</span> : null}
      </label>
      {children}
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
