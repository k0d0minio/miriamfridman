"use server";

import { getTranslations } from "next-intl/server";
import { z } from "zod";

export type ContactState =
  | { ok: true }
  | {
      ok: false;
      error: "validation" | "generic";
      fieldErrors?: Record<string, string>;
    }
  | null;

const schema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  message: z.string().trim().min(10),
});

export async function submitContact(
  _prev: ContactState | null,
  formData: FormData,
): Promise<ContactState> {
  const honeypot = formData.get("website")?.toString() ?? "";
  if (honeypot.length > 0) {
    return { ok: true };
  }

  const t = await getTranslations("Validation");
  const raw = {
    name: formData.get("name")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "name") fieldErrors.name = t("nameRequired");
      else if (key === "email") fieldErrors.email = t("emailInvalid");
      else if (key === "message") fieldErrors.message = t("messageMin");
    }
    return { ok: false, error: "validation", fieldErrors };
  }

  // TODO: send via email provider (e.g. Resend) when configured.
  return { ok: true };
}
