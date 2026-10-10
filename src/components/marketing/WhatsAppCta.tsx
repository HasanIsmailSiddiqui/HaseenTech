import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";

export function WhatsAppCta({
  service,
  packageName,
  className,
}: {
  service?: string;
  packageName?: string;
  className?: string;
}) {
  const url = buildWhatsAppUrl(defaultWhatsAppMessage(service, packageName));
  const configured = Boolean(siteConfig.contact.whatsapp.replace(/\D/g, ""));

  if (!configured) {
    return (
      <p className={`text-sm text-slate-500 ${className ?? ""}`}>
        WhatsApp: set <code className="font-mono text-xs">NEXT_PUBLIC_WHATSAPP_NUMBER</code> in
        your environment (e.g. 923001234567).
      </p>
    );
  }

  return (
    <Button
      href={url!}
      variant="outline"
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      <MessageCircle className="h-4 w-4" aria-hidden />
      Chat on WhatsApp
    </Button>
  );
}
