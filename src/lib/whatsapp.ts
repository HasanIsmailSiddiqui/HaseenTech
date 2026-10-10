import { siteConfig } from "@/data/site";

export function buildWhatsAppUrl(message: string) {
  const number = siteConfig.contact.whatsapp.replace(/\D/g, "");
  if (!number) return null;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

export function defaultWhatsAppMessage(service?: string, pkg?: string) {
  const parts = ["Hello HaseenTech,"];
  if (service) parts.push(`I'm interested in ${service}.`);
  if (pkg) parts.push(`Package: ${pkg}.`);
  parts.push("I'd like to discuss a project.");
  return parts.join(" ");
}
